import { FilterParameters } from '@/app/items/types'
import axios from 'axios'
import { parse } from 'node-html-parser'

export interface SdkOptions {
  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}

interface BedroomSearchParams {
  /**
   * Whether or not to include 1-bedroom houses in the search results
   */
  bd1?: boolean
  /**
   * Whether or not to include 2-bedroom houses in the search results
   */
  bd2?: boolean
  /**
   * Whether or not to include 3-bedroom houses in the search results
   */
  bd3?: boolean
  /**
   * Whether or not to include 4-bedroom houses in the search results
   */
  bd4?: boolean
  /**
   * Whether or not to include 5-bedroom or larger houses in the search results
   */
  bd5p?: boolean
}

interface BathroomSearchParams {
  /**
   * Whether or not to include 1-bathroom houses in the search results
   */
  ba1?: boolean
  /**
   * Whether or not to include 1.5-bathroom houses in the search results
   */
  ba1h?: boolean
  /**
   * Whether or not to include 2-bathroom houses in the search results
   */
  ba2?: boolean
  /**
   * Whether or not to include 2.5-bathroom houses in the search results
   */
  ba2h?: boolean
  /**
   * Whether or not to include 3-bathroom houses in the search results
   */
  ba3?: boolean
  /**
   * Whether or not to include 3.5-bathroom houses in the search results
   */
  ba3h?: boolean
  /**
   * Whether or not to include 4-bathroom or larger houses in the search results
   */
  ba4p?: boolean
}

interface StorySearchParams {
  /**
   * Whether or not to include single-story houses in the search results
   */
  s1?: boolean
  /**
   * Whether or not to include two-story houses in the search results
   */
  s2?: boolean
  /**
   * Whether or not to include three-story or higher houses in the search results
   */
  s3p?: boolean
}

interface GarageSearchParams {
  /**
   * Whether or not to include houses with 1-car garages in the search results
   */
  g1?: boolean
  /**
   * Whether or not to include houses with 2-car garages in the search results
   */
  g2?: boolean
  /**
   * Whether or not to include houses with 3-car or higher garages in the search results
   */
  g3p?: boolean
}

interface DimensionSearchParams {
  /**
   * The minimum depth of the house (ft)
   */
  mndp?: number
  /**
   * The minimum square footage of the house
   */
  mnsqft?: number
  /**
   * The minimum width of the house (ft)
   */
  mnwd?: number
  /**
   * The maximum depth of the house (ft)
   */
  mxdp?: number
  /**
   * The maximum square footage of the house
   */
  mxsqft?: number
  /**
   * The maximum width of the house (ft)
   */
  mxwd?: number
}

const FEATURE_POST_NAMES = [
  'sy', // Architectural Styles
  'bf', // Bedroom & Bath Features
  'kf', // Kitchen Features
  'os', // Outdoor Features
  'mf', // Other Features
] as const

const ARCHITECTURE_STYLES = [
  'as', // Adobe / Southwestern
  'br', // Barndominium
  'be', // Beach
  'bu', // Bungalow
  'cb', // Cabin
  'cl', // Classical
  'co', // Colonial
  'cp', // Contemporary
  'ct', // Cottage
  'cu', // Country
  'cr', // Craftsman
  'eu', // European
  'fh', // Farmhouse
  'lo', // Log
  'me', // Mediterranean
  'mo', // Modern
  'pr', // Prairie
  'ra', // Ranch
  'so', // Southern
  'tr', // Traditional
  'tu', // Tudor
  'vi', // Victorian
] as const
const BEDROOM_BATHROOM_FEATURES = [
  'cbn', // Cabana
  '2ms', // 2 Master Suites
  'frp', // Fireplace
  'fdn', // Formal Dining Room
  'flr', // Formal Living Room / Parlor
  'gsu', // Guest Suite
  'llb', // Lower Level Bedrooms
  'mfb', // Main Floor Bedrooms
  'mfm', // Main Floor Master Bedroom
  'spb', // Split Bedrooms
  'ubb', // Upstairs Bedrooms
  'umb', // Upstairs Master Bedrooms
  'wic', // Walk In Closet
] as const
const KITCHEN_FEATURES = [
  'nok', // Breakfast Nook
  'peb', // Eating Bar
  'kis', // Kitchen Island
  'kit', // Kitchenette Wet Bar
  'wnp', // Walk In Pantry Cabinet Pantry
  'bsp', // Butler's Pantry
] as const
const OUTDOOR_FEATURES = [
  'blc', // Balcony
  'brz', // Breezeway
  'cty', // Courtyard
  'cfp', // Covered Front Porch
  'crp', // Covered Rear Porch
  'dck', // Deck
  'gds', // Grill Deck Sundeck
  'odf', // Outdoor Fireplace
  'okg', // Outdoor Kitchen Grill
  'srp', // Screened Porch
  'wap', // Wrap Around Porch
] as const
const OTHER_FEATURES = [
  'elv', // Elevator
  'emn', // Empty Nester
  'tsj', // Jack & Jill Bath
  'svh', // Suited For Vacation Home
  'wca', // Wheelchair Adaptable
] as const
export const COLLECTIONS = [
  'angled-garage',
  'carport-plans',
  'family-style-house-plans',
  'house-plans-with-metal-roofs',
  'lots-of-windows',
  'mid-century-modern-house-plans',
  'open-floor-plans',
  'plans-with-safe-rooms',
  'porte-cochere',
  'simple-house-plans',
  'space-efficient-',
  'special-features-house-plans',
  'tiny-house-plans-and-micro-cottages',
  'unusual-unique',
  'vacation-home-plans',
] as const

type ArchitectureStyle = (typeof ARCHITECTURE_STYLES)[number]
type BedroomBathroomFeature = (typeof BEDROOM_BATHROOM_FEATURES)[number]
type KitchenFeature = (typeof KITCHEN_FEATURES)[number]
type OutdoorFeature = (typeof OUTDOOR_FEATURES)[number]
type OtherFeature = (typeof OTHER_FEATURES)[number]
type Collection = (typeof COLLECTIONS)[number]

type ArchitectureSearchParams = Partial<Record<ArchitectureStyle, boolean>>
type BedroomBathroomSearchParams = Partial<
  Record<BedroomBathroomFeature, boolean>
>
type KitchenSearchParams = Partial<Record<KitchenFeature, boolean>>
type OutdoorSearchParams = Partial<Record<OutdoorFeature, boolean>>
type OtherSearchParams = Partial<Record<OtherFeature, boolean>>

export interface SearchParams
  extends FilterParameters,
    BedroomSearchParams,
    BathroomSearchParams,
    StorySearchParams,
    GarageSearchParams,
    DimensionSearchParams,
    ArchitectureSearchParams,
    BedroomBathroomSearchParams,
    KitchenSearchParams,
    OutdoorSearchParams,
    OtherSearchParams {
  collection?: Collection
}

type SearchFeaturePostName = (typeof FEATURE_POST_NAMES)[number]

export interface HousePlanSearchResponseData {
  id: number
  key: string
  productId: number
  number: string
  bedrooms: number
  bathrooms: string
  width: string
  height: string
  squarefeet: number
  stories: number
  slug: string
  thumbnailUrl: string
  thumbnailAlt: string
  price: string
}

export interface SearchResponseData {
  results: HousePlanSearchResponseData[]
}

export interface HousePlanResponseData {
  '@context': string
  '@type': 'Product'
  brand: {
    '@type': 'Brand'
    name: string
  }
  description: string
  image: string
  name: string
  productID: string
  sku: string
  slug: string
  offers: {
    '@type': 'Offer'
    url: string
    price: string
    priceCurrency: string
    itemCondition: string
    availability: string
  }
}

const HOUSE_PLANS_API = 'https://www.houseplans.com/search/search.json'

const getSelectedFeatureNames = <Feature extends string>(
  featureNames: readonly Feature[],
  params: SearchParams,
): Feature[] => {
  const validFeatures = new Set<string>(featureNames)
  const selectedFeatures = Object.entries(params)
    // filter down to the features that are explicitly `true`
    .filter(
      (param): param is [Feature, true] =>
        validFeatures.has(param[0]) && Boolean(param[1]),
    )

    // we only need the feature names
    .map(([filter]) => filter)

  return selectedFeatures
}

const addFeatureFormData = <Feature extends string>(
  formData: FormData,
  paramName: SearchFeaturePostName,
  features: Feature[],
) => {
  features.forEach((feature) => {
    formData.append(`${paramName}[]`, feature)
  })
}

/**
 * Add all the search params that aren't folded into the `FEATURE_POST_NAMES` as
 * top-level params
 */
const addFormData = (formData: FormData, searchParams: SearchParams) => {
  const allFeatureNames = new Set<string>([
    ...ARCHITECTURE_STYLES,
    ...BEDROOM_BATHROOM_FEATURES,
    ...KITCHEN_FEATURES,
    ...OUTDOOR_FEATURES,
    ...OTHER_FEATURES,
  ])

  Object.entries(searchParams).forEach(([paramName, paramValue]) => {
    if (!allFeatureNames.has(paramName) && paramValue !== undefined) {
      formData.append(paramName, paramValue.toString())
    }
  })
}

/**
 * Given the search params, build a `FormData` object to send to the House Plans API
 * @returns
 */
export const getSearchFormData = (params: SearchParams): FormData => {
  const architectureStyles = getSelectedFeatureNames<ArchitectureStyle>(
    ARCHITECTURE_STYLES,
    params,
  )
  const bedroomBathroomFeatures =
    getSelectedFeatureNames<BedroomBathroomFeature>(
      BEDROOM_BATHROOM_FEATURES,
      params,
    )
  const kitchenFeatures = getSelectedFeatureNames<KitchenFeature>(
    KITCHEN_FEATURES,
    params,
  )
  const outdoorFeatures = getSelectedFeatureNames<OutdoorFeature>(
    OUTDOOR_FEATURES,
    params,
  )
  const otherFeatures = getSelectedFeatureNames<OtherFeature>(
    OTHER_FEATURES,
    params,
  )
  const searchFormData = new FormData()

  addFormData(searchFormData, params)

  addFeatureFormData(searchFormData, 'sy', architectureStyles)
  addFeatureFormData(searchFormData, 'bf', bedroomBathroomFeatures)
  addFeatureFormData(searchFormData, 'kf', kitchenFeatures)
  addFeatureFormData(searchFormData, 'os', outdoorFeatures)
  addFeatureFormData(searchFormData, 'mf', otherFeatures)

  searchFormData.append('p', '1')
  searchFormData.append('s', 'MOST_POPULAR')

  return searchFormData
}

export default class HousePlans {
  _debug: boolean = false

  constructor(options?: SdkOptions) {
    this._debug = Boolean(options?.debug)
  }

  /**
   * Search for floor plans based on the search parameters
   * @param params The search parameters to filter the floor plans by
   */
  async plans(params: SearchParams): Promise<SearchResponseData> {
    const { collection, ...searchParams } = params
    const postData = getSearchFormData(searchParams)

    if (this._debug) {
      console.log('House Plans request post data:', [...postData.entries()])
    }

    try {
      const searchType = collection ? `collection/${collection}` : 'search'
      const { data } = await axios.post<SearchResponseData>(
        `https://www.houseplans.com/${searchType}/search.json`,
        postData,
      )

      if (this._debug) {
        console.log('House Plans search results:', data)
      }

      return data
    } catch (error) {
      console.error('Error searching for house plans:', error, params)

      return { results: [] }
    }
  }

  /**
   * Retrieve a single house plan by its slug
   * @param planNumber The number of the house plan to retrieve
   */
  async plan(planNumber: string): Promise<HousePlanResponseData> {
    const url = `https://www.houseplans.com/search?hwpn=${planNumber}`

    if (this._debug) {
      console.log('House Plans single plan request URL:', url)
    }

    try {
      const { data: html } = await axios.get<string>(url)
      const root = parse(html)

      // Find the <script> tag with type="application/ld+json"
      const jsonLdScript = root.querySelector(
        'head script[type="application/ld+json"]',
      )?.textContent

      if (!jsonLdScript) {
        throw new Error('No JSON-LD data found on the page.')
      }

      const housePlanData: HousePlanResponseData = JSON.parse(jsonLdScript)

      if (this._debug) {
        console.log('House Plans single plan data:', housePlanData)
      }

      return housePlanData
    } catch (error) {
      console.error('Error fetching plan details:', error, url)

      throw error
    }
  }
}
