import { FunctionDeclarationSchemaType } from '@google/generative-ai'
import type { FunctionDeclaration } from '@/app/types'
import { searchBooks } from './books'
import { SEARCH_FUNCTION_NAME } from './constants'
import { delimitSearchResults } from '../items'

const SEARCH_FUNCTION = delimitSearchResults(searchBooks)
const SEARCH_FUNCTION_DECLARATION: FunctionDeclaration = {
  name: SEARCH_FUNCTION_NAME,
  description:
    'Searches Google Books catalog to find books that match the specified attributes',
  function: SEARCH_FUNCTION,
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    description: 'The parameters to filter the books catalog by',
    properties: {
      author: {
        description: 'The author of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['Charles Dickens', 'Tolkien', 'Dav Pilkey', 'Rick Warren'],
      },
      download: {
        description:
          'The type of download available for the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        enum: ['epub'],
      },
      filter: {
        description:
          'The type of filter to apply to the book they are looking for. Partial is where at least parts of the text are previewable while full is where the entire text is viewable',
        type: FunctionDeclarationSchemaType.STRING,
        enum: ['ebooks', 'free-ebooks', 'full', 'paid-ebooks', 'partial'],
      },
      genre: {
        description:
          'The genre of the book they are looking for (the BISAC Subject Heading)',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'Biography & Autobiography',
          'Comics & Graphic Novels',
          'Drama',
          'Fiction',
          'Juvenile Fiction',
          'Juvenile Nonfiction',
          'Literary Collections',
          'Literary Criticism',
          'Performing Arts',
          'Poetry',
          'Self-Help',
        ],
      },
      isbn: {
        description:
          'The ISBN of the book they are looking for (10 or 13 digits)',
        type: FunctionDeclarationSchemaType.STRING,
      },
      langRestrict: {
        description:
          'The language of the book they are looking for (two-letter ISO-639-1 format)',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['en', 'fr', 'es'],
      },
      lccn: {
        description:
          'The Library of Congress Control Number of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
      },
      oclc: {
        description:
          'The Online Computer Library Center number of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
      },
      printType: {
        description:
          'The print or publication type of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        enum: ['books', 'magazines'],
      },
      publisher: {
        description: 'The publisher of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: ['Penguin Random House', 'Scholastic', 'Simon & Schuster'],
      },
      term: {
        description:
          'Free text search of the contents of the book that they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'it was the best of times',
          'the nation of Panem',
          'Montague and Capulet',
          'May the odds be ever in your favor',
        ],
      },
      title: {
        description:
          'The (partial of the) title of the book they are looking for',
        type: FunctionDeclarationSchemaType.STRING,
        example: [
          'A Christmas Carol',
          'Hobbit',
          'Underpants',
          'Purpose Driven Life',
        ],
      },
    },
  },
}

export const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  SEARCH_FUNCTION_DECLARATION,
]
