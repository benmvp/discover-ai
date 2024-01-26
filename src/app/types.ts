import type OpenAI from 'openai'

type SkuId = string
export interface SheinProduct {
  brand: string
  image: string
  meta: Record<string, string>
  name: string
  price: number
  skuId: SkuId
  url: string
}
export type SheinProducts = Record<string, SheinProduct>

export type ProductFilterParams = {
  budget?: number
  [x: string]: string | number | undefined
}

export interface MatchedProducts {
  products: {
    id: string
    name: string
  }[]
}

export interface ParsedChatCompletionAssistantMessageParam
  extends OpenAI.ChatCompletionAssistantMessageParam {
  /**
   * The search parameters that were used to get the matching SKUs
   */
  filter: ProductFilterParams | null

  /**
   * The matching SKUs found by the assistant for each paragraph
   */
  skuIds: SkuId[][]

  /**
   * The tokenized form of the content for each paragraph in order to substitute
   * the products list in the message on the frontend
   */
  tokenizedContent: (string | null)[]
}
export type ExtendedChatCompletionMessageParam =
  | OpenAI.ChatCompletionMessageParam
  | ParsedChatCompletionAssistantMessageParam

export interface ProductChatCompletionAssistantMessageParam
  extends ParsedChatCompletionAssistantMessageParam {
  /**
   * The product data for each of the `skuIds`
   */
  products: Record<SkuId, SheinProduct>
}

export type ProductExtendedChatCompletionMessageParam =
  | ExtendedChatCompletionMessageParam
  | ProductChatCompletionAssistantMessageParam
