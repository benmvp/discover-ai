import { FunctionDeclarationSchemaType } from '@google/generative-ai'
import type { FunctionDeclaration } from '@/app/types'
import { searchProducts } from './products'
import { SEARCH_FUNCTION_NAME } from './constants'
import { delimitSearchResults } from '../items'

const SEARCH_FUNCTION = delimitSearchResults(searchProducts)
const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches the Best Buy catalog to get the products that match the specified attributes',
  function: SEARCH_FUNCTION,
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    description: 'The parameters to filter the products by',
    properties: {
      color: {
        description: 'The color of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['black', 'silver', 'red'],
      },
      category: {
        description: 'The category of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'Cell Phones',
          'Headphones',
          'Laptops & Computers',
          'Refrigerators',
          'Speakers',
          'Tablets',
          'TVs',
          'Video Games',
        ],
      },
      customerReviewAverage: {
        description:
          'The customer review rating they are looking for (or higher). A way to determine the quality of a product. Must be between 0 and 5. Top rated products are >= 4.5',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      freeShipping: {
        description:
          'Whether or not the product they are looking is available in store',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      inStoreAvailability: {
        description:
          'Whether or not the product they are looking is available in a store',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      manufacturer: {
        description:
          'The manufacturer or brand of the product they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'Case-Mate',
          'Insignia',
          'Rocketfish',
          'Samsung',
          'Whirlpool',
        ],
      },
      onlineAvailability: {
        description:
          'Whether or not the product they are looking is available to purchase online',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      onSale: {
        description:
          'Whether or not the product they are looking for is on sale',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      salePrice: {
        description:
          'The maximum price they are willing to spend for the product they are looking for',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      search: {
        description:
          'Arbitrary details to aid in searching for the product that they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          '18.6 mph',
          '7.1 soundbar',
          'Bluetooth',
          'Google TV',
          'Macbook',
        ],
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
