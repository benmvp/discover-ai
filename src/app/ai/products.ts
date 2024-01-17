import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import MiniSearch from 'minisearch'
import type {
  ProductFilterParams,
  MatchedProducts,
  SheinProduct,
} from '@/app/types'

// the normalized dataset
const PRODUCTS_PATH = resolve(process.cwd(), 'src/app/data/products.json')
const PRODUCTS = readJsonSync(PRODUCTS_PATH) as Record<string, SheinProduct>

export const VALID_META_PROPS = new Set([
  'Bottom Type',
  'Bra Type',
  'Closure Type',
  'Color',
  'Composition',
  'Details',
  'Fabric',
  'Fit Type',
  'Length',
  'Material',
  'Neckline',
  'Pattern Type',
  'Pockets',
  'Sleeve Length',
  'Sleeve Type',
  'Style',
  'Top Type',
  'Type',
  'Waist Line',
])

const miniSearch = new MiniSearch({
  idField: 'skuId',

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
    filterParams: ProductFilterParams,
  ): Promise<MatchedProducts> => {
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
      .filter(
        (result) =>
          // filter out products that are over the budget from search results
          (!budget || PRODUCTS[result.id].price <= budget) &&
          // in case a SKU ID is passed, only return that product
          (!id || result.id === id),
      )
    const randomizedResults = randomize
      ? results.sort(() => Math.random() - 0.5)
      : results
    const products = randomizedResults
      .slice(0, MAX_PRODUCTS_COUNT)

      // include the product name in the results so that GPT has more
      // information to work with
      .map((result) => ({ id: result.id, name: PRODUCTS[result.id].name }))

    return { products }
  }

  return searchProducts
}

const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'
const PRODUCT_REC_REGEX = /^(-|\d+\.)\s+([^\s:]+):.*$/gm

/**
 * Parses the assistant message to extract the recommended SKU IDs
 * @param assistantContent The assistant message content
 */
export const parseRecommendedSkuIds = (
  assistantContent: string,
): { skuIds: string[]; tokenizedContent: string } => {
  const matches = [...assistantContent.matchAll(PRODUCT_REC_REGEX)]
  const skuLines = matches.map(([skuLine]) => skuLine)
  const skuIds = matches.map(
    (
      // `skuId` is the second capture group
      [, , skuId],
    ) =>
      // remove any non-word characters from the SKU ID just in case some are left
      skuId.replaceAll(/\W/g, ''),
  )

  // replace the list of products with a token so that we can replace it with UI
  // code later
  const tokenizedMessage =
    skuIds.length > 0
      ? assistantContent.replace(skuLines.join('\n'), PRODUCTS_LIST_TOKEN)
      : assistantContent

  return {
    skuIds,
    tokenizedContent: tokenizedMessage,
  }
}

export const getProducts = (skuIds: string[]) => {
  return skuIds.map((skuId) => PRODUCTS[skuId])
}
