import { FunctionDeclarationSchemaType } from '@google/generative-ai'
import type { FunctionDeclaration } from '@/app/types'
import { SEARCH_FUNCTION_NAME } from './constants'
import { delimitSearchResults } from '../items'
import { searchPlans } from './plans'
import { COLLECTIONS } from '../sdks/houseplans'

const SEARCH_FUNCTION = delimitSearchResults(searchPlans)
const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches the floorplan database to get floorplans that match the specified attributes',
  function: SEARCH_FUNCTION,
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    description: 'The parameters to filter the floorplans by',
    properties: {
      // Collection
      collection: {
        description:
          'The top-level editorialized grouping of common types of floorplans',
        type: FunctionDeclarationSchemaType.STRING,
        enum: [...COLLECTIONS],
      },

      // Bedroom Search Parameters
      bd1: {
        description: 'Whether or not to include 1-bedroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bd2: {
        description: 'Whether or not to include 2-bedroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bd3: {
        description: 'Whether or not to include 3-bedroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bd4: {
        description: 'Whether or not to include 4-bedroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bd5p: {
        description: 'Whether or not to include 5-bedroom or larger houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Bathroom Search Parameters
      ba1: {
        description: 'Whether or not to include 1-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba1h: {
        description: 'Whether or not to include 1.5-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba2: {
        description: 'Whether or not to include 2-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba2h: {
        description: 'Whether or not to include 2.5-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba3: {
        description: 'Whether or not to include 3-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba3h: {
        description: 'Whether or not to include 3.5-bathroom houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ba4p: {
        description: 'Whether or not to include 4-bathroom or larger houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Story Search Parameters
      s1: {
        description: 'Whether or not to include single-story houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      s2: {
        description: 'Whether or not to include two-story houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      s3p: {
        description: 'Whether or not to include three-story or higher houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Garage Search Parameters
      g1: {
        description: 'Whether or not to include houses with 1-car garages',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      g2: {
        description: 'Whether or not to include houses with 2-car garages',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      g3p: {
        description:
          'Whether or not to include houses with 3-car or higher garages',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Dimension Search Parameters
      mndp: {
        description: 'The minimum depth of the house (ft)',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      mnsqft: {
        description: 'The minimum square footage of the house',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      mnwd: {
        description: 'The minimum width of the house (ft)',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      mxdp: {
        description: 'The maximum depth of the house (ft)',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      mxsqft: {
        description: 'The maximum square footage of the house',
        type: FunctionDeclarationSchemaType.NUMBER,
      },
      mxwd: {
        description: 'The maximum width of the house (ft)',
        type: FunctionDeclarationSchemaType.NUMBER,
      },

      // Architectural Styles
      as: {
        description:
          'Whether or not to include Adobe/Southwestern style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      br: {
        description: 'Whether or not to include Barndominium style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      be: {
        description: 'Whether or not to include Beach style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bu: {
        description: 'Whether or not to include Bungalow style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cb: {
        description: 'Whether or not to include Cabin style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cl: {
        description: 'Whether or not to include Classical style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      co: {
        description: 'Whether or not to include Colonial style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cp: {
        description: 'Whether or not to include Contemporary style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ct: {
        description: 'Whether or not to include Cottage style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cu: {
        description: 'Whether or not to include Country style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cr: {
        description: 'Whether or not to include Craftsman style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      eu: {
        description: 'Whether or not to include European style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      fh: {
        description: 'Whether or not to include Farmhouse style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      lo: {
        description: 'Whether or not to include Log style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      me: {
        description: 'Whether or not to include Mediterranean style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      mo: {
        description: 'Whether or not to include Modern style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      pr: {
        description: 'Whether or not to include Prairie style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ra: {
        description: 'Whether or not to include Ranch style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      so: {
        description: 'Whether or not to include Southern style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      tr: {
        description: 'Whether or not to include Traditional style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      tu: {
        description: 'Whether or not to include Tudor style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      vi: {
        description: 'Whether or not to include Victorian style houses',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Bedroom & Bathroom Features
      cbn: {
        description: 'Whether or not to include houses with a Cabana',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      '2ms': {
        description: 'Whether or not to include houses with 2 Master Suites',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      frp: {
        description: 'Whether or not to include houses with a Fireplace',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      fdn: {
        description:
          'Whether or not to include houses with a Formal Dining Room',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      flr: {
        description:
          'Whether or not to include houses with a Formal Living Room/Parlor',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      gsu: {
        description: 'Whether or not to include houses with a Guest Suite',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      llb: {
        description:
          'Whether or not to include houses with Lower Level Bedrooms',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      mfb: {
        description:
          'Whether or not to include houses with Main Floor Bedrooms',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      mfm: {
        description:
          'Whether or not to include houses with a Main Floor Master Bedroom',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      spb: {
        description: 'Whether or not to include houses with Split Bedrooms',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      ubb: {
        description: 'Whether or not to include houses with Upstairs Bedrooms',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      umb: {
        description:
          'Whether or not to include houses with an Upstairs Master Bedroom',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      wic: {
        description: 'Whether or not to include houses with a Walk-In Closet',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Kitchen Features
      nok: {
        description: 'Whether or not to include houses with a Breakfast Nook',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      peb: {
        description: 'Whether or not to include houses with an Eating Bar',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      kis: {
        description: 'Whether or not to include houses with a Kitchen Island',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      kit: {
        description:
          'Whether or not to include houses with a Kitchenette/Wet Bar',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      wnp: {
        description:
          'Whether or not to include houses with a Walk-In Pantry/Cabinet Pantry',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      bsp: {
        description: "Whether or not to include houses with a Butler's Pantry",
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Outdoor Features
      blc: {
        description: 'Whether or not to include houses with a Balcony',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      brz: {
        description: 'Whether or not to include houses with a Breezeway',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cty: {
        description: 'Whether or not to include houses with a Courtyard',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      cfp: {
        description:
          'Whether or not to include houses with a Covered Front Porch',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      crp: {
        description:
          'Whether or not to include houses with a Covered Rear Porch',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      dck: {
        description: 'Whether or not to include houses with a Deck',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      gds: {
        description:
          'Whether or not to include houses with a Grill/Deck/Sundeck',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      odf: {
        description:
          'Whether or not to include houses with an Outdoor Fireplace',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      okg: {
        description:
          'Whether or not to include houses with an Outdoor Kitchen/Grill',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      srp: {
        description: 'Whether or not to include houses with a Screened Porch',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      wap: {
        description:
          'Whether or not to include houses with a Wrap-Around Porch',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },

      // Other Features
      elv: {
        description: 'Whether or not to include houses with an Elevator',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      emn: {
        description:
          'Whether or not to include houses suited for Empty Nesters',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      tsj: {
        description: 'Whether or not to include houses with a Jack & Jill Bath',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      svh: {
        description:
          'Whether or not to include houses Suited For Vacation Home',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
      wca: {
        description:
          'Whether or not to include houses that are Wheelchair Adaptable',
        type: FunctionDeclarationSchemaType.BOOLEAN,
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
