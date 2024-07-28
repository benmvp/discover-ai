import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ItemAssistantMessage,
  ItemExtendedMessage,
} from '@/app/items/types'
import type { Message } from '@/app/types'
import { isAssistantMessage, isFunctionCallMessage } from '@/app/utils'

export const isParsedAssistantMessage = (
  message: Message,
): message is ParsedAssistantMessage =>
  (isAssistantMessage(message) || isFunctionCallMessage(message)) &&
  'parsedContent' in message

export const isItemAssistantMessage = (
  message: Message,
): message is ItemAssistantMessage =>
  isParsedAssistantMessage(message) && 'items' in message

/**
 * Strip parsed items from `extendedMessages` (added previously by
 * `parseRecommendedItemIds`) from assistant messages before making the chat
 * request
 */
export const stripExtendedAssistantMessages = (
  extendedMessages?: ExtendedMessage[],
): Message[] | undefined =>
  extendedMessages?.map((extendedMessage): Message => {
    if (!isParsedAssistantMessage(extendedMessage)) {
      return extendedMessage
    }

    // rest object will be the same as `extendedMessage` but without parsed content
    const { filter, parsedContent, ...message } = extendedMessage

    return message
  })

/**
 * Strip `items` from `itemMessages` (added previously by `addItemsToMessages`)
 */
export const stripItemAssistantMessages = (
  itemMessages?: ItemExtendedMessage[],
): ExtendedMessage[] | undefined =>
  itemMessages?.map((itemMessage): ExtendedMessage => {
    if (!isItemAssistantMessage(itemMessage)) {
      return itemMessage
    }

    // rest object will be the same as `itemMessage` but without `items`
    const { items, ...message } = itemMessage

    return message
  })
