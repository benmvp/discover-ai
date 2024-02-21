import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import MiniSearch from 'minisearch'
import type {
  ProductFilterParams,
  MatchedProducts,
  SheinProduct,
  ParsedChatCompletionAssistantMessageParam,
  ExtendedChatCompletionMessageParam,
  ProductExtendedChatCompletionMessageParam,
} from '@/app/types'
import { isParsedAssistantMessage } from '@/app/shein/utils'
import { VALID_META_PROPS } from './constants'

// the normalized dataset
const PRODUCTS_PATH = resolve(process.cwd(), 'src/app/data/products.json')
const PRODUCTS = readJsonSync(PRODUCTS_PATH) as Record<string, SheinProduct>

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

const PRODUCT_REC_REGEX = /^.*?(s\w+\d{5,}).*$/
const PRODUCT_REC_REGEX_ALL = new RegExp(PRODUCT_REC_REGEX, 'gm')
const LINE_STARTS_WITH_SPECIAL_CHAR_REGEX = /^[^a-zA-Z0-9\s]/

/**
 * The maximum length of a line that contains a SKU ID. This is used for the
 * case where a SKU ID is included in a paragraph of text.
 */
const MAX_SKU_LINE_LENGTH = 150

/**
 * Parses the assistant messages to extract the recommended SKU IDs from each
 * @param assistantContent The assistant message content
 */
export const parseRecommendedSkuIds = (
  assistantContent: string,
): Pick<
  ParsedChatCompletionAssistantMessageParam,
  'skuIds' | 'tokenizedContent'
> => {
  // extract the SKU IDs from the assistant message. because there may be multiple
  // sections of products, we group them by paragraph
  const groupedSkuIds: ParsedChatCompletionAssistantMessageParam['skuIds'] = []

  // the goal is to split the assistant message into paragraphs, but in certain
  // cases there is a line of text that is not a paragraph (multiple line breaks
  // in a row), but only separate by a single line break from the recommended
  // skus. so we find those non-SKU lines and wrap them in extra newlines so
  // they are treated as paragraphs when we split on 2+ newlines
  const paragraphs = assistantContent
    .split('\n')
    .map((line) => (PRODUCT_REC_REGEX.test(line) ? line : `\n${line}\n`))
    .join('\n')
    .split(/\n{2}/)
    .filter(Boolean)
    .map((paragraph) => paragraph.trim())

  // the tokenized messages are the same as the paragraphs except some are
  // replaced with `null` where the products list should be
  const tokenizedMessages = paragraphs.map((paragraph) => {
    const matches = [...paragraph.matchAll(PRODUCT_REC_REGEX_ALL)]
    const skuIds = matches
      .map(
        (
          // `skuId` is the first capture group (2nd item)
          [line, skuId],
        ) =>
          // use the SKU ID if the line is short or starts with a special character (i.e. a bullet)
          line.length < MAX_SKU_LINE_LENGTH ||
          LINE_STARTS_WITH_SPECIAL_CHAR_REGEX.test(line)
            ? // remove any non-word characters from the SKU ID just in case some are left
              skuId.replaceAll(/\W/g, '')
            : '',
      )
      .filter(Boolean)

    groupedSkuIds.push(skuIds)

    return skuIds.length ? null : paragraph
  })

  return {
    skuIds: groupedSkuIds,
    tokenizedContent: tokenizedMessages,
  }
}

/**
 * Get the products for the given SKU IDs
 */
export const getProducts = async (
  skuIds: string[],
): Promise<SheinProduct[]> => {
  if (skuIds.length === 0) {
    return []
  }

  return Promise.resolve(skuIds.map((skuId) => PRODUCTS[skuId]))
}

/**
 * Add the full product details to the assistant messages with SKU IDs
 */
export const addProductsToMessages = async (
  messages: ExtendedChatCompletionMessageParam[],
) => {
  // Build up a list of all the SKU IDs in the response messages
  const allSkuIds = new Set(
    messages
      .filter(isParsedAssistantMessage)
      .map((message) => message.skuIds.flat())
      .flat(),
  )
  const allProducts = await getProducts(Array.from(allSkuIds))
  const skuIdToProductMap = new Map(
    allProducts.map((product) => [product.skuId, product]),
  )

  // add `products` property to each of the assistant
  return messages.map((message): ProductExtendedChatCompletionMessageParam => {
    if (!isParsedAssistantMessage(message)) {
      return message
    }

    const products = Object.fromEntries(
      message.skuIds
        // flatten the group of SKU IDs
        .flat()

        // get the product for each SKU ID
        .map((id) => skuIdToProductMap.get(id))

        // filter out any `undefined` products
        .filter((product): product is SheinProduct => Boolean(product))

        // convert to entries
        .map((product) => [product.skuId, product]),
    )

    return {
      ...message,
      products,
    }
  })
}
