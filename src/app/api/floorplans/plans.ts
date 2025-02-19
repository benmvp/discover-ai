import { Item, ItemId, MatchedItem, SearchFunction } from '@/app/items/types'
import HousePlans, {
  HousePlanSearchResponseData,
  SearchParams,
  SearchResponseData,
} from '../sdks/houseplans'

/**
 * Global cache of floor plans returned from the API
 */
const PLANS = new Map<ItemId, Item>()

interface PlanMatchedItem extends MatchedItem {
  bathrooms: HousePlanSearchResponseData['bathrooms']
  bedrooms: HousePlanSearchResponseData['bedrooms']
  squareFeet: HousePlanSearchResponseData['squarefeet']
  stories: HousePlanSearchResponseData['stories']
}

const HOUSE_PLANS_CLIENT = new HousePlans({
  // debug: true,
})

/**
 * Returns the top floor plans that match the filter parameters
 * @param filterParams Parameters to filter the plans by
 * @returns the matched plans
 */
export const searchPlans: SearchFunction<SearchParams> = async (
  filterParams,
) => {
  let results: SearchResponseData['results'] = []

  try {
    results = (await HOUSE_PLANS_CLIENT.plans(filterParams)).results
  } catch (error) {
    console.error('Error searching for plans:', error, filterParams)
  }

  const items = results.map(
    (plan): PlanMatchedItem => ({
      bathrooms: plan.bathrooms,
      bedrooms: plan.bedrooms,
      id: plan.number,
      squareFeet: plan.squarefeet,
      stories: plan.stories,

      // Trimming the plan from the title is key for the assistant properly
      // displaying the plan ID in the content we need to parse
      title: plan.thumbnailAlt.replace(`#${plan.number}`, '').trim(),
    }),
  )

  return { items }
}

/**
 * Get the plans for the given item IDs
 */
export const getPlans = async (itemIds: string[]): Promise<Item[]> => {
  if (itemIds.length === 0) {
    return []
  }

  const missingItemIds = itemIds.filter((itemId) => !PLANS.has(itemId))

  // If there are any missing plans, grab them and add them to the global cache
  if (missingItemIds.length > 0) {
    for (const itemId of missingItemIds) {
      try {
        const plan = await HOUSE_PLANS_CLIENT.plan(itemId)

        PLANS.set(itemId, {
          id: itemId,
          imageUrl: plan.image,
          title: plan.name,
          url: plan.offers.url,
        })
      } catch (error) {
        console.error(`Error getting plans for ${itemId}:`, error)
      }
    }
  }

  return itemIds
    .map((itemId) => PLANS.get(itemId))
    .filter((item): item is Item => Boolean(item))
}
