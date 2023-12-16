import { getMatchingSkus } from './products'

describe('getMatchingSkus', () => {
  it('returns matches for color', async () => {
    const matchingSkus = await getMatchingSkus({
      color: 'blue',
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })

  it('returns matches for dresses', async () => {
    const matchingSkus = await getMatchingSkus({
      type: 'dress',
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })

  it('returns matches for cheap pants', async () => {
    const matchingSkus = await getMatchingSkus({
      budget: 15,
      type: 'pants',
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })

  it('returns matches for black, casual & short-sleeved shirt', async () => {
    const matchingSkus = await getMatchingSkus({
      // sizes: 'S',
      color: 'black',
      style: 'casual',
      type: 'shirt',
      length: 'short sleeve',
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })

  it('returns matches for black elegant yet inexpensive dresses', async () => {
    const matchingSkus = await getMatchingSkus({
      color: 'black',
      style: 'elegant',
      type: 'dress',
      budget: 30,
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })

  it('returns matches for dark, high-waist jeans', async () => {
    const matchingSkus = await getMatchingSkus({
      color: 'dark',
      style: 'high waist',
      type: 'pants',
    })

    expect(matchingSkus.skus.length).toBeGreaterThan(0)
  })
})
