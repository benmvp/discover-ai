import type { FunctionDeclaration } from '@/app/types'
import { SEARCH_FUNCTION_NAME } from './constants'
import { searchPlans } from './plans'
import { COLLECTIONS } from '../sdks/houseplans'

const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  parse: JSON.parse,
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches the floorplan database to get floorplans that match the specified attributes',
  function: searchPlans,
  parameters: {
    type: 'object',
    description: 'The parameters to filter the floorplans by',
    properties: {
      // Collection
      collection: {
        description:
          'The top-level editorialized grouping of common types of floorplans',
        type: 'string',
        enum: [...COLLECTIONS],
      },

      // Bedroom Search Parameters
      bd1: {
        description: 'Whether or not to include 1-bedroom houses',
        type: 'boolean',
      },
      bd2: {
        description: 'Whether or not to include 2-bedroom houses',
        type: 'boolean',
      },
      bd3: {
        description: 'Whether or not to include 3-bedroom houses',
        type: 'boolean',
      },
      bd4: {
        description: 'Whether or not to include 4-bedroom houses',
        type: 'boolean',
      },
      bd5p: {
        description: 'Whether or not to include 5-bedroom or larger houses',
        type: 'boolean',
      },

      // Bathroom Search Parameters
      ba1: {
        description: 'Whether or not to include 1-bathroom houses',
        type: 'boolean',
      },
      ba1h: {
        description: 'Whether or not to include 1.5-bathroom houses',
        type: 'boolean',
      },
      ba2: {
        description: 'Whether or not to include 2-bathroom houses',
        type: 'boolean',
      },
      ba2h: {
        description: 'Whether or not to include 2.5-bathroom houses',
        type: 'boolean',
      },
      ba3: {
        description: 'Whether or not to include 3-bathroom houses',
        type: 'boolean',
      },
      ba3h: {
        description: 'Whether or not to include 3.5-bathroom houses',
        type: 'boolean',
      },
      ba4p: {
        description: 'Whether or not to include 4-bathroom or larger houses',
        type: 'boolean',
      },

      // Story Search Parameters
      s1: {
        description: 'Whether or not to include single-story houses',
        type: 'boolean',
      },
      s2: {
        description: 'Whether or not to include two-story houses',
        type: 'boolean',
      },
      s3p: {
        description: 'Whether or not to include three-story or higher houses',
        type: 'boolean',
      },

      // Garage Search Parameters
      g1: {
        description: 'Whether or not to include houses with 1-car garages',
        type: 'boolean',
      },
      g2: {
        description: 'Whether or not to include houses with 2-car garages',
        type: 'boolean',
      },
      g3p: {
        description:
          'Whether or not to include houses with 3-car or higher garages',
        type: 'boolean',
      },

      // Dimension Search Parameters
      mndp: {
        description: 'The minimum depth of the house (ft)',
        type: 'number',
      },
      mnsqft: {
        description: 'The minimum square footage of the house',
        type: 'number',
      },
      mnwd: {
        description: 'The minimum width of the house (ft)',
        type: 'number',
      },
      mxdp: {
        description: 'The maximum depth of the house (ft)',
        type: 'number',
      },
      mxsqft: {
        description: 'The maximum square footage of the house',
        type: 'number',
      },
      mxwd: {
        description: 'The maximum width of the house (ft)',
        type: 'number',
      },

      // Architectural Styles
      as: {
        description:
          'Whether or not to include Adobe/Southwestern style houses',
        type: 'boolean',
      },
      br: {
        description: 'Whether or not to include Barndominium style houses',
        type: 'boolean',
      },
      be: {
        description: 'Whether or not to include Beach style houses',
        type: 'boolean',
      },
      bu: {
        description: 'Whether or not to include Bungalow style houses',
        type: 'boolean',
      },
      cb: {
        description: 'Whether or not to include Cabin style houses',
        type: 'boolean',
      },
      cl: {
        description: 'Whether or not to include Classical style houses',
        type: 'boolean',
      },
      co: {
        description: 'Whether or not to include Colonial style houses',
        type: 'boolean',
      },
      cp: {
        description: 'Whether or not to include Contemporary style houses',
        type: 'boolean',
      },
      ct: {
        description: 'Whether or not to include Cottage style houses',
        type: 'boolean',
      },
      cu: {
        description: 'Whether or not to include Country style houses',
        type: 'boolean',
      },
      cr: {
        description: 'Whether or not to include Craftsman style houses',
        type: 'boolean',
      },
      eu: {
        description: 'Whether or not to include European style houses',
        type: 'boolean',
      },
      fh: {
        description: 'Whether or not to include Farmhouse style houses',
        type: 'boolean',
      },
      lo: {
        description: 'Whether or not to include Log style houses',
        type: 'boolean',
      },
      me: {
        description: 'Whether or not to include Mediterranean style houses',
        type: 'boolean',
      },
      mo: {
        description: 'Whether or not to include Modern style houses',
        type: 'boolean',
      },
      pr: {
        description: 'Whether or not to include Prairie style houses',
        type: 'boolean',
      },
      ra: {
        description: 'Whether or not to include Ranch style houses',
        type: 'boolean',
      },
      so: {
        description: 'Whether or not to include Southern style houses',
        type: 'boolean',
      },
      tr: {
        description: 'Whether or not to include Traditional style houses',
        type: 'boolean',
      },
      tu: {
        description: 'Whether or not to include Tudor style houses',
        type: 'boolean',
      },
      vi: {
        description: 'Whether or not to include Victorian style houses',
        type: 'boolean',
      },

      // Bedroom & Bathroom Features
      cbn: {
        description: 'Whether or not to include houses with a Cabana',
        type: 'boolean',
      },
      '2ms': {
        description: 'Whether or not to include houses with 2 Master Suites',
        type: 'boolean',
      },
      frp: {
        description: 'Whether or not to include houses with a Fireplace',
        type: 'boolean',
      },
      fdn: {
        description:
          'Whether or not to include houses with a Formal Dining Room',
        type: 'boolean',
      },
      flr: {
        description:
          'Whether or not to include houses with a Formal Living Room/Parlor',
        type: 'boolean',
      },
      gsu: {
        description: 'Whether or not to include houses with a Guest Suite',
        type: 'boolean',
      },
      llb: {
        description:
          'Whether or not to include houses with Lower Level Bedrooms',
        type: 'boolean',
      },
      mfb: {
        description:
          'Whether or not to include houses with Main Floor Bedrooms',
        type: 'boolean',
      },
      mfm: {
        description:
          'Whether or not to include houses with a Main Floor Master Bedroom',
        type: 'boolean',
      },
      spb: {
        description: 'Whether or not to include houses with Split Bedrooms',
        type: 'boolean',
      },
      ubb: {
        description: 'Whether or not to include houses with Upstairs Bedrooms',
        type: 'boolean',
      },
      umb: {
        description:
          'Whether or not to include houses with an Upstairs Master Bedroom',
        type: 'boolean',
      },
      wic: {
        description: 'Whether or not to include houses with a Walk-In Closet',
        type: 'boolean',
      },

      // Kitchen Features
      nok: {
        description: 'Whether or not to include houses with a Breakfast Nook',
        type: 'boolean',
      },
      peb: {
        description: 'Whether or not to include houses with an Eating Bar',
        type: 'boolean',
      },
      kis: {
        description: 'Whether or not to include houses with a Kitchen Island',
        type: 'boolean',
      },
      kit: {
        description:
          'Whether or not to include houses with a Kitchenette/Wet Bar',
        type: 'boolean',
      },
      wnp: {
        description:
          'Whether or not to include houses with a Walk-In Pantry/Cabinet Pantry',
        type: 'boolean',
      },
      bsp: {
        description: "Whether or not to include houses with a Butler's Pantry",
        type: 'boolean',
      },

      // Outdoor Features
      blc: {
        description: 'Whether or not to include houses with a Balcony',
        type: 'boolean',
      },
      brz: {
        description: 'Whether or not to include houses with a Breezeway',
        type: 'boolean',
      },
      cty: {
        description: 'Whether or not to include houses with a Courtyard',
        type: 'boolean',
      },
      cfp: {
        description:
          'Whether or not to include houses with a Covered Front Porch',
        type: 'boolean',
      },
      crp: {
        description:
          'Whether or not to include houses with a Covered Rear Porch',
        type: 'boolean',
      },
      dck: {
        description: 'Whether or not to include houses with a Deck',
        type: 'boolean',
      },
      gds: {
        description:
          'Whether or not to include houses with a Grill/Deck/Sundeck',
        type: 'boolean',
      },
      odf: {
        description:
          'Whether or not to include houses with an Outdoor Fireplace',
        type: 'boolean',
      },
      okg: {
        description:
          'Whether or not to include houses with an Outdoor Kitchen/Grill',
        type: 'boolean',
      },
      srp: {
        description: 'Whether or not to include houses with a Screened Porch',
        type: 'boolean',
      },
      wap: {
        description:
          'Whether or not to include houses with a Wrap-Around Porch',
        type: 'boolean',
      },

      // Other Features
      elv: {
        description: 'Whether or not to include houses with an Elevator',
        type: 'boolean',
      },
      emn: {
        description:
          'Whether or not to include houses suited for Empty Nesters',
        type: 'boolean',
      },
      tsj: {
        description: 'Whether or not to include houses with a Jack & Jill Bath',
        type: 'boolean',
      },
      svh: {
        description:
          'Whether or not to include houses Suited For Vacation Home',
        type: 'boolean',
      },
      wca: {
        description:
          'Whether or not to include houses that are Wheelchair Adaptable',
        type: 'boolean',
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
