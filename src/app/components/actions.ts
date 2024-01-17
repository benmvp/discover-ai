'use server'

import type {
  ProductExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'
import { chatNext } from './comm'

/**
 * Add a new message from the shopper to the existing messages
 * and return the new messages
 */
export const addShopperMessage = async (
  messages: ProductExtendedChatCompletionMessageParam[],
  formData: FormData,
): Promise<ProductExtendedChatCompletionMessageParam[]> => {
  const shopperMessage = formData.get('message')

  if (typeof shopperMessage !== 'string') {
    return messages
  }

  const responseMessages = await chatNext(messages, shopperMessage)

  return responseMessages
}
