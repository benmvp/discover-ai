import { FunctionDeclarationSchemaType } from '@google/generative-ai'
import type { FunctionDeclaration } from '@/app/types'
import { buildProductSearch } from './products'
import { SEARCH_FUNCTION_NAME } from './constants'
import { delimitSearchResults } from '../items'

const SEARCH_FUNCTION = delimitSearchResults(buildProductSearch())
const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description: 'Gets the products that match the parameters',
  function: SEARCH_FUNCTION,
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    description: 'The parameters to filter the products by',
    properties: {
      budget: {
        description:
          'The maximum price they are willing to pay for a product. Must be between 0 and 50',
        type: FunctionDeclarationSchemaType.INTEGER,
      },
      color: {
        description: 'The color of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['black', 'multicolor', 'plaid'],
      },
      length: {
        description: 'The length of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['mini', 'midi', 'maxi', 'short', 'regular', 'long'],
      },
      pattern: {
        description: 'The pattern of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['solid', 'plain', 'floral', 'striped'],
      },
      style: {
        description: 'The style of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'casual',
          'elegant',
          'sexy',
          'party',
          'sports',
          'boho',
          'high waist',
        ],
      },
      type: {
        description: 'The type of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['dress', 'shirt', 'pants', 'skirt', 'shorts'],
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
