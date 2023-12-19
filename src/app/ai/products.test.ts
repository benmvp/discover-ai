import { getMatchedProducts, parseRecommendedSkuIds } from './products'

describe('getMatchedProducts', () => {
  it('returns matches for color', async () => {
    const matchedProducts = await getMatchedProducts({
      color: 'blue',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for dresses', async () => {
    const matchedProducts = await getMatchedProducts({
      type: 'dress',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for cheap pants', async () => {
    const matchedProducts = await getMatchedProducts({
      budget: 15,
      type: 'pants',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for black, casual & short-sleeved shirt', async () => {
    const matchedProducts = await getMatchedProducts({
      color: 'black',
      style: 'casual',
      type: 'shirt',
      length: 'short sleeve',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for black elegant yet inexpensive dresses', async () => {
    const matchedProducts = await getMatchedProducts({
      color: 'black',
      style: 'elegant',
      type: 'dress',
      budget: 30,
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for dark, high-waist jeans', async () => {
    const matchedProducts = await getMatchedProducts({
      color: 'dark',
      style: 'high waist',
      type: 'pants',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })
})

describe('parseRecommendedSkus', () => {
  it('returns parsed recommended SKUs', () => {
    const assistantMessage = `Here are some regular size white sports shorts that you might like:

- st2111174095230420: Absorbs Sweat Breathable Sports Shorts
- st2204115757248053: Plus Lightweight Dalmatian Print Sports Shorts
- st2210085200206136: Men Colorblock 2 In 1 Sports Shorts

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: [
        'st2111174095230420',
        'st2204115757248053',
        'st2210085200206136',
      ],
      tokenizedMessage: `Here are some regular size white sports shorts that you might like:

[PRODUCTS_LIST_HERE]

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`,
    })
  })

  it('returns recommended SKUs if there is only one', () => {
    const assistantMessage = `I found a stunning black mermaid style maxi dress for you:

- sw2209228195095791: SHEIN Unity Square Neck Mermaid Hem Bodycon Dress

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: ['sw2209228195095791'],
      tokenizedMessage: `I found a stunning black mermaid style maxi dress for you:

[PRODUCTS_LIST_HERE]

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`,
    })
  })

  it('does not return parsed recommended SKUs if there are none', () => {
    const assistantMessage = `I couldn't find any matching products. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: [],
      tokenizedMessage: assistantMessage,
    })
  })
})
