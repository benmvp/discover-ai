import axios from 'axios'

export interface SdkOptions {
  /**
   * The API key to use for the Google Books API
   */
  apiKey: string

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}

export interface VolumeSearchParamQuery {
  /**
   * Keywords are found in the author
   */
  author?: string

  /**
   * Keywords are found in the genre (the BISAC Subject Heading)
   * See: https://www.bisg.org/complete-bisac-subject-headings-list
   */
  genre?: string

  /**
   * Keyword is the ISBN number of the volume (10 or 13 digits).
   */
  isbn?: string

  /**
   * Keyword is the Library of Congress Control Number of the volume.
   */
  lccn?: string

  /**
   * Keyword is the Online Computer Library Center number of the volume.
   */
  oclc?: string

  /**
   * Keyword is found in the publisher
   */
  publisher?: string

  /**
   * Generic search query
   */
  term?: string

  /**
   * Keywords are found in the title
   */
  title?: string
}

export interface VolumeSearchParams {
  /**
   * 	Restrict to volumes by download availability.
   */
  download?: 'epub'
  /**
   * Restrict information returned to a set of selected book types.
   * See: https://developers.google.com/books/docs/v1/using#filtering
   */
  filter?: 'ebooks' | 'free-ebooks' | 'full' | 'paid-ebooks' | 'partial'

  /**
   * Restricts the volumes returned to those that are tagged with the specified language.
   * (two-letter ISO-639-1 format, e.g. 'fr' or 'en')
   */
  langRestrict?: string

  /**
   * Restrict the returned results to a specific print or publication type
   */
  printType?: 'all' | 'books' | 'magazines'

  /**
   * Search for volumes that contain this text string.
   */
  query: VolumeSearchParamQuery
}

interface VolumesResponseData<Data> {
  items: Data[]
}

type VolumeResponseData<Data> = Data

export type ResponseFields =
  | string
  | number
  | string[]
  | { [key: string]: ResponseFields }

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'
const SPECIAL_KEYWORDS_NAME_MAP: Record<
  keyof Omit<VolumeSearchParamQuery, 'term'>,
  string
> = {
  author: 'inauthor',
  genre: 'subject',
  isbn: 'isbn',
  lccn: 'lccn',
  oclc: 'oclc',
  publisher: 'inpublisher',
  title: 'intitle',
}

const flattenResponseFields = (responseFields: ResponseFields): string => {
  const entries = Object.entries(responseFields)

  const fieldStrings = entries.map(([fieldName, value]) => {
    return !value || Array.isArray(value)
      ? fieldName
      : `${fieldName}(${flattenResponseFields(value)})`
  })

  return fieldStrings.join(',')
}

const encodeWord = (word?: string) =>
  encodeURIComponent(word || '').replaceAll('%20', '+')

const buildSearchQuery = (query: VolumeSearchParamQuery) => {
  const { term, ...specialKeywords } = query

  const fields = [
    encodeWord(term),

    // special keywords for additional search term filtering
    ...Object.entries(specialKeywords).map(([key, value]) => {
      const keywordName =
        SPECIAL_KEYWORDS_NAME_MAP[key as keyof typeof SPECIAL_KEYWORDS_NAME_MAP]

      return value ? `${keywordName}:${encodeWord(value)}` : ''
    }),
  ].filter((field): field is string => Boolean(field))

  if (!fields.length) {
    throw new Error('At least one search term is required')
  }

  return fields.join('+')
}

export const buildSearchUrl = (
  apiKey: string,
  params: VolumeSearchParams,
  responseFields?: ResponseFields,
) => {
  const { download, filter, langRestrict, printType, query } = params
  const searchQuery = buildSearchQuery(query)
  const url = axios.getUri({
    url: GOOGLE_BOOKS_API,
    params: {
      download,
      fields: responseFields
        ? flattenResponseFields({ items: responseFields })
        : undefined,
      filter,
      key: apiKey,
      langRestrict,
      printType,
      q: searchQuery,
    },
  })

  return url
}

/**
 * The Google Books API SDK
 * See: https://developers.google.com/books/docs/v1/using
 */
export default class GoogleBooks {
  _apiKey: string
  _debug: boolean = false

  constructor(options?: SdkOptions | string) {
    const sdkOptions =
      typeof options === 'string' ? { apiKey: options } : options
    const apiKey = sdkOptions?.apiKey

    if (!apiKey) {
      throw new Error('An API key is required to use the Google Books API')
    }

    this._apiKey = apiKey
    this._debug = Boolean(sdkOptions?.debug)
  }

  /**
   * Search the Google Books volumes catalog
   * @param params The search parameters to filter the volumes by
   * @param responseFields The fields to include in the response
   */
  async volumes<Data extends ResponseFields>(
    params: VolumeSearchParams,
    responseFields: Data,
  ): Promise<{ items: Data[] }> {
    const url = buildSearchUrl(this._apiKey, params, responseFields)

    if (this._debug) {
      console.log('Google Books Volumes API request URL:', url)
    }

    try {
      const { data } = await axios.get<VolumesResponseData<Data>>(url)

      if (this._debug) {
        console.log('Google Books Volumes API response:', data)
      }

      return data
    } catch (error) {
      console.error('Error searching for volumes:', error, params)

      return { items: [] }
    }
  }

  /**
   * Retrieve a specific volume by its ID
   * @param id The ID of the volume to retrieve
   * @param responseFields The fields to include in the response
   */
  async volume<Data extends ResponseFields>(id: string, responseFields: Data) {
    const url = axios.getUri({
      url: `${GOOGLE_BOOKS_API}/${id}`,
      params: {
        fields: flattenResponseFields(responseFields),
        key: this._apiKey,
      },
    })

    if (this._debug) {
      console.log('Google Books Volume API request URL:', url)
    }

    const { data } = await axios.get<VolumeResponseData<Data>>(url)

    if (this._debug) {
      console.log('Google Books Volume API response:', data)
    }

    return data
  }
}
