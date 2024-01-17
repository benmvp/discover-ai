'use server'

import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import { chatNext } from './comm'

/**
 * Add a new message from the shopper to the existing messages
 * and return the new messages
 */
export const addShopperMessage = async (
  messages: ProductExtendedChatCompletionMessageParam[],
  shopperMessage: string,
): Promise<ProductExtendedChatCompletionMessageParam[]> =>
  chatNext(messages, shopperMessage)
