import { parseRecommendations } from './items'

describe('parseRecommendations', () => {
  describe('content', () => {
    it('returns parsed recommended items (single group)', () => {
      const assistantMessage = JSON.stringify({
        opening:
          'Here are some regular size white sports shorts that you might like:',
        recommendations: [
          {
            ids: [
              'st2111174095230420',
              'st2204115757248053',
              'st2210085200206136',
            ],
            summary: 'White sports shorts',
          },
        ],
        nexSteps:
          "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
        filter: '{}',
      })

      const expected = [
        'Here are some regular size white sports shorts that you might like:',
        ['st2111174095230420', 'st2204115757248053', 'st2210085200206136'],
        'White sports shorts',
        "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
      ]
      expect(parseRecommendations(assistantMessage).parsedContent).toEqual(
        expected,
      )
    })

    it('returns parsed recommended items (multiple groups)', () => {
      const assistantMessage = JSON.stringify({
        opening:
          "Here are the top options I'd recommend for a black top and black jeans:",
        recommendations: [
          {
            ids: [
              'sy2380491',
              'sie3192612',
              'sss3157764637',
              'sw2897782',
              'st2712964',
            ],
            summary: 'Top Options',
          },
          {
            ids: [
              'sp3110035',
              'sml3043372',
              'sr3021642',
              'sp2095815',
              'sj7244773481',
            ],
            summary: 'Jeans Options',
          },
        ],
        nexSteps:
          'You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options.',
        filter: '{}',
      })
      const expected = [
        "Here are the top options I'd recommend for a black top and black jeans:",
        ['sy2380491', 'sie3192612', 'sss3157764637', 'sw2897782', 'st2712964'],
        'Top Options',
        ['sp3110035', 'sml3043372', 'sr3021642', 'sp2095815', 'sj7244773481'],
        'Jeans Options',
        'You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options.',
      ]

      expect(parseRecommendations(assistantMessage).parsedContent).toEqual(
        expected,
      )
    })

    it('returns just the opening and next steps if there are no recommendations', () => {
      const assistantMessage = JSON.stringify({
        opening: "I couldn't find any matching items.",
        recommendations: [],
        nexSteps:
          "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
        filter: '{}',
      })

      const expected = [
        "I couldn't find any matching items.",
        "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
      ]
      expect(parseRecommendations(assistantMessage).parsedContent).toEqual(
        expected,
      )
    })
    it('returns just the opening and next steps if recommendations is null', () => {
      const assistantMessage = JSON.stringify({
        opening: "I couldn't find any matching items.",
        recommendations: null,
        nexSteps:
          "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
        filter: '{}',
      })

      const expected = [
        "I couldn't find any matching items.",
        "If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
      ]
      expect(parseRecommendations(assistantMessage).parsedContent).toEqual(
        expected,
      )
    })
    it('returns plain text message, if JSON.parse errors', () => {
      const assistantMessage = `Here are some regular size white sports shorts that you might like:

- sw2111174095230420: Absorbs Sweat Breathable Sports Shorts
- sw2204115757248053: Plus Lightweight Dalmatian Print Sports Shorts
- sw2210085200206136: Men Colorblock 2 In 1 Sports Shorts

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

      const expected = [
        "Here are some regular size white sports shorts that you might like:\n\n- sw2111174095230420: Absorbs Sweat Breathable Sports Shorts\n- sw2204115757248053: Plus Lightweight Dalmatian Print Sports Shorts\n- sw2210085200206136: Men Colorblock 2 In 1 Sports Shorts\n\nThese options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
      ]
      expect(parseRecommendations(assistantMessage).parsedContent).toEqual(
        expected,
      )
    })
  })

  describe('filter', () => {
    it('returns parsed filter when filter is present', () => {
      const assistantMessage = JSON.stringify({
        opening: "Here's a selection of books:",
        recommendations: [
          {
            ids: ['8MXK_KrHOZYC', 'BTM7iwk64VgC'],
            summary: 'Books by Jeff Kinney',
          },
          {
            ids: ['IKLDwAAQBAJ', 'oEiHEAAAQBAJ'],
            summary: 'Books by James Patterson',
          },
        ],
        nexSteps: 'Want to see more from a specific author?',
        filter: JSON.stringify({
          genre: 'Juvenile Fiction',
          author: ['Jeff Kinney', 'James Patterson'],
        }),
      })

      const expectedFilter = {
        genre: 'Juvenile Fiction',
        author: ['Jeff Kinney', 'James Patterson'],
      }
      const result = parseRecommendations(assistantMessage)
      expect(result.filter).toEqual(expectedFilter)
    })

    it('returns undefined when filter is undefined', () => {
      const assistantMessage = JSON.stringify({
        opening: "Here's a selection of books:",
        recommendations: [
          {
            ids: ['8MXK_KrHOZYC', 'BTM7iwk64VgC'],
            summary: 'Books by Jeff Kinney',
          },
          {
            ids: ['IKLDwAAQBAJ', 'oEiHEAAAQBAJ'],
            summary: 'Books by James Patterson',
          },
        ],
        nexSteps: 'Want to see more from a specific author?',
        filter: '{}',
      })

      const result = parseRecommendations(assistantMessage)
      expect(result.filter).toBeUndefined()
    })

    it('returns undefined when filter is an empty object', () => {
      const assistantMessage = JSON.stringify({
        opening: "Here's a selection of books:",
        recommendations: [
          {
            ids: ['8MXK_KrHOZYC', 'BTM7iwk64VgC'],
            summary: 'Books by Jeff Kinney',
          },
          {
            ids: ['IKLDwAAQBAJ', 'oEiHEAAAQBAJ'],
            summary: 'Books by James Patterson',
          },
        ],
        nexSteps: 'Want to see more from a specific author?',
        filter: JSON.stringify({}),
      })

      const result = parseRecommendations(assistantMessage)
      expect(result.filter).toBeUndefined()
    })

    it('returns undefined when filter is invalid JSON', () => {
      const assistantMessage = JSON.stringify({
        opening: "Here's a selection of books:",
        recommendations: [
          {
            ids: ['8MXK_KrHOZYC', 'BTM7iwk64VgC'],
            summary: 'Books by Jeff Kinney',
          },
          {
            ids: ['IKLDwAAQBAJ', 'oEiHEAAAQBAJ'],
            summary: 'Books by James Patterson',
          },
        ],
        nexSteps: 'Want to see more from a specific author?',
        filter: '{genre: "Juvenile Fiction"}', // Invalid JSON (missing quotes around keys)
      })

      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {}) // Suppress console.error
      const result = parseRecommendations(assistantMessage)
      expect(result.filter).toBeUndefined()
      expect(consoleErrorSpy).toHaveBeenCalled() // Check if console.error was called
      consoleErrorSpy.mockRestore() // Restore console.error
    })
  })
})
