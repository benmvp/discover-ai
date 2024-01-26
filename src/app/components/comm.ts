import { chat } from '../ai/assistant'
import { getProducts } from '../ai/products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductExtendedChatCompletionMessageParam,
  SheinProduct,
} from '../types'
import { isParsedAssistantMessage } from '../utils'

/**
 * Add the full product details to the assistant messages with SKU IDs
 */
const addProductsToMessages = async (
  messages: ExtendedChatCompletionMessageParam[],
) => {
  // Build up a list of all the SKU IDs in the response messages
  const allSkuIds = new Set(
    messages
      .filter(isParsedAssistantMessage)
      .map((message) => message.skuIds.flat())
      .flat(),
  )
  const allProducts = await getProducts(Array.from(allSkuIds))
  const skuIdToProductMap = new Map(
    allProducts.map((product) => [product.skuId, product]),
  )

  // add `products` property to each of the assistant
  return messages.map((message): ProductExtendedChatCompletionMessageParam => {
    if (!isParsedAssistantMessage(message)) {
      return message
    }

    const products = Object.fromEntries(
      message.skuIds
        // flatten the group of SKU IDs
        .flat()

        // get the product for each SKU ID
        .map((id) => skuIdToProductMap.get(id))

        // filter out any `undefined` products
        .filter((product): product is SheinProduct => Boolean(product))

        // convert to entries
        .map((product) => [product.skuId, product]),
    )

    return {
      ...message,
      products,
    }
  })
}

/**
 * Adds the specified user message to the list of messages and requests the next
 * chat message from the assistant
 * @param messages The current list of messages
 * @param userContent The new user message content to add to the list of messages
 * @returns The updated list of messages with the new assistant message response
 */
export const chatNext = async (
  messages?: ExtendedChatCompletionMessageParam[],
  userContent?: string,
): Promise<ProductExtendedChatCompletionMessageParam[]> => {
  const userMessage: ExtendedChatCompletionMessageParam | undefined =
    userContent
      ? {
          role: 'user',
          content: userContent,
        }
      : undefined

  // when just starting, both `messages` and `userMessage` will be undefined
  const requestMessages =
    messages && userMessage ? [...messages, userMessage] : undefined

  const responseMessages = await chat(requestMessages)

  // add `products` property to each of the assistant
  return addProductsToMessages(responseMessages)
}
