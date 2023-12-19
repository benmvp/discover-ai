import OpenAI from 'openai'
import {
  type ProductFilterParams,
  getMatchedProducts,
  parseRecommendedSkuIds,
} from './products'

interface ChatParams {
  messages?: OpenAI.ChatCompletionMessageParam[]
}

interface ChatByFunctionResponse {
  messages: OpenAI.ChatCompletionMessageParam[]
  filter?: ProductFilterParams
}

const INITIAL_MESSAGES: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content:
      'You are Jordyn, a friendly recommender of clothes.\n\nDo not make up products. Pick at most 5 & sort them by relevance. Return them as a bulleted list in the form `[id]: [name]`.\n\nAt the end, summarize why you have selected the products in a bubbly tone. Suggest further attributes they can use to narrow down options.',
  },
  {
    role: 'assistant',
    content:
      "Hi there. My name is Jordyn and I will recommend the very best clothes for you based on your needs. Tell me what you're looking for and let's get started!",
  },
]

export const chatByFunction = async ({
  messages,
}: ChatParams): Promise<ChatByFunctionResponse> => {
  if (!messages) {
    return { messages: INITIAL_MESSAGES }
  }

  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const runner = await client.beta.chat.completions.runFunctions({
    model: 'gpt-3.5-turbo-1106',
    // stream: true,
    messages,
    functions: [
      {
        name: 'getMatchedProducts',
        description: 'Gets the products that match the parameters',
        function: getMatchedProducts,
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
            material: {
              description:
                'The material of the product they are looking for (e.g "polyester", "cotton", "spandex", "denim", etc.)',
              type: 'string',
            },
            pattern: {
              description:
                'The pattern of the product they are looking for (e.g "solid", "plain", "floral", "striped", etc.)',
              type: 'string',
            },
            style: {
              description:
                'The style of the product they are looking for (e.g "casual", "elegant", "sexy", "party", "sport", "boho", "high waist", etc.)',
              type: 'string',
            },
            type: {
              description:
                'The type of the product they are looking for (e.g "dress", "shirt", "pants", "skirt", "shorts" etc.)',
              type: 'string',
            },
          },
        },
      },
    ],
  })

  await runner.done()

  const finalFunctionCall = await runner.finalFunctionCall()
  const productFilterParams = finalFunctionCall
    ? (JSON.parse(finalFunctionCall.arguments) as ProductFilterParams)
    : undefined

  return {
    messages: runner.messages,
    filter: productFilterParams,
  }
}

interface ChatResponse {
  /**
   * The parameters used to filter down the products
   */
  filter?: ProductFilterParams

  /**
   * The messages returned by the assistant
   */
  messages: OpenAI.ChatCompletionMessageParam[]

  /**
   * The matching SKUs found by the assistant
   */
  skuIds: string[]

  /**
   * The final message that is tokenized in order to substitute the products
   * list in the message on the frontend
   */
  tokenizedMessage: string
}

/**
 * Chat with the assistant to get recommended SKUs returning the messages and the found SKUs
 * @returns
 */
export const chat = async ({ messages }: ChatParams): Promise<ChatResponse> => {
  const { messages: newMessages, filter } = await chatByFunction({ messages })
  const lastMessage = newMessages[newMessages.length - 1]

  if (lastMessage.role === 'assistant') {
    const { skuIds, tokenizedMessage } = parseRecommendedSkuIds(
      lastMessage.content || '',
    )

    return {
      filter,
      messages: newMessages,
      skuIds,
      tokenizedMessage: tokenizedMessage,
    }
  } else {
    return {
      messages: newMessages,
      skuIds: [],
      tokenizedMessage: '',
    }
  }
}
