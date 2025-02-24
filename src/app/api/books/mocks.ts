import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  { content: "Looking for books like 'The Princess in Black'.", type: 'user' },
  {
    content: 'Here are similar authors: Dav Pilkey, Mo Willems, Jeff Kinney...',
    type: 'assistant',
  },
  { content: 'Middle-grade, not Kinney.  No fantasy.', type: 'user' },
  {
    content:
      'Here are middle-grade, non-fantasy authors: James Patterson, Barbara Park, Raina Telgemeier...',
    type: 'assistant',
  },
  { content: 'Show books by those authors.', type: 'user' },
  {
    calls: [
      {
        id: 'call_jeff',
        name: 'searchBooks',
        arguments: { author: 'Jeff Kinney', genre: 'Juvenile Fiction' },
      },
      {
        id: 'call_james',
        name: 'searchBooks',
        arguments: { author: 'James Patterson', genre: 'Juvenile Fiction' },
      },
      {
        id: 'call_barbara',
        name: 'searchBooks',
        arguments: { author: 'Barbara Park', genre: 'Juvenile Fiction' },
      },
      {
        id: 'call_raina',
        name: 'searchBooks',
        arguments: { author: 'Raina Telgemeier', genre: 'Juvenile Fiction' },
      },
    ],
    content: null,
    type: 'functionCall',
  },
  {
    name: '',
    content: {
      items: [
        // Jeff Kinney (Summarized, keeping original IDs, NO DELIMITERS)
        {
          authors: ['Jeff Kinney'],
          id: '8MXK_KrHOZYC',
          title: 'Diary of a Wimpy Kid (Diary of a Wimpy Kid #1)',
          description: "Greg Heffley's middle school diary.",
        },
        {
          authors: ['Jeff Kinney'],
          id: 'BTM7iwk64VgC',
          title: 'The Ugly Truth (Diary of a Wimpy Kid #5)',
          description: 'Greg deals with growing up.',
        },

        // James Patterson (Summarized, NO DELIMITERS)
        {
          authors: ['James Patterson'],
          id: 'IKLDwAAQBAJ',
          title: 'Ali Cross',
          description: "Alex Cross's son solves mysteries.",
        },
        {
          authors: ['James Patterson', 'Keir Graff'],
          id: 'oEiHEAAAQBAJ',
          title: "Minerva Keen's Detective Club",
          description: 'Kids solve a poisoning mystery.',
        },

        // Barbara Park (Summarized, NO DELIMITERS)
        {
          authors: ['Barbara Park'],
          id: 'tzdCDUgReIkC',
          title: 'My Mother Got Married and Other Disasters',
          description: "Charlie deals with his parents' divorce.",
        },
        {
          authors: ['Barbara Park'],
          id: '6ZiODQAAQBAJ',
          title: 'Junie B. Jones #18: First Grader (at last!)',
          description: 'Junie B. starts first grade.',
        },

        // Raina Telgemeier (Summarized, NO DELIMITERS)
        {
          authors: ['Raina Telgemeier'],
          id: '1w4fAwAAQBAJ',
          title: 'Drama: A Graphic Novel',
          description: 'Middle school theater drama.',
        },
        {
          authors: ['Raina Telgemeier'],
          id: 'MZlDmwEACAAJ',
          title: 'Sisters',
          description: "Raina's relationship with her sister.",
        },
      ],
    },
    id: 'call_jeff',
    type: 'functionResponse',
  },
  {
    content: JSON.stringify({
      opening: "Here's a selection of books:",
      recommendations: [
        {
          ids: ['8MXK_KrHOZYC', 'BTM7iwk64VgC'],
          summary: 'Books by Jeff Kinney',
        }, // Clean IDs
        {
          ids: ['IKLDwAAQBAJ', 'oEiHEAAAQBAJ'],
          summary: 'Books by James Patterson',
        },
        {
          ids: ['tzdCDUgReIkC', '6ZiODQAAQBAJ'],
          summary: 'Books by Barbara Park',
        },
        {
          ids: ['1w4fAwAAQBAJ', 'MZlDmwEACAAJ'],
          summary: 'Books by Raina Telgemeier',
        },
      ],
      nexSteps: 'Want to see more from a specific author?',
      filter: JSON.stringify({
        genre: 'Juvenile Fiction',
        author: [
          'Jeff Kinney',
          'James Patterson',
          'Barbara Park',
          'Raina Telgemeier',
        ],
      }),
    }),
    type: 'assistant',
  },
]
