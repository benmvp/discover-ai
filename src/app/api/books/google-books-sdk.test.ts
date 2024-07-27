import { buildSearchUrl } from './google-books-sdk'

describe('buildSearchUrl', () => {
  const apiKey = 'YOUR_FAKE_API_KEY'

  // Helper function to get query params as an object
  function getQueryParamsObject(url: string): Record<string, string> {
    const urlObj = new URL(url)
    return Object.fromEntries(urlObj.searchParams.entries())
  }

  it('should build a basic search URL with a term query', () => {
    const actualUrl = buildSearchUrl(apiKey, { query: { term: 'javascript' } })
    expect(getQueryParamsObject(actualUrl)).toEqual({
      q: 'javascript',
      key: apiKey,
    })
  })

  it('should handle special keywords in the query', () => {
    const actualUrl = buildSearchUrl(apiKey, {
      query: {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Computers',
      },
    })
    expect(getQueryParamsObject(actualUrl)).toEqual({
      q: 'intitle:Clean+Code+inauthor:Robert+C.+Martin+subject:Computers',
      key: apiKey,
    })
  })

  it('should handle multiple terms and special keywords', () => {
    const actualUrl = buildSearchUrl(apiKey, {
      query: { term: 'web development', author: 'John Doe' },
    })
    expect(getQueryParamsObject(actualUrl)).toEqual({
      q: 'web+development+inauthor:John+Doe',
      key: apiKey,
    })
  })

  it('should include other search parameters (download, filter, etc.)', () => {
    const actualUrl = buildSearchUrl(apiKey, {
      download: 'epub',
      filter: 'free-ebooks',
      langRestrict: 'en',
      printType: 'books',
      query: { term: 'programming' },
    })
    expect(getQueryParamsObject(actualUrl)).toEqual({
      q: 'programming',
      download: 'epub',
      filter: 'free-ebooks',
      langRestrict: 'en',
      printType: 'books',
      key: apiKey,
    })
  })

  it('should throw an error if no search terms are provided', () => {
    expect(() => buildSearchUrl(apiKey, { query: {} })).toThrow(
      'At least one search term is required',
    )
  })

  it('should properly encode spaces and special characters', () => {
    const actualUrl = buildSearchUrl(apiKey, {
      query: { term: 'C# programming & .NET' },
    })
    expect(getQueryParamsObject(actualUrl)).toEqual({
      q: 'C%23+programming+%26+.NET',
      key: apiKey,
    })
  })

  describe('query.term parameter variations', () => {
    it('should handle multiple terms separated by +', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: 'science fiction fantasy' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'science+fiction+fantasy',
        key: apiKey,
      })
    })

    it('should handle exact phrases in quotes', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: '"artificial intelligence"' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: '%22artificial+intelligence%22',
        key: apiKey,
      })
    })

    it('should handle excluded terms with -', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: 'programming -javascript' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'programming+-javascript',
        key: apiKey,
      })
    })

    it('should handle a combination of multiple terms, phrases, and excluded terms', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: '"machine learning" python -tensorflow' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: '%22machine+learning%22+python+-tensorflow',
        key: apiKey,
      })
    })

    it('should handle empty or undefined search terms', () => {
      expect(() => buildSearchUrl(apiKey, { query: { term: '' } })).toThrow(
        'At least one search term is required',
      )
      expect(() =>
        buildSearchUrl(apiKey, { query: { term: undefined } }),
      ).toThrow('At least one search term is required')
      expect(() => buildSearchUrl(apiKey, { query: {} })).toThrow(
        'At least one search term is required',
      )
    })

    it('should handle special characters in special keywords', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { author: 'J.K. Rowling' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'inauthor:J.K.+Rowling',
        key: apiKey,
      })
    })

    it('should handle unusual characters in search terms', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: 'The Hitchhiker"s Guide to the Galaxy' },
      })
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'The+Hitchhiker%22s+Guide+to+the+Galaxy',
        key: apiKey,
      })
    })
  })

  describe('responseFields parameter', () => {
    it('should include the "fields" parameter when responseFields are provided', () => {
      const actualUrl = buildSearchUrl(
        apiKey,
        { query: { term: 'javascript' } },
        {
          id: '',
          volumeInfo: { title: '' },
        },
      )
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'javascript',
        key: apiKey,

        fields: 'items(id,volumeInfo(title))',
      })
    })

    it('should handle nested field selection', () => {
      const actualUrl = buildSearchUrl(
        apiKey,
        { query: { term: 'javascript' } },
        {
          volumeInfo: {
            title: '',
            authors: [],
            imageLinks: { thumbnail: '' },
          },
        },
      )
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'javascript',
        key: apiKey,

        fields: 'items(volumeInfo(title,authors,imageLinks(thumbnail)))',
      })
    })

    it('should not include the "fields" parameter when responseFields is undefined', () => {
      const actualUrl = buildSearchUrl(apiKey, {
        query: { term: 'javascript' },
      })

      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'javascript',
        key: apiKey,
      })
    })

    it('should handle partial field selection', () => {
      const actualUrl = buildSearchUrl(
        apiKey,
        { query: { term: 'javascript' } },
        {
          id: '',
        },
      )
      expect(getQueryParamsObject(actualUrl)).toEqual({
        q: 'javascript',
        key: apiKey,

        fields: 'items(id)',
      })
    })
  })
})
