import type { FunctionDeclaration } from '@/app/types'
import { searchProducts } from './products'
import { SEARCH_FUNCTION_NAME } from './constants'

const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches the Best Buy catalog to get the products that match the specified attributes',
  function: searchProducts,
  parameters: {
    type: 'object',
    description: 'The parameters to filter the products by',
    properties: {
      color: {
        description:
          'The color of the product they are looking for (e.g., black, silver, red)',
        type: 'string',
      },
      category: {
        description:
          'The category of the product they are looking for (e.g., Cell Phones, Headphones, Laptops & Computers, Refrigerators, Speakers, Tablets, TVs, Video Games)',
        type: 'string',
      },
      customerReviewAverage: {
        description:
          'The customer review rating they are looking for (or higher). A way to determine the quality of a product. Must be between 0 and 5. Top rated products are >= 4.5',
        type: 'number',
      },
      freeShipping: {
        description:
          'Whether or not the product they are looking is available in store',
        type: 'boolean',
      },
      inStoreAvailability: {
        description:
          'Whether or not the product they are looking is available in a store',
        type: 'boolean',
      },
      manufacturer: {
        description:
          'The manufacturer or brand of the product they are looking for (e.g., Case-Mate, Insignia, Rocketfish, Samsung, Whirlpool)',
        type: 'string',
      },
      onlineAvailability: {
        description:
          'Whether or not the product they are looking is available to purchase online',
        type: 'boolean',
      },
      onSale: {
        description:
          'Whether or not the product they are looking for is on sale',
        type: 'boolean',
      },
      salePrice: {
        description:
          'The maximum price they are willing to spend for the product they are looking for',
        type: 'number',
      },
      search: {
        description:
          'Arbitrary details to aid in searching for the product that they are looking for (e.g., 18.6 mph, 7.1 soundbar, Bluetooth, Google TV, Macbook)',
        type: 'string',
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
