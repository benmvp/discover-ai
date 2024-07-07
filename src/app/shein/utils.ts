import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ProductAssistantMessage,
  ProductExtendedMessage,
} from '@/app/shein/types'
import { Message } from '@/ai/types'
import { isAssistantMessage } from '@/ai/utils'

export const isParsedAssistantMessage = (
  message: Message,
): message is ParsedAssistantMessage =>
  isAssistantMessage(message) && 'skuIds' in message

export const isProductAssistantMessage = (
  message: Message,
): message is ProductAssistantMessage =>
  isParsedAssistantMessage(message) && 'products' in message

/**
 * Strip `skuIds` & `tokenizedContent` from `requestMessages` (added previously
 * by `parseAssistantMessages`) from assistant messages before making the chat
 * request
 */
export const stripExtendedAssistantMessages = (
  extendedMessages?: ExtendedMessage[],
): Message[] | undefined =>
  extendedMessages?.map((extendedMessage): Message => {
    if (!isParsedAssistantMessage(extendedMessage)) {
      return extendedMessage
    }

    // rest object will be the same as `extendedMessage` but without `skuIds` &
    // `tokenizedContent`
    const {
      filter: filterParams,
      skuIds,
      tokenizedContent,
      ...message
    } = extendedMessage

    return message
  })

export const stripProductAssistantMessages = (
  productMessages?: ProductExtendedMessage[],
): ExtendedMessage[] | undefined =>
  productMessages?.map((productMessage): ExtendedMessage => {
    if (!isProductAssistantMessage(productMessage)) {
      return productMessage
    }

    // rest object will be the same as `productMessage` but without `products`
    const { products, ...message } = productMessage

    return message
  })
