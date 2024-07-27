import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import MiniSearch from 'minisearch'
import type {
  FilterParameters,
  Item,
  ItemId,
  MatchedItem,
  MatchedItems,
} from '@/app/items/types'
import { VALID_META_PROPS } from './constants'

export interface SheinProduct extends Item {
  brand: string
  meta: Record<string, string>
}

interface ProductsFilterParams extends FilterParameters {
  budget?: number
}

// the standardized dataset
const PRODUCTS_PATH = resolve(process.cwd(), 'src/app/data/shein-products.json')
const PRODUCTS = readJsonSync(PRODUCTS_PATH) as Record<ItemId, SheinProduct>

const miniSearch = new MiniSearch({
  idField: 'id',

  // fields to index for full-text search: name and all meta properties (using
  // dot notation)
  fields: [
    'name',
    ...Array.from(VALID_META_PROPS).map((prop) => `meta.${prop}`),
  ],

  // Provide a handler to access the meta properties using dot notation
  extractField: (document, fieldName) =>
    fieldName.split('.').reduce((doc, key) => doc && doc[key], document),
})

// add all products to the search index
miniSearch.addAll(Object.values(PRODUCTS))

const MAX_PRODUCTS_COUNT = 10

/**
 * Returns a product searcher function that will return the top products that match
 * @param randomize Whether to randomize the results or not
 * @returns a function that returns the matched products
 */
export const buildProductSearch = (randomize = true) => {
  /**
   * Returns the top products that match the filter parameters
   * @param filterParams Parameters to filter the products by
   * @returns the matched products
   */
  const searchProducts = async (
    filterParams: ProductsFilterParams,
  ): Promise<MatchedItems> => {
    console.log('Searching for Shein products:', filterParams)

    // create a search query (e.g. "blue dress") without the `budget`
    const { budget, id, ...filter } = filterParams
    let queries = Object.values(filter)
      .filter((value): value is string => typeof value === 'string')
      .map((value) => {
        // if the value is a comma-separated list, then this is an OR sub-query (any
        // of the values can match)
        if (value.includes(',')) {
          const orQueries = value.split(',').map((v) => v.trim())

          return {
            queries: orQueries,
            combineWith: 'OR',
          }
        }

        return value
      })

    // NOTE: Searching by just the `budget` does not work because there are no
    // queries so the search doesn't even run in order to run the budget
    // matching below.

    const results = miniSearch
      .search({
        combineWith: 'AND',
        queries,
        prefix: (term) => term.length > 4,
        fuzzy: (term) => (term.length > 6 ? 0.2 : false),
        boost: { name: 2 },
      })
      .filter((result) => {
        const product = PRODUCTS[result.id]

        return (
          // filter out products that are over the budget from search results
          (!budget || !product.price || product.price <= budget) &&
          // in case an ID is passed, only return that product
          (!id || result.id === id)
        )
      })
    const randomizedResults = randomize
      ? results.sort(() => Math.random() - 0.5)
      : results
    const matchedItems = randomizedResults
      .slice(0, MAX_PRODUCTS_COUNT)

      // include the product name in the results so that the model has more
      // information to work with
      .map(
        (result): MatchedItem => ({
          id: result.id,
          title: PRODUCTS[result.id].title,
          price: PRODUCTS[result.id].price,
        }),
      )

    return { items: matchedItems }
  }

  return searchProducts
}

/**
 * Get the products for the given item IDs
 */
export const getProducts = async (
  itemIds: string[],
): Promise<SheinProduct[]> => {
  if (itemIds.length === 0) {
    return []
  }

  return itemIds
    .map((itemId) => PRODUCTS[itemId])
    .filter((product): product is SheinProduct => Boolean(product))
}
