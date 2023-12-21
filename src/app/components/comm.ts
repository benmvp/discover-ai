import { chat } from '../ai/assistant'
import { getProducts } from '../ai/products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '../types'
import { isParsedAssistantMessage, isProductAssistantMessage } from '../utils'

/**
 * Strip `skuIds` & `tokenizedContent` from `requestMessages` from assistant
 * messages before making the chat request
 */
const stripProductAssistantMessages = (
  productMessages?: ProductExtendedChatCompletionMessageParam[],
): ExtendedChatCompletionMessageParam[] | undefined =>
  productMessages?.map((productMessage): ExtendedChatCompletionMessageParam => {
    if (!isProductAssistantMessage(productMessage)) {
      return productMessage
    }

    // rest object will be the same as `productMessage` but without `products`
    const { products, ...message } = productMessage

    return message
  })

interface ChatNextParams {
  messages: ProductExtendedChatCompletionMessageParam[]
  userMessage: string
}

interface ChatData {
  filter?: ProductFilterParams
  messages: ProductExtendedChatCompletionMessageParam[]
}

export const chatNext = async (params?: ChatNextParams): Promise<ChatData> => {
  const requestMessages = params
    ? stripProductAssistantMessages([
        ...params.messages,
        { role: 'user', content: params.userMessage },
      ])
    : undefined

  const { filter, messages: responseMessages } = await chat(requestMessages)

  return {
    filter,

    // add `products` property to each of the assistant
    messages: responseMessages.map((message) =>
      isParsedAssistantMessage(message)
        ? { ...message, products: getProducts(message.skuIds) }
        : message,
    ),
  }
}
