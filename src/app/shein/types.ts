import type {
  FilterParameters,
  Item,
  ItemAssistantMessage,
  ItemExtendedMessage,
  ItemId,
} from '@/app/items/types'

export interface SheinProduct extends Item {
  brand: string
  meta: Record<string, string>
}
export type SheinProducts = Record<ItemId, SheinProduct>

export interface ProductFilterParams extends FilterParameters {
  budget?: number
}

/**
 * A parsed assistant message that has the product content for each of the `itemIds`
 */
export type SheinProductAssistantMessage = ItemAssistantMessage<SheinProduct>

/**
 * A product message or a regular message
 */
export type SheinProductExtendedMessage = ItemExtendedMessage<SheinProduct>
