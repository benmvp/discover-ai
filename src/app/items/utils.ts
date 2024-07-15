import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ItemAssistantMessage,
  ItemExtendedMessage,
} from '@/app/items/types'
import type { Message } from '@/ai/types'
import { isAssistantMessage } from '@/ai/utils'

export const isParsedAssistantMessage = (
  message: Message,
): message is ParsedAssistantMessage =>
  isAssistantMessage(message) && 'itemIds' in message

export const isItemAssistantMessage = (
  message: Message,
): message is ItemAssistantMessage =>
  isParsedAssistantMessage(message) && 'items' in message

/**
 * Strip `itemIds` & `tokenizedContent` from `requestMessages` (added previously
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

    // rest object will be the same as `extendedMessage` but without `itemIds` &
    // `tokenizedContent`
    const {
      filter: filterParams,
      itemIds,
      tokenizedContent,
      ...message
    } = extendedMessage

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
