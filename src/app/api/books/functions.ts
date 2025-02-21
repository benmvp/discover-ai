import type { FunctionDeclaration } from '@/app/types'
import { searchBooks } from './books'
import { SEARCH_FUNCTION_NAME } from './constants'

const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches Google Books catalog to find books that match the specified attributes',
  function: searchBooks,
  parameters: {
    type: 'object',
    description: 'The parameters to filter the books catalog by',
    properties: {
      author: {
        description:
          'The author of the book they are looking for (e.g., Charles Dickens, Tolkien, Dav Pilkey, Rick Warren)',
        type: 'string',
      },
      download: {
        description:
          'The type of download available for the book they are looking for',
        type: 'string',
        enum: ['epub'],
      },
      filter: {
        description:
          'The type of filter to apply to the book they are looking for. Partial is where at least parts of the text are previewable while full is where the entire text is viewable',
        type: 'string',
        enum: ['ebooks', 'free-ebooks', 'full', 'paid-ebooks', 'partial'],
      },
      genre: {
        description:
          'The genre of the book they are looking for (the BISAC Subject Heading) (e.g., Biography & Autobiography, Comics & Graphic Novels, Drama, Fiction, Juvenile Fiction, Juvenile Nonfiction, Literary Collections, Literary Criticism, Performing Arts, Poetry, Self-Help)',
        type: 'string',
      },
      isbn: {
        description:
          'The ISBN of the book they are looking for (10 or 13 digits)',
        type: 'string',
      },
      langRestrict: {
        description:
          'The language of the book they are looking for (two-letter ISO-639-1 format) (e.g., en, fr, es)',
        type: 'string',
      },
      lccn: {
        description:
          'The Library of Congress Control Number of the book they are looking for',
        type: 'string',
      },
      oclc: {
        description:
          'The Online Computer Library Center number of the book they are looking for',
        type: 'string',
      },
      printType: {
        description:
          'The print or publication type of the book they are looking for',
        type: 'string',
        enum: ['books', 'magazines'],
      },
      publisher: {
        description:
          'The publisher of the book they are looking for (e.g., Penguin Random House, Scholastic, Simon & Schuster)',
        type: 'string',
      },
      term: {
        description:
          'Free text search of the contents of the book that they are looking for (e.g., it was the best of times, the nation of Panem, Montague and Capulet, May the odds be ever in your favor)',
        type: 'string',
      },
      title: {
        description:
          'The (partial of the) title of the book they are looking for (e.g., A Christmas Carol, Hobbit, Underpants, Purpose Driven Life)',
        type: 'string',
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
