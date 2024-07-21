declare module 'bestbuy' {
  export interface BestBuyOptions {
    key?: string
    url?: string
    debug?: boolean
    headers?: Record<string, string>
    requestsPerSecond?: number
    maxRetries?: number
    retryInterval?: number
    timeout?: number
  }

  export interface Response {
    from: number
    to: number
    total: number
    currentPage: number
    totalPages: number
    queryTime: number
    totalTime: number
    partial: boolean
    canonicalUrl: string
  }

  export interface ProductsResponse<Product> extends Response {
    products: Product[]
  }

  export interface ProductSearchParams {
    /**
     * The format of the response (default: json)
     */
    format?: 'json' | 'xml'
    /**
     * Which fields (comma separated) to include in the response
     */
    show?: string
    /**
     * The page number to retrieve (default: 1)
     */
    page?: number
    /**
     * The number of items to retrieve per page up to 100 per page (default: 10)
     */
    pageSize?: number
    /**
     * Which fields (comma separated) to sort by (`field.asc` or `field.desc`)
     */
    sort?: string
    /**
     * Retrieves a summary information about the items that are returned by the query
     */
    facets?: string
  }

  export default class BestBuy {
    constructor(options?: BestBuyOptions | string)

    /**
     * Search the Best Buy product catalog, past and present.
     * @param search The search query to filter the products by (see: https://bestbuyapis.github.io/api-documentation/?javascript#search-by-date-range)
     * @param params The parameters dictating how the results are returned
     */
    products<Product>(
      search: string,
      params?: ProductSearchParams,
    ): Promise<ProductsResponse<Product>>
  }
}
