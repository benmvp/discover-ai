import GoogleBooks, {
  VolumeSearchParamQuery,
  VolumeSearchParams,
} from '../sdks/google-books'
import {
  FilterParameters,
  Item,
  ItemId,
  MatchedItem,
  SearchFunction,
} from '@/app/items/types'

/**
 * Global cache of products returned from the Best Buy search API
 */
const VOLUMES = new Map<ItemId, Item>()

interface BooksFilterParams
  extends FilterParameters,
    Omit<VolumeSearchParams, 'query'>,
    VolumeSearchParamQuery {}

const VOLUMES_RESPONSE_FIELDS = {
  id: '',
  saleInfo: {
    listPrice: {
      amount: 0,
    },
  },
  volumeInfo: {
    authors: [] as string[],
    description: '',
    publisher: '',
    title: '',
  },
} as const
const VOLUME_RESPONSE_FIELDS = {
  id: '',
  saleInfo: {
    listPrice: {
      amount: 0,
    },
  },
  volumeInfo: {
    canonicalVolumeLink: '',
    imageLinks: {
      thumbnail: '',
    },
    title: '',
  },
} as const

type VolumesResponseFields = typeof VOLUMES_RESPONSE_FIELDS
type VolumeResponseFields = typeof VOLUME_RESPONSE_FIELDS

interface VolumeMatchedItem extends MatchedItem {
  authors: VolumesResponseFields['volumeInfo']['authors']
  publisher: VolumesResponseFields['volumeInfo']['publisher']
}

const GOOGLE_BOOKS_CLIENT = new GoogleBooks({
  apiKey: process.env.GOOGLE_BOOKS_API_KEY ?? '',
  // debug: true,
})

/**
 * Returns the top books that match the filter parameters
 * @param filterParams Parameters to filter the books by
 * @returns the matched books
 */
export const searchBooks: SearchFunction<BooksFilterParams> = async (
  filterParams,
) => {
  console.log('Searching for Google Books:', filterParams)

  const {
    author,
    genre,
    isbn,
    lccn,
    oclc,
    publisher,
    term,
    title,
    ...baseParams
  } = filterParams
  const searchParamQuery: VolumeSearchParamQuery = {
    author,
    genre,
    isbn,
    lccn,
    oclc,
    publisher,
    term,
    title,
  }
  const searchParams: VolumeSearchParams = {
    ...baseParams,
    query: searchParamQuery,
  }

  let volumes: VolumesResponseFields[] = []

  try {
    volumes = (
      await GOOGLE_BOOKS_CLIENT.volumes(searchParams, VOLUMES_RESPONSE_FIELDS)
    ).items
  } catch (error) {
    console.error('Error searching for volumes:', error, filterParams)
  }

  const items = volumes.map(
    (volume): VolumeMatchedItem => ({
      authors: volume.volumeInfo.authors,
      description: volume.volumeInfo.description,
      id: volume.id,
      price: volume.saleInfo?.listPrice?.amount,
      publisher: volume.volumeInfo.publisher,
      title: volume.volumeInfo.title,
    }),
  )

  return {
    items,
  }
}

/**
 * Get the books for the given item IDs
 */
export const getBooks = async (itemIds: string[]): Promise<Item[]> => {
  if (itemIds.length === 0) {
    return []
  }

  const missingItemIds = itemIds.filter((itemId) => !VOLUMES.has(itemId))

  try {
    // If there are any missing volumes, grab them
    if (missingItemIds.length > 0) {
      const getters = missingItemIds.map(
        (itemId): Promise<VolumeResponseFields> =>
          GOOGLE_BOOKS_CLIENT.volume(itemId, VOLUME_RESPONSE_FIELDS),
      )
      const allSettledResults = await Promise.allSettled(getters)

      // Add the settled volumes to the cache
      allSettledResults.forEach((settledResult) => {
        if (settledResult.status !== 'fulfilled') {
          return
        }

        const volume = settledResult.value
        const volumeId = volume.id

        VOLUMES.set(volumeId, {
          id: volumeId,
          imageUrl: volume.volumeInfo.imageLinks?.thumbnail,
          price: volume.saleInfo?.listPrice?.amount,
          title: volume.volumeInfo.title,
          url: volume.volumeInfo.canonicalVolumeLink,
        })
      })
    }
  } catch (error) {
    console.error('Error getting books:', error, itemIds)
  }

  return itemIds
    .map((itemId) => VOLUMES.get(itemId))
    .filter((item): item is Item => Boolean(item))
}
