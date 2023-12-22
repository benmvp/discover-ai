import { searchProducts, parseRecommendedSkuIds } from './products'

describe('searchProducts', () => {
  it('returns matches for color', async () => {
    const matchedProducts = await searchProducts({
      color: 'blue',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for dresses', async () => {
    const matchedProducts = await searchProducts({
      type: 'dress',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for cheap pants', async () => {
    const matchedProducts = await searchProducts({
      budget: 15,
      type: 'pants',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for black, casual & short-sleeved shirt', async () => {
    const matchedProducts = await searchProducts({
      color: 'black',
      style: 'casual',
      type: 'shirt',
      length: 'short sleeve',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for black elegant yet inexpensive dresses', async () => {
    const matchedProducts = await searchProducts({
      color: 'black',
      style: 'elegant',
      type: 'dress',
      budget: 30,
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })

  it('returns matches for dark, high-waist jeans', async () => {
    const matchedProducts = await searchProducts({
      color: 'dark',
      style: 'high waist',
      type: 'pants',
    })

    expect(matchedProducts.products.length).toBeGreaterThan(0)
  })
})

describe('parseRecommendedSkus', () => {
  it('returns parsed recommended SKUs (bulleted)', () => {
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
      tokenizedContent: `Here are some regular size white sports shorts that you might like:

[PRODUCTS_LIST_HERE]

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`,
    })
  })

  it('returns parsed recommended SKUs (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress
2. sw2211049001334380: SHEIN MOD Plaid Print Tie Neck Flounce Sleeve Tweed Dress
3. sf2210106109540663: SHEIN Unity Plus Contrast Dobby Mesh Flounce Sleeve Dress
4. sw2211288535270908: Striped Print Drawstring Hooded Bodycon Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: [
        'sw2208248101173885',
        'sw2211049001334380',
        'sf2210106109540663',
        'sw2211288535270908',
      ],
      tokenizedContent: `Here are the top white dresses that would be perfect for a wedding:

[PRODUCTS_LIST_HERE]

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`,
    })
  })

  it('returns parsed recommended SKUs (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2210093012192118**: Buffalo Plaid Print Open Front Teddy Vest Coat
- **sw2109093443314646**: SHEIN X Catherine Chen Teddy Panel Drop Shoulder Tweed Coat
- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: [
        'sw2210093012192118',
        'sw2109093443314646',
        'sw2209138169687189',
      ],
      tokenizedContent: `Here are the best winter coats for you:

[PRODUCTS_LIST_HERE]

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`,
    })
  })

  it('returns recommended SKUs if there is only one (bulleted)', () => {
    const assistantMessage = `I found a stunning black mermaid style maxi dress for you:

- sw2209228195095791: SHEIN Unity Square Neck Mermaid Hem Bodycon Dress

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: ['sw2209228195095791'],
      tokenizedContent: `I found a stunning black mermaid style maxi dress for you:

[PRODUCTS_LIST_HERE]

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`,
    })
  })

  it('returns recommended SKU if there is only one (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: ['sw2208248101173885'],
      tokenizedContent: `Here are the top white dresses that would be perfect for a wedding:

[PRODUCTS_LIST_HERE]

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`,
    })
  })

  it('returns recommended SKU if there is only one (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: ['sw2209138169687189'],
      tokenizedContent: `Here are the best winter coats for you:

[PRODUCTS_LIST_HERE]

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`,
    })
  })

  it('does not return parsed recommended SKUs if there are none', () => {
    const assistantMessage = `I couldn't find any matching products. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedSkuIds(assistantMessage)).toEqual({
      skuIds: [],
      tokenizedContent: assistantMessage,
    })
  })
})
