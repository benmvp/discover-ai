type SkuId = string
export interface SheinProduct {
  brand: string
  image: string
  meta: Record<string, string>
  name: string
  price: number
  skuId: SkuId
  // sizes: string[]
  url: string
}
export type SheinProducts = Record<string, SheinProduct>
