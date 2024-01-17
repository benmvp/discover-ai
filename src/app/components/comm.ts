import { chat } from '../ai/assistant'
import { getProducts } from '../ai/products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductExtendedChatCompletionMessageParam,
} from '../types'
import { isParsedAssistantMessage, isProductAssistantMessage } from '../utils'

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

export const chatNext = async (
  messages?: ProductExtendedChatCompletionMessageParam[],
  userMessage?: string,
): Promise<ProductExtendedChatCompletionMessageParam[]> => {
  // Strip `products` from `productMessages` from assistant messages before
  // making the chat request
  const requestMessages =
    messages && userMessage
      ? stripProductAssistantMessages([
          ...messages,
          { role: 'user', content: userMessage },
        ])
      : undefined

  const responseMessages = await chat(requestMessages)

  // add `products` property to each of the assistant
  return responseMessages.map((message) =>
    isParsedAssistantMessage(message)
      ? { ...message, products: getProducts(message.skuIds) }
      : message,
  )
}
