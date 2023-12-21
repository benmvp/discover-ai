'use server'

import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import { chatNext } from './comm'

export const addShopperMessage = async (
  existingMessages: ProductExtendedChatCompletionMessageParam[],
  formData: FormData,
): Promise<ProductExtendedChatCompletionMessageParam[]> => {
  const shopperMessage = formData.get('message')

  if (typeof shopperMessage !== 'string') {
    return existingMessages
  }

  const { messages: responseMessages, filter } = await chatNext({
    messages: existingMessages,
    userMessage: shopperMessage,
  })

  console.log(filter)

  return responseMessages
}
