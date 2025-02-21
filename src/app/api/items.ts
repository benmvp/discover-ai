import {
  ExtendedMessage,
  FilterParameters,
  Item,
  ItemExtendedMessage,
  MatchedItems,
  ParsedAssistantMessage,
  SearchFunction,
} from '@/app/items/types'
import { isParsedAssistantMessage } from '../items/utils'
import { RecommendationsResponse } from '../ai/assistant'

/**
 * Parses the assistant messages to extract the recommendation info
 * @param assistantContent The assistant message content
 */

export function parseRecommendations(assistantContent: string): {
  parsedContent: ParsedAssistantMessage['parsedContent']
  filter: FilterParameters | undefined
} {
  try {
    const recommendationResponse: RecommendationsResponse =
      JSON.parse(assistantContent)
    let parsedFilter: FilterParameters | undefined

    try {
      parsedFilter = JSON.parse(
        recommendationResponse.filter,
      ) as FilterParameters

      if (Object.keys(parsedFilter).length === 0) {
        parsedFilter = undefined
      }
    } catch (ex) {
      console.error('Error parsing filter:', ex)
    }

    const recommendations = recommendationResponse.recommendations ?? []

    return {
      // TODO: Make the `parsedContent` keep the original
      // `RecommendationsResponse` structure
      parsedContent: [
        recommendationResponse.opening,
        ...recommendations.flatMap((recommendation) => [
          recommendation.ids,
          recommendation.summary,
        ]),
        recommendationResponse.nexSteps,
      ],

      filter: parsedFilter,
    }
  } catch (ex) {
    // just a regular text assistant message
    return { parsedContent: [assistantContent], filter: undefined }
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
