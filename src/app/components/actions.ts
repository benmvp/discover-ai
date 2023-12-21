'use server'

import type {
  ProductExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'
import { chatNext } from './comm'

export interface ChatState {
  filter?: ProductFilterParams
  messages: ProductExtendedChatCompletionMessageParam[]
}

/**
 * Add a new message from the shopper to the existing messages
 * and return the new messages
 */
export const addShopperMessage = async (
  existingChatState: ChatState,
  formData: FormData,
): Promise<ChatState> => {
  const shopperMessage = formData.get('message')

  if (typeof shopperMessage !== 'string') {
    return existingChatState
  }

  const { messages: responseMessages, filter } = await chatNext({
    messages: existingChatState.messages,
    userMessage: shopperMessage,
  })

  return { messages: responseMessages, filter }
}
