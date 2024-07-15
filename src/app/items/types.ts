import type { AssistantMessage, Message } from '@/ai/types'

export type ItemId = string

export interface Item {
  description?: string
  id: string
  imageUrl: string
  price?: number
  title: string
  url: string
}

export interface FilterParameters {
  [x: string]: string | number | undefined
}

export interface MatchedItems {
  items: {
    id: string
    title: string
    description?: string
    price?: number
  }[]
}

/**
 * An assistant message that has been parsed to extract the item IDs & tokenize content
 */
export interface ParsedAssistantMessage extends AssistantMessage {
  /**
   * The search parameters that were used to get the matching item ID
   */
  filter: FilterParameters | null

  /**
   * The matching item IDs found by the assistant for each paragraph
   */
  itemIds: ItemId[][]

  /**
   * The tokenized form of the content for each paragraph in order to substitute
   * the items in the message on the frontend
   */
  tokenizedContent: (string | null)[]
}

/**
 * A parsed message or a regular message
 */
export type ExtendedMessage = Message | ParsedAssistantMessage

/**
 * A parsed assistant message that has the item content for each of the `itemIds`
 */
export interface ItemAssistantMessage<I extends Item = Item>
  extends ParsedAssistantMessage {
  /**
   * The item data for each of the `itemIds`
   */
  items: Record<ItemId, I>
}

/**
 * A item message or a regular message
 */
export type ItemExtendedMessage<I extends Item = Item> =
  | ExtendedMessage
  | ItemAssistantMessage<I>
