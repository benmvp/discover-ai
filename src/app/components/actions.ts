'use server'

import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import { chatNext } from './comm'
import { stripProductAssistantMessages } from '../utils'

/**
 * Add a new message from the shopper to the existing messages
 * and return the new messages
 */
export const addShopperMessage = async (
  messages: ProductExtendedChatCompletionMessageParam[],
  shopperMessage: string,
): Promise<ProductExtendedChatCompletionMessageParam[]> =>
  chatNext(stripProductAssistantMessages(messages), shopperMessage)
