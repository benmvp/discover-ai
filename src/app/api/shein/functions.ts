import type { FunctionDeclaration } from '@/ai/types'
import { buildProductSearch } from './products'
import { SEARCH_FUNCTION_NAME } from './constants'

const SEARCH_FUNCTION = buildProductSearch()
const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description: 'Gets the products that match the parameters',
  function: SEARCH_FUNCTION,
  parameters: {
    type: 'object',
    description: 'The parameters to filter the products by',
    properties: {
      budget: {
        description: 'The maximum price they are willing to pay for a product',
        type: 'integer',
        // minimum: 0,
        // maximum: 50,
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

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
