import type {
  AssistantMessage,
  FunctionCallMessage,
  Message,
} from '@/app/types'

export type ItemId = string

export interface Item {
  id: string
  imageUrl: string
  price?: number
  title: string
  url: string
}

/**
 * The generic parameters returned by the function call message used to search
 * for items
 */
export interface FilterParameters {
  [x: string]: string | number | boolean | undefined
}

/**
 * The data returned to the assistant by the search function that matches the filter parameters
 */
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
export type SearchFunction<
  SearchParameters extends FilterParameters = FilterParameters,
> = (filterParams: SearchParameters) => Promise<MatchedItems>

/**
 * An assistant message that has been parsed to extract the item IDs & tokenize content
 */
export type ParsedAssistantMessage = (
  | AssistantMessage
  | FunctionCallMessage
) & {
  /**
   * The contents of the assistant message.
   */
  content: string

  /**
   * The search parameters that were used to get the matching item ID
   */
  filter?: FilterParameters

  /**
   * The parsed content of the message, paragraph by paragraph, that's either a
   * string to display directly or an array of item IDs to turn into a display
   * of items
   */
  parsedContent: (string | ItemId[])[]

  /**
   * The type of the message, in this case is 'assistant' or 'functionCall'.
   */
  // type: AssistantMessage['type'] | FunctionCallMessage['type']
}

/**
 * A parsed message or a regular message
 */
export type ExtendedMessage = Message | ParsedAssistantMessage

/**
 * A parsed assistant message that has the item content for each of the `itemIds`
 */
export type ItemAssistantMessage<I extends Item = Item> =
  ParsedAssistantMessage & {
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
