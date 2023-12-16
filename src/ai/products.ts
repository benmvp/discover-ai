import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import type { SheinProduct } from '@/data/types'

const DATA_PATH = resolve(__dirname, '../data/products.json')
const DATA = readJsonSync(DATA_PATH) as Record<string, SheinProduct>

const MAX_PRODUCTS_COUNT = 8

export type ProductFilterParams = {
  budget?: number
  [x: string]: string | number | undefined
}

interface MatchingSkus {
  skus: {
    id: string
    name: string
  }[]
}

export const getMatchingSkus = async (
  params: ProductFilterParams,
): Promise<MatchingSkus> => {
  console.log('getMatchingSkus', params)

  // find all products that match the given params, randomly select 8
  const matchedSkus = Object.values(DATA)
    .filter((product) => {
      if (params.budget) {
        if (product.price > params.budget) {
          return false
        } else {
          delete params.budget
        }
      }

      return Object.values(params).every((paramValue) => {
        const paramValueLower = String(paramValue).toLowerCase()

        return (
          product.name.toLowerCase().includes(paramValueLower) ||
          Object.values(product.meta).some((metaValue) =>
            metaValue.toLowerCase().includes(paramValueLower),
          )
        )
      })
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, MAX_PRODUCTS_COUNT)
    .map((product) => ({ id: product.skuId, name: product.name }))

  console.log('matchedSkus', matchedSkus)

  return { skus: matchedSkus }
}
