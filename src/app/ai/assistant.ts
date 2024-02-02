import OpenAI from 'openai'
import { buildProductSearch, parseRecommendedSkuIds } from './products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'
import { isAssistantMessage, isParsedAssistantMessage } from '../utils'

// comment out the following line to use the real OpenAI API
// import { getChatByFunctionMockResult } from './assistant.mocks'

const SEARCH_FUNCTION_NAME = 'searchProducts'

const INITIAL_MESSAGES: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      'You are a friendly recommender of clothes.\n\nDo not make up products. Pick at most 5 & sort them by relevance. Always return results as a bulleted list in the form `[id]: [name]`. Do not link them.\n\nIn order to recommend the proper seasonal attire, ask where the clothing will be worn as well as the location & time of year. At the very end, summarize why you have selected the products in a bubbly tone, separate from the list of products. Finally, suggest further attributes they can use to narrow down options.',
  },
  {
    role: 'assistant',
    content:
      "Hi there. Let's find the very best clothes for you based on your needs. Are you searching for clothes for a specific occasion, in a specific color or matching a specific style? Describe what you're looking for and let's get started!",
  },
]

export const chatByFunction = async (
  messages?: OpenAI.ChatCompletionMessageParam[],
): Promise<OpenAI.ChatCompletionMessageParam[]> => {
  if (!messages || messages.length === 0) {
    return INITIAL_MESSAGES
  }
  // comment out the following line to use the real OpenAI API
  // else {
  //   return getChatByFunctionMockResult(messages)
  // }

  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  // Guide: https://www.npmjs.com/package/openai/#automated-function-calls
  const runner = await client.beta.chat.completions.runTools({
    model: 'gpt-4',
    messages,
    tools: [
      {
        type: 'function',
        function: {
          name: SEARCH_FUNCTION_NAME,
          description: 'Gets the products that match the parameters',
          function: buildProductSearch(),
          parse: JSON.parse,
          parameters: {
            type: 'object',
            properties: {
              budget: {
                description:
                  'The maximum price they are willing to pay for a product',
                type: 'integer',
                minimum: 0,
                maximum: 50,
              },
              color: {
                description:
                  'The color of the product they are looking for (e.g "black", "multicolor", "plaid", etc.)',
                type: 'string',
              },
              length: {
                description:
                  'The length of the product they are looking for (e.g "mini", "midi", "maxi", "short", "regular", "long", etc.)',
                type: 'string',
              },
              pattern: {
                description:
                  'The pattern of the product they are looking for (e.g "solid", "plain", "floral", "striped", etc.)',
                type: 'string',
              },
              style: {
                description:
                  'The style of the product they are looking for (e.g "casual", "elegant", "sexy", "party", "sports", "boho", "high waist", etc.)',
                type: 'string',
              },
              type: {
                description:
                  'The type of the product they are looking for (e.g "dress", "shirt", "pants", "skirt", "shorts", etc.)',
                type: 'string',
              },
            },
          },
        },
      },
    ],
  })

  await runner.done()

  return runner.messages
}

/**
 * Strip `skuIds` & `tokenizedContent` from `requestMessages` (added previously
 * by `parseAssistantMessages`) from assistant messages before making the chat
 * request
 */
const stripExtendedAssistantMessages = (
  extendedMessages?: ExtendedChatCompletionMessageParam[],
): OpenAI.ChatCompletionMessageParam[] | undefined =>
  extendedMessages?.map(
    (extendedMessage): OpenAI.ChatCompletionMessageParam => {
      if (!isParsedAssistantMessage(extendedMessage)) {
        return extendedMessage
      }

      // rest object will be the same as `extendedMessage` but without `skuIds` &
      // `tokenizedContent`
      const {
        filter: filterParams,
        skuIds,
        tokenizedContent,
        ...message
      } = extendedMessage

      return message
    },
  )

/**
 * Parse `skuIds` & `tokenizedContent` from assistant messages to include in
the response messages
  */
const parseAssistantMessages = (
  messages: OpenAI.ChatCompletionMessageParam[],
): ExtendedChatCompletionMessageParam[] =>
  messages.map((message, index): ExtendedChatCompletionMessageParam => {
    if (!isAssistantMessage(message)) {
      return message
    }

    const { skuIds, tokenizedContent } = parseRecommendedSkuIds(
      message.content || '',
    )

    // the message 2 before the current one should be the function call if this
    // one is the assistant response with the SKUs. if so, parse the filter
    // params from that function call so we can include it with the extended
    // message
    const potentialFunctionCallMessage = messages[index - 2]
    let filterParams: ProductFilterParams | undefined

    if (potentialFunctionCallMessage?.role === 'assistant') {
      const searchToolCall = potentialFunctionCallMessage.tool_calls?.find(
        (call) => call.function.name === SEARCH_FUNCTION_NAME,
      )

      if (searchToolCall) {
        filterParams = JSON.parse(
          searchToolCall.function.arguments,
        ) as ProductFilterParams
      }
    }

    return {
      ...message,
      filter: filterParams ?? null,
      skuIds,
      tokenizedContent,
    }
  })

/**
 * Chat with the assistant to get recommended SKUs returning the messages and the found SKUs
 * @returns The messages returned by the assistant along with the filter
 */
export const chat = async (
  requestMessages?: ExtendedChatCompletionMessageParam[],
): Promise<ExtendedChatCompletionMessageParam[]> => {
  const responseMessages = await chatByFunction(
    stripExtendedAssistantMessages(requestMessages),
  )

  return parseAssistantMessages(responseMessages)
}
