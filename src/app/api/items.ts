import {
  ExtendedMessage,
  Item,
  ItemExtendedMessage,
  ItemId,
  ParsedAssistantMessage,
} from '@/app/items/types'
import { isParsedAssistantMessage } from '../items/utils'

const ITEM_REC_REGEX = /^.*?(s\w+\d{5,}).*$/
const ITEM_REC_REGEX_ALL = new RegExp(ITEM_REC_REGEX, 'gm')
const LINE_STARTS_WITH_SPECIAL_CHAR_REGEX = /^[^a-zA-Z0-9\s]/

/**
 * The maximum length of a line that contains a Item ID. This is used for the
 * case where a Item ID is included in a paragraph of text.
 */
const MAX_ITEM_LINE_LENGTH = 150

/**
 * Parses the assistant messages to extract the recommended Item IDs from each
 * @param assistantContent The assistant message content
 */
export const parseRecommendedItemIds = (
  assistantContent: string,
): Pick<ParsedAssistantMessage, 'itemIds' | 'tokenizedContent'> => {
  // extract the Item IDs from the assistant message. because there may be multiple
  // sections of items, we group them by paragraph
  const groupedItemIds: ParsedAssistantMessage['itemIds'] = []

  // the goal is to split the assistant message into paragraphs, but in certain
  // cases there is a line of text that is not a paragraph (multiple line breaks
  // in a row), but only separate by a single line break from the recommended
  // items. so we find those non-Item lines and wrap them in extra newlines so
  // they are treated as paragraphs when we split on 2+ newlines
  const paragraphs = assistantContent
    .split('\n')
    .map((line) => (ITEM_REC_REGEX.test(line) ? line : `\n${line}\n`))
    .join('\n')
    .split(/\n{2}/)
    .filter(Boolean)
    .map((paragraph) => paragraph.trim())

  // the tokenized messages are the same as the paragraphs except some are
  // replaced with `null` where the items list should be
  const tokenizedMessages = paragraphs.map((paragraph) => {
    const matches = [...paragraph.matchAll(ITEM_REC_REGEX_ALL)]
    const itemIds = matches
      .map(
        (
          // `itemId` is the first capture group (2nd item)
          [line, itemId],
        ) =>
          // use the Item ID if the line is short or starts with a special character (i.e. a bullet)
          line.length < MAX_ITEM_LINE_LENGTH ||
          LINE_STARTS_WITH_SPECIAL_CHAR_REGEX.test(line)
            ? // remove any non-word characters from the Item ID just in case some are left
              itemId.replaceAll(/\W/g, '')
            : '',
      )
      .filter(Boolean)

    groupedItemIds.push(itemIds)

    return itemIds.length ? null : paragraph
  })

  return {
    itemIds: groupedItemIds,
    tokenizedContent: tokenizedMessages,
  }
}

/**
 * Add the full item details to the assistant messages with Item IDs
 */
export const addItemsToMessages = async (
  messages: ExtendedMessage[],
  getItems: (itemIds: string[]) => Promise<Item[]>,
): Promise<ItemExtendedMessage[]> => {
  // Build up a list of all the Item IDs in the response messages
  const allItemIds = new Set(
    messages
      .filter(isParsedAssistantMessage)
      .flatMap((message) => message.itemIds.flat()),
  )
  const allItems = await getItems(Array.from(allItemIds))
  const itemIdToItemMap = new Map(allItems.map((item) => [item.id, item]))

  // add `items` property to each of the assistant
  return messages.map((message): ItemExtendedMessage => {
    if (!isParsedAssistantMessage(message)) {
      return message
    }

    const items = Object.fromEntries(
      message.itemIds
        // flatten the group of Item IDs
        .flat()

        // get the item for each Item ID
        .map((id) => itemIdToItemMap.get(id))

        // filter out any `undefined` items
        .filter((item): item is Item => Boolean(item))

        // convert to entries
        .map((item) => [item.id, item]),
    )

    return {
      ...message,
      items,
    }
  })
}
