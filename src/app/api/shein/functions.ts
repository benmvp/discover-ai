import { buildProductSearch } from './products'
import { SEARCH_FUNCTION_NAME } from './constants'
import { RunnableFunctionDeclaration } from '@/ai/types'
import { ProductFilterParams } from '@/app/types'

const SEARCH_FUNCTION: RunnableFunctionDeclaration<ProductFilterParams> = {
  name: SEARCH_FUNCTION_NAME,
  description: 'Gets the products that match the parameters',
  function: buildProductSearch(),
  parameters: {
    type: 'object',
    properties: {
      budget: {
        description: 'The maximum price they are willing to pay for a product',
        type: 'integer',
        minimum: 0,
        maximum: 50,
      },
      color: {
        description:
          'The color of the product they are looking for (e.g "black", "multicolor", "plaid", etc.)',
        type: 'string',
      },
      length: {
        description:
          'The length of the product they are looking for (e.g "mini", "midi", "maxi", "short", "regular", "long", etc.)',
        type: 'string',
      },
      pattern: {
        description:
          'The pattern of the product they are looking for (e.g "solid", "plain", "floral", "striped", etc.)',
        type: 'string',
      },
      style: {
        description:
          'The style of the product they are looking for (e.g "casual", "elegant", "sexy", "party", "sports", "boho", "high waist", etc.)',
        type: 'string',
      },
      type: {
        description:
          'The type of the product they are looking for (e.g "dress", "shirt", "pants", "skirt", "shorts", etc.)',
        type: 'string',
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: RunnableFunctionDeclaration[] = [
  SEARCH_FUNCTION,
]
