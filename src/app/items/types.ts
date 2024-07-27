import type { AssistantMessage, Message } from '@/app/types'

export type ItemId = string

export interface Item {
  id: string
  imageUrl: string
  price?: number
  title: string
  url: string
}

export interface FilterParameters {
  [x: string]: string | number | boolean | undefined
}

export interface MatchedItem {
  description?: string
  id: string
  price?: number
  title: string

  [key: string]: number | string | string[] | undefined
}

/**
 * A collection of matched items passed to the assistant to aid in determining which item to display
 */
export interface MatchedItems {
  items: MatchedItem[]
}

/**
 * A function that searches for items based on the filter parameters
 */
export type SearchFunction<FP extends FilterParameters> = (
  filterParams: FP,
) => Promise<MatchedItems>

/**
 * An assistant message that has been parsed to extract the item IDs & tokenize content
 */
export interface ParsedAssistantMessage extends AssistantMessage {
  /**
   * The search parameters that were used to get the matching item ID
   */
  filter: FilterParameters | null

  /**
   * The parsed content of the message, paragraph by paragraph, that's either a
   * string to display directly or an array of item IDs to turn into a display
   * of items
   */
  parsedContent: (string | ItemId[])[]
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
