import BestBuy from 'bestbuy'
import {
  FilterParameters,
  Item,
  ItemId,
  MatchedItem,
  MatchedItems,
} from '@/app/items/types'

export interface BestBuyProduct extends Item {}

/**
 * Global cache of products returned from the Best Buy search API
 */
const PRODUCTS = new Map<ItemId, BestBuyProduct>()

/**
 * The product returned from the Best Buy search API
 */
interface BestBuySearchProduct {
  /**
   * URL of the BESTBUY.com product detail page impage for the product
   */
  image: string
  /**
   * Detailed product description
   */
  longDescription: string | null
  /**
   * Product name
   */
  name: string
  /**
   * 	Current item selling price
   */
  salePrice: number
  /**
   * Best Buy unique 7-digit product identifier
   */
  sku: number
  /**
   * URL to the BESTBUY.com product detail page for the product
   */
  url: string
}

interface ProductFilterParams extends FilterParameters {
  color?: string
  category?: string
  customerReviewAverage?: number
  freeShipping?: boolean
  inStoreAvailability?: boolean
  manufacturer?: string
  onlineAvailability?: boolean
  onSale?: boolean
  salePrice?: number
  search?: string
}

const toItem = (product: BestBuySearchProduct): BestBuyProduct => ({
  id: product.sku.toString(),
  imageUrl: product.image,
  price: product.salePrice,
  title: product.name,
  url: product.url,
})

/**
 * Returns the top products that match the filter parameters
 * @param filterParams Parameters to filter the products by
 * @returns the matched products
 */
export const searchProducts = async (
  filterParams: ProductFilterParams,
): Promise<MatchedItems> => {
  const bbClient = new BestBuy({
    key: process.env.BESTBUY_API_KEY,
    // debug: true,
  })
  const {
    category,
    customerReviewAverage,
    salePrice,
    search,
    ...otherFilterParams
  } = filterParams
  const searchQuery: string[] = []

  if (category) {
    // NOTE: By default the category path name would be an exact match, but we
    // want to allow for partial matches. So we add a wildcard (`*`) to the end
    // of the category path name
    searchQuery.push(`categoryPath.name=${category}*`)
  }
  if (search) {
    // split the search query into individual words and add each separately to the search query
    searchQuery.push(...search.split(' ').map((word) => `search=${word}`))
  }
  if (salePrice) {
    searchQuery.push(`salePrice<=${salePrice}`)
  }
  if (customerReviewAverage) {
    searchQuery.push(`customerReviewAverage>=${customerReviewAverage}`)
  }

  searchQuery.push(
    ...Object.entries(otherFilterParams)
      .map(([key, value]) => {
        if (value === undefined) {
          return ''
        }
        if (typeof value === 'boolean') {
          return `${key}=${value ? 'true' : 'false'}`
        }

        return `${key}=${value}`
      })
      // remove any empty strings
      .filter(Boolean),
  )

  let products: BestBuySearchProduct[] = []

  try {
    const results = await bbClient.products<BestBuySearchProduct>(
      searchQuery.join('&'),
      {
        show: 'sku,name,salePrice,longDescription,image,url',
      },
    )

    products = results.products
  } catch (error) {
    console.error('Error searching for products:', error)
  }

  const items = products.map(
    (product): MatchedItem => ({
      id: product.sku.toString(),
      title: product.name,
      description: product.longDescription ?? undefined,
      price: product.salePrice,
    }),
  )

  // add the products to the cache for later retrieval when building up the
  // response messages (in `getProducts`)
  for (const product of products) {
    PRODUCTS.set(product.sku.toString(), toItem(product))
  }

  return {
    items,
  }
}

/**
 * Get the products for the given item IDs
 */
export const getProducts = async (
  itemIds: string[],
): Promise<BestBuyProduct[]> => {
  if (itemIds.length === 0) {
    return []
  }

  return itemIds
    .map((itemId) => PRODUCTS.get(itemId))
    .filter((product): product is BestBuyProduct => Boolean(product))
}
