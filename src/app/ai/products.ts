import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import type {
  ProductFilterParams,
  MatchedProducts,
  SheinProduct,
} from '@/app/types'

const PRODUCTS_PATH = resolve(process.cwd(), 'src/app/data/products.json')
const PRODUCTS = readJsonSync(PRODUCTS_PATH) as Record<string, SheinProduct>

const MAX_PRODUCTS_COUNT = 8

/**
 * Searches for the `paramValue` within the `attribute` ensuring that only whole
 * words are matched
 * @param attribute The product attribute to search within @param paramValue The
 * param value to search for @returns
 */
const contains = (attribute: string, paramValue?: string | number): boolean => {
  return paramValue
    ? new RegExp(`\\b${paramValue}\\b`, 'i').test(attribute)
    : false
}

/**
 * Given filter, searches the "database" for matching products
 */
export const getMatchedProducts = async (
  filterParams: ProductFilterParams,
): Promise<MatchedProducts> => {
  // find all products that match the given params, select first 8
  const matchedProducts = Object.values(PRODUCTS)
    .filter((product) => {
      if (filterParams.budget) {
        if (product.price > filterParams.budget) {
          return false
        } else {
          delete filterParams.budget
        }
      }

      return Object.values(filterParams).every((paramValue) => {
        return (
          // Searches within the product name
          contains(product.name, paramValue) ||
          // Searches within each of the product meta data to find a match
          Object.values(product.meta).some((metaValue) =>
            contains(metaValue, paramValue),
          )
        )
      })
    })
    .slice(0, MAX_PRODUCTS_COUNT)
    .map((product) => ({ id: product.skuId, name: product.name }))

  return { products: matchedProducts }
}

const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'
const PRODUCT_REC_REGEX = /^-\s+([^\s:]+):.*$/gm

/**
 * Parses the assistant message to extract the recommended SKU IDs
 * @param assistantContent The assistant message content
 */
export const parseRecommendedSkuIds = (
  assistantContent: string,
): { skuIds: string[]; tokenizedContent: string } => {
  const matches = [...assistantContent.matchAll(PRODUCT_REC_REGEX)]
  const skuLines = matches.map(([skuLine]) => skuLine)
  const skuIds = matches.map(([, skuId]) => skuId)

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
