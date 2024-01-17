import OpenAI from 'openai'
import { buildProductSearch, parseRecommendedSkuIds } from './products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'
import { isAssistantMessage, isParsedAssistantMessage } from '../utils'

// comment out the following line to use the real OpenAI API
// import { getChatByFunctionMockResult } from './assistant.mocks'

interface ChatByFunctionResponse {
  messages: OpenAI.ChatCompletionMessageParam[]
  filter?: ProductFilterParams
}

const INITIAL_MESSAGES: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      'You are Jordyn, a friendly recommender of clothes.\n\nDo not make up products. Pick at most 5 & sort them by relevance. Always return results as a bulleted list in the form `[id]: [name]`.\n\nAt the end, summarize why you have selected the products in a bubbly tone. Suggest further attributes they can use to narrow down options.',
  },
  {
    role: 'assistant',
    content:
      "Hi there. My name is Jordyn and I will recommend the very best clothes for you based on your needs. Tell me what you're looking for and let's get started!",
  },
]

export const chatByFunction = async (
  messages?: ExtendedChatCompletionMessageParam[],
): Promise<ChatByFunctionResponse> => {
  if (!messages || messages.length === 0) {
    return { messages: INITIAL_MESSAGES }
  }
  // comment out the following line to use the real OpenAI API
  // else {
  //   return getChatByFunctionMockResult(messages)
  // }

  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  // Guide: https://www.npmjs.com/package/openai/#automated-function-calls
  const runner = await client.beta.chat.completions.runFunctions({
    model: 'gpt-3.5-turbo-1106',
    // stream: true,
    messages,
    functions: [
      {
        name: 'searchProducts',
        description: 'Gets the products that match the parameters',
        function: buildProductSearch(),
        parse: JSON.parse, // TODO: use a better parser (like zod) for type safety
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
    ],
  })

  await runner.done()

  const secondToLastMessage = runner.messages[runner.messages.length - 2]
  const finalFunctionCall = await runner.finalFunctionCall()

  // in the case where we just get a normal message assistant response, there
  // won't be the `function`/`function_call` back and forth. Just `user` then
  // `assistant`. In which case there also want be a `filter` to return
  const productFilterParams =
    finalFunctionCall && secondToLastMessage.role !== 'user'
      ? (JSON.parse(finalFunctionCall.arguments) as ProductFilterParams)
      : undefined

  return {
    messages: runner.messages,
    filter: productFilterParams,
  }
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
      const { skuIds, tokenizedContent, ...message } = extendedMessage

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
  messages.map((message): ExtendedChatCompletionMessageParam => {
    if (!isAssistantMessage(message)) {
      return message
    }

    const { skuIds, tokenizedContent } = parseRecommendedSkuIds(
      message.content || '',
    )

    return {
      ...message,
      skuIds,
      tokenizedContent,
    }
  })

interface ChatResponse {
  /**
   * The parameters used to filter down the products
   */
  filter?: ProductFilterParams

  /**
   * The messages returned by the assistant
   */
  messages: ExtendedChatCompletionMessageParam[]
}

/**
 * Chat with the assistant to get recommended SKUs returning the messages and the found SKUs
 * @returns The messages returned by the assistant along with the filter
 */
export const chat = async (
  requestMessages?: ExtendedChatCompletionMessageParam[],
): Promise<ChatResponse> => {
  const { messages: responseMessages, filter } = await chatByFunction(
    stripExtendedAssistantMessages(requestMessages),
  )

  return {
    filter,
    messages: parseAssistantMessages(responseMessages),
  }
}
