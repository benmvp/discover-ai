import {
  ExtendedMessage,
  Item,
  ItemExtendedMessage,
  ParsedAssistantMessage,
} from '@/app/items/types'
import { isParsedAssistantMessage } from '../items/utils'

const LINE_STARTS_WITH_SPECIAL_CHAR_REGEX = /^[^a-zA-Z0-9\s]/

/**
 * The maximum length of a line that contains a Item ID. This is used for the
 * case where a Item ID is included in a paragraph of text.
 */
const MAX_ITEM_LINE_LENGTH = 150

const optimizeParsedContent = (
  parsedContent: ParsedAssistantMessage['parsedContent'],
): ParsedAssistantMessage['parsedContent'] => {
  const optimizedContent: ParsedAssistantMessage['parsedContent'] = []
  let currentGroup: string[] = []

  for (const content of parsedContent) {
    // if the content is an array, it's a group of Item IDs.
    if (Array.isArray(content)) {
      // so we need to add the current group to the optimized content as
      // paragraphs, if it's not empty
      if (currentGroup.length) {
        optimizedContent.push(currentGroup.join('\n\n'))

        // reset the current group
        currentGroup = []
      }

      // add the Item IDs to the optimized
      optimizedContent.push(content)
    } else {
      // if the content is a string, it's a paragraph of text. so we add it to
      // the current group of paragraphs to be combined into a single paragraph
      currentGroup.push(content)
    }
  }

  // add the last group of paragraphs to the optimized content
  if (currentGroup.length) {
    optimizedContent.push(currentGroup.join('\n\n'))
  }

  return optimizedContent
}

/**
 * Parses the assistant messages to extract the recommended Item IDs from each
 * @param assistantContent The assistant message content
 * @param itemIdRegex The regex to use to extract the Item IDs from the message content
 */
export const parseRecommendedItemIds = (
  assistantContent: string,
  itemIdRegex: RegExp,
): ParsedAssistantMessage['parsedContent'] => {
  // regex to match the Item ID in the line.
  const lineItemIdRegex = new RegExp(`^.*?(${itemIdRegex.source}).*$`)

  // the goal is to split the assistant message into paragraphs, but in certain
  // cases there is a line of text that is not a paragraph (multiple line breaks
  // in a row), but only separate by a single line break from the recommended
  // items. so we find those non-Item lines and wrap them in extra newlines so
  // they are treated as paragraphs when we split on 2+ newlines
  const paragraphs = assistantContent
    .split('\n')
    .map((line) => (lineItemIdRegex.test(line) ? line : `\n${line}\n`))
    .join('\n')
    .split(/\n{2}/)
    .filter(Boolean)
    .map((paragraph) => paragraph.trim())

  // the tokenized messages are the same as the paragraphs except some are
  // replaced with `null` where the items list should be
  const lineItemIdRegexAll = new RegExp(lineItemIdRegex, 'gm')
  const parsedContent = paragraphs.map((paragraph) => {
    const matches = [...paragraph.matchAll(lineItemIdRegexAll)]
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

    // return the Item IDs if there are any, otherwise return the paragraph
    return itemIds.length ? itemIds : paragraph
  })

  return optimizeParsedContent(parsedContent)
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

      // itemIds is an array of Item IDs while text content is a string, so get
      // back the array of Item IDs
      .flatMap((message) =>
        message.parsedContent.map((content) =>
          Array.isArray(content) ? content : null,
        ),
      )

      // filter out any `null` values
      .filter((content): content is string[] => Boolean(content))

      // flatten the array of arrays of Item IDs
      .flat(),
  )
  const allItems = await getItems(Array.from(allItemIds))
  const itemIdToItemMap = new Map(allItems.map((item) => [item.id, item]))

  // add `items` property to each of the assistant
  return messages.map((message): ItemExtendedMessage => {
    if (!isParsedAssistantMessage(message)) {
      return message
    }

    const items = Object.fromEntries(
      message.parsedContent
        // get the array of Item IDs or `null` if it's a paragraph of text
        .map((content) => (Array.isArray(content) ? content : null))

        // filter out any `null` values
        .filter((content): content is string[] => Boolean(content))

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
