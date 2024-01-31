import { buildProductSearch, parseRecommendedSkuIds } from './products'

describe('searchProducts', () => {
  const searchProducts = buildProductSearch(false)

  it('returns matches for color', async () => {
    const matchedProducts = await searchProducts({ color: 'blue' })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sc2208102889135571",
      "name": "Geometric Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sc2211064774707599",
      "name": "Cat Eye Anti-blue Light Eyeglasses",
    },
    {
      "id": "sc2212293481640002",
      "name": "Square Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sc2209216236762550",
      "name": "Square Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sk2207073469103373",
      "name": "SHEIN X blue Girls Slant Pocket Pants",
    },
    {
      "id": "sk2207221300841168",
      "name": "SHEIN X blue Girls Graphic Print Quilted Coat",
    },
    {
      "id": "sk2207079227524393",
      "name": "SHEIN X blue Girls Slogan Graphic Drop Shoulder Pullover",
    },
    {
      "id": "sk2207071162016112",
      "name": "SHEIN X blue Girls Colorblock & Cartoon Graphic Drop Shoulder Sweatshirt",
    },
    {
      "id": "sw2112035015446803",
      "name": "Ditsy Floral Print Ruffle Hem Dress",
    },
    {
      "id": "sw2111295297261241",
      "name": "Floral Print Puff Sleeve Ruched Split Thigh Bustier Dress",
    },
  ],
}
`)
  })

  it('returns matches for dresses', async () => {
    const matchedProducts = await searchProducts({
      type: 'dress',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2212233273850468",
      "name": "Ruffle Trim Lapel Collar Blazer Dress",
    },
    {
      "id": "sw2212020605675650",
      "name": "Double Breasted Ruffle Hem Blazer Dress",
    },
    {
      "id": "sw2209094647535768",
      "name": "MOTF PREMIUM VISCOSE-BLEND BLAZER DRESS",
    },
    {
      "id": "sw2212232164448114",
      "name": "Lapel Neck Rhinestone Trim Blazer Dress",
    },
    {
      "id": "sw2210163770150018",
      "name": "Solid Bishop Sleeve Drawstring Hoodie Dress",
    },
    {
      "id": "sw2207121871730551",
      "name": "SHEIN BAE Double Breasted Velvet Blazer Dress",
    },
    {
      "id": "sw2209280191141516",
      "name": "SHEIN BIZwear Lapel Neck Belted Blazer Dress",
    },
    {
      "id": "sw2208182548011183",
      "name": "SHEIN BIZwear Lantern Sleeve Double Breasted Blazer Dress",
    },
    {
      "id": "sw2207210463024422",
      "name": "SHEIN Unity Lapel Neck Flap Detail Blazer Dress",
    },
    {
      "id": "sw2206145355963502",
      "name": "SHEIN BAE Lapel Collar Mesh Insert Blazer Dress",
    },
  ],
}
`)
  })

  it('returns matches for cheap pants', async () => {
    const matchedProducts = await searchProducts({
      budget: 15,
      type: 'pants',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "swtwop07210525231",
      "name": "SHEIN X Penelope Ping Distressed Knit Top & Knit Pants",
    },
    {
      "id": "st2203314334176054",
      "name": "Men Slogan Graphic Sports Pants",
    },
    {
      "id": "st2112076684666046",
      "name": "Men Letter Graphic Sports Pants",
    },
    {
      "id": "st2211096620617066",
      "name": "Men Drawstring Waist Sports Pants",
    },
    {
      "id": "st2210178213241619",
      "name": "Men Drawstring Waist Sports Pants",
    },
    {
      "id": "sw2211304171465643",
      "name": "Solid Patched Pocket Cargo Pants",
    },
    {
      "id": "sw2211253265659049",
      "name": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2212032507477872",
      "name": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2212055833273271",
      "name": "Solid Flap Pocket Side Cargo Pants",
    },
    {
      "id": "st2209085111167000",
      "name": "Men Contrast Panel Drawstring Waist Sports Pants",
    },
  ],
}
`)
  })

  it('returns matches for black, casual & short-sleeved shirt', async () => {
    const matchedProducts = await searchProducts({
      color: 'black',
      style: 'casual',
      type: 'shirt',
      length: 'short sleeve',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2212108266462626",
      "name": "Plaid Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211183575102275",
      "name": "Brush Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2110182034855490",
      "name": "Lantern Sleeve Flap Detail Shirt Dress Without Belt",
    },
    {
      "id": "sw2111122032336444",
      "name": "Letter Graphic Lantern Sleeve Shirred Shirt Dress",
    },
    {
      "id": "sw2211211033100249",
      "name": "Striped Print Shirt Dress",
    },
    {
      "id": "sw2207049607919140",
      "name": "Allover Letter Graphic Contrast Mesh Bishop Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211254891201015",
      "name": "Contrast Leopard Belted Shirt Dress",
    },
    {
      "id": "sw2211140602431112",
      "name": "Allover Letter Graphic Shirt Dress",
    },
    {
      "id": "sw2211143700393052",
      "name": "Brush Print Belted Shirt Dress",
    },
    {
      "id": "sw2211262304218224",
      "name": "Solid Half Button Shirt Dress Without Belt",
    },
  ],
}
`)
  })

  it('returns matches for black elegant yet inexpensive dresses', async () => {
    const matchedProducts = await searchProducts({
      color: 'black',
      style: 'elegant',
      type: 'dress',
      budget: 30,
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2107210728304149",
      "name": "SHEIN X Black Sheep Allover Floral Print Pocket Patched Shirt Dress Without Belt",
    },
    {
      "id": "sw2209017474592348",
      "name": "SHEIN X FRIDAY CANDY Double Breasted Fringe Trim Blazer Dress",
    },
    {
      "id": "swlounge03201223960",
      "name": "Plus Floral Print Ruffle Hem Satin Cami Night Dress",
    },
    {
      "id": "si2209230086488789",
      "name": "Plus Contrast Lace Cami Nightdress",
    },
    {
      "id": "si2211261663223337",
      "name": "SHEIN FIT+ Plus Lace Trim Satin Slips",
    },
    {
      "id": "si2212160933894151",
      "name": "Contrast Lace Satin Cami Nightdress & Belted Robe",
    },
    {
      "id": "si2212010219804014",
      "name": "Plus Floral Print Satin Cami Nightdress",
    },
    {
      "id": "si2212167713112242",
      "name": "Plus Floral Print Satin Cami Nightdress",
    },
    {
      "id": "sw2205264466719129",
      "name": "Pleated Belted Dress",
    },
    {
      "id": "sw2204117427276271",
      "name": "SHEIN Unity Drop Shoulder Lettuce Trim Mesh Dress Without Cami Dress",
    },
  ],
}
`)
  })

  it('returns matches for dark, high-waist jeans', async () => {
    const matchedProducts = await searchProducts({
      color: 'dark',
      style: 'high waist',
      type: 'pants',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2211238018901176",
      "name": "SHEIN Frenchy High Waist Flare Leg Pants",
    },
    {
      "id": "sw2211011811178955",
      "name": "High Waist Glitter Wide Leg Pants",
    },
    {
      "id": "sw2107138820617896",
      "name": "SHEIN Unity Plus Solid High Waist Pants",
    },
    {
      "id": "sw2208153916525121",
      "name": "SHEIN X GOD.like High Waist Topstitching Pants",
    },
    {
      "id": "sw2211161621817717",
      "name": "DAZY High Waist Pocket Patched Pants",
    },
    {
      "id": "sw2212221604066282",
      "name": "DAZY High Waist Plicated Detail Pants",
    },
    {
      "id": "sw2201178811378137",
      "name": "SHEIN Unity Solid Knot Front Pants",
    },
    {
      "id": "sw2112104807506499",
      "name": "SHEIN Unity Solid Slant Pocket Skinny Pants",
    },
    {
      "id": "sS2106170092965576",
      "name": "SHEIN Unity Plus Solid Flare Leg Pants",
    },
    {
      "id": "sf2208199889480676",
      "name": "SHEIN X mia Plus Slant Pocket Belted Pants",
    },
  ],
}
`)
  })

  it('matches sport to sports, but not shorts/shirt/skort', async () => {
    const matchedProducts = await searchProducts({
      color: 'green',
      style: 'sport',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "st2206125463322257",
      "name": "Solid Raglan Sleeve Sport Tee & Leggings Set",
    },
    {
      "id": "sw2107218851252425",
      "name": "Neon Green Raglan Sleeve Sports Tee With Thumb Holes",
    },
    {
      "id": "st2203314334176054",
      "name": "Men Slogan Graphic Sports Pants",
    },
    {
      "id": "st2205246816951991",
      "name": "Sports Camo Print Half-finger Gloves",
    },
    {
      "id": "st2209085111167000",
      "name": "Men Contrast Panel Drawstring Waist Sports Pants",
    },
    {
      "id": "sw2108160193355008",
      "name": "High Stretch Seamless Camo Cut Sports Top & Wide Band Waist Sports Leggings",
    },
    {
      "id": "st2205197731209239",
      "name": "Wide Waistband Sports Shorts",
    },
    {
      "id": "st2212025843225235",
      "name": "Solid Racer Back Sports Bra",
    },
    {
      "id": "st2110187644777352",
      "name": "Seamless Tie Dye Sports Leggings",
    },
    {
      "id": "st2208254567504392",
      "name": "Ribbed Knit Crop Sports Cami Top",
    },
  ],
}
`)
  })

  it('can find items with pockets even if the styles only say "pocket"', async () => {
    const matchedProducts = await searchProducts({
      style: 'high waist',
      type: 'shorts',
      budget: 10,
      color: 'white',
      feature: 'pockets',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2106198644589565",
      "name": "SHEINNeu High Waist Striped Pattern Pocket Front Shorts",
    },
    {
      "id": "sw2202149931996619",
      "name": "SHEIN BIZwear Asymmetrical Waist Slant Pocket Shorts",
    },
  ],
}
`)
  })

  it('returns matches for comma-separated values (as OR)', async () => {
    const matchedProducts = await searchProducts({
      color: 'white, pink',
      type: 'skort',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2106260372009523",
      "name": "Wide Waistband Pleated Sports Skort",
    },
    {
      "id": "st2208235652399446",
      "name": "VUTRU Elastic Waist Sports Skort",
    },
    {
      "id": "st2206295651529832",
      "name": "Curved Hem Solid Sports Skort",
    },
    {
      "id": "st2203100087354196",
      "name": "Breathable Softness Flare Tennis Skort",
    },
    {
      "id": "sw2211252580582072",
      "name": "High Waist Button Detail Wrap Skort",
    },
    {
      "id": "st2202231536139166",
      "name": "VUTRU Wide Waistband Solid Sports Skort",
    },
    {
      "id": "st2212171208410205",
      "name": "VUTRU Shirred Waist Phone Pocket Sports Skort",
    },
    {
      "id": "st2208176365311633",
      "name": "High Waist Phone Pocket Ruffle Sports Skort",
    },
    {
      "id": "sw2205052488114580",
      "name": "SHEIN Dopamine Dressing Phone Pocket Detail Skort",
    },
    {
      "id": "st2205218087584437",
      "name": "VUTRU Wide Waistband Sports Skort With Phone Pocket",
    },
  ],
}
`)
  })

  it('returns a match when a SKU ID is passed', async () => {
    const matchedProducts = await searchProducts({
      id: 'sw2208248101173885',
      color: 'white',
      style: 'casual',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [
    {
      "id": "sw2208248101173885",
      "name": "LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress",
    },
  ],
}
`)
  })

  it('returns matches when only budget is passed is passed', async () => {
    const matchedProducts = await searchProducts({
      budget: 25,
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "products": [],
}
`)
  })
})

describe('parseRecommendedSkus', () => {
  it('returns parsed recommended SKUs (bulleted)', () => {
    const assistantMessage = `Here are some regular size white sports shorts that you might like:

- st2111174095230420: Absorbs Sweat Breathable Sports Shorts
- st2204115757248053: Plus Lightweight Dalmatian Print Sports Shorts
- st2210085200206136: Men Colorblock 2 In 1 Sports Shorts

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "st2111174095230420",
      "st2204115757248053",
      "st2210085200206136",
    ],
    [],
  ],
  "tokenizedContent": [
    "Here are some regular size white sports shorts that you might like:",
    null,
    "These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
  ],
}
`)
  })

  it('returns parsed recommended SKUs (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress
2. sw2211049001334380: SHEIN MOD Plaid Print Tie Neck Flounce Sleeve Tweed Dress
3. sf2210106109540663: SHEIN Unity Plus Contrast Dobby Mesh Flounce Sleeve Dress
4. sw2211288535270908: Striped Print Drawstring Hooded Bodycon Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "sw2208248101173885",
      "sw2211049001334380",
      "sf2210106109540663",
      "sw2211288535270908",
    ],
    [],
    [],
  ],
  "tokenizedContent": [
    "Here are the top white dresses that would be perfect for a wedding:",
    null,
    "These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!",
    "To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.",
  ],
}
`)
  })

  it('returns parsed recommended SKUs (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2210093012192118**: Buffalo Plaid Print Open Front Teddy Vest Coat
- **sw2109093443314646**: SHEIN X Catherine Chen Teddy Panel Drop Shoulder Tweed Coat
- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "sw2210093012192118",
      "sw2109093443314646",
      "sw2209138169687189",
    ],
    [],
  ],
  "tokenizedContent": [
    "Here are the best winter coats for you:",
    null,
    "These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!",
  ],
}
`)
  })

  it('returns recommended SKUs if there is only one (bulleted)', () => {
    const assistantMessage = `I found a stunning black mermaid style maxi dress for you:

- sw2209228195095791: SHEIN Unity Square Neck Mermaid Hem Bodycon Dress

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "sw2209228195095791",
    ],
    [],
  ],
  "tokenizedContent": [
    "I found a stunning black mermaid style maxi dress for you:",
    null,
    "This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!",
  ],
}
`)
  })

  it('returns recommended SKU if there is only one (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "sw2208248101173885",
    ],
    [],
    [],
  ],
  "tokenizedContent": [
    "Here are the top white dresses that would be perfect for a wedding:",
    null,
    "These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!",
    "To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.",
  ],
}
`)
  })

  it('returns recommended SKU if there is only one (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
    [
      "sw2209138169687189",
    ],
    [],
  ],
  "tokenizedContent": [
    "Here are the best winter coats for you:",
    null,
    "These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!",
  ],
}
`)
  })

  it('returns SKUs when the IDs are at the end of the bullets', () => {
    const assistantContent = `Perfect, I've found some delightful options for you:

- Moiraine Lattice Back Tee (sw2655301)
- Harper Button Down Tunic Blouse (sdress3051490)
- Madison Longline V-Neck Tee (sq3068039)
- Katie Soft Rib Long Sleeve Top (sww2223144)
- Caillen Button Front Top (suw2809538)

These options consist of lovely tops ranging from the simple and versatile Moiraine Tee to the chic Harper Button Down Tunic. How exciting!

Remember, you can always narrow down the options by giving more specifics such as color, material, fit, lengths and so on. Let's make your shopping experience as fun and easy as possible! You're just a step away from your next favorite outfit.`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [
            "sw2655301",
            "sdress3051490",
            "sq3068039",
            "sww2223144",
            "suw2809538",
          ],
          [],
          [],
        ],
        "tokenizedContent": [
          "Perfect, I've found some delightful options for you:",
          null,
          "These options consist of lovely tops ranging from the simple and versatile Moiraine Tee to the chic Harper Button Down Tunic. How exciting!",
          "Remember, you can always narrow down the options by giving more specifics such as color, material, fit, lengths and so on. Let's make your shopping experience as fun and easy as possible! You're just a step away from your next favorite outfit.",
        ],
      }
    `)
  })

  it('returns grouped SKU IDs when there are groups of products with block headings', () => {
    const assistantContent = `Here are the top options I'd recommend for a black top and black jeans:

## Top Options

- sy2380491: Summer Escape Knit Top
- sie3192612: Butter Mesh Inset Knit Top
- sss3157764637: Shiloh Clipdot Blouse
- sw2897782: Flutter Sleeve Popover Blouse
- st2712964: Griffith Tie Detail Knit Top

## Jeans Options

- sp3110035: Thompson Tomboy Straight Jean
- sml3043372: Better Butter Sheila Slim Straight Jean
- sr3021642:  Marshall Mid Rise No Gap Skinny Jean
- sp2095815: Abby High Rise Skinny Jean
- sj7244773481: Fae Straight Leg Jean

I've picked these options because they are a perfect match for your color preference and item type. The tops range from breezy knits to elegant blouses, suitable for any casual or dressy occasion. On the other hand, the jeans vary from slim straight to skinny, offering you different style choices according to your comfort and preference.

You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options. For example, do you prefer fitted or loose tops? High rise or mid rise jeans? Have fun choosing!`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [],
          [
            "sy2380491",
            "sie3192612",
            "sss3157764637",
            "sw2897782",
            "st2712964",
          ],
          [],
          [
            "sp3110035",
            "sml3043372",
            "sr3021642",
            "sp2095815",
            "sj7244773481",
          ],
          [],
          [],
        ],
        "tokenizedContent": [
          "Here are the top options I'd recommend for a black top and black jeans:",
          "## Top Options",
          null,
          "## Jeans Options",
          null,
          "I've picked these options because they are a perfect match for your color preference and item type. The tops range from breezy knits to elegant blouses, suitable for any casual or dressy occasion. On the other hand, the jeans vary from slim straight to skinny, offering you different style choices according to your comfort and preference.",
          "You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options. For example, do you prefer fitted or loose tops? High rise or mid rise jeans? Have fun choosing!",
        ],
      }
    `)
  })

  it('returns grouped SKU IDs when there are groups of products with text headings', () => {
    const assistantContent = `Here are the top options I'd recommend for a black top and black jeans:

**Top Options:**
- sy2380491: Summer Escape Knit Top
- sie3192612: Butter Mesh Inset Knit Top
- sss3157764637: Shiloh Clipdot Blouse
- sw2897782: Flutter Sleeve Popover Blouse
- st2712964: Griffith Tie Detail Knit Top

**Jeans Options:**
- sp3110035: Thompson Tomboy Straight Jean
- sml3043372: Better Butter Sheila Slim Straight Jean
- sr3021642:  Marshall Mid Rise No Gap Skinny Jean
- sp2095815: Abby High Rise Skinny Jean
- sj7244773481: Fae Straight Leg Jean

I've picked these options because they are a perfect match for your color preference and item type. The tops range from breezy knits to elegant blouses, suitable for any casual or dressy occasion. On the other hand, the jeans vary from slim straight to skinny, offering you different style choices according to your comfort and preference.

You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options. For example, do you prefer fitted or loose tops? High rise or mid rise jeans? Have fun choosing!`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [],
          [
            "sy2380491",
            "sie3192612",
            "sss3157764637",
            "sw2897782",
            "st2712964",
          ],
          [],
          [
            "sp3110035",
            "sml3043372",
            "sr3021642",
            "sp2095815",
            "sj7244773481",
          ],
          [],
          [],
        ],
        "tokenizedContent": [
          "Here are the top options I'd recommend for a black top and black jeans:",
          "**Top Options:**",
          null,
          "**Jeans Options:**",
          null,
          "I've picked these options because they are a perfect match for your color preference and item type. The tops range from breezy knits to elegant blouses, suitable for any casual or dressy occasion. On the other hand, the jeans vary from slim straight to skinny, offering you different style choices according to your comfort and preference.",
          "You might want to consider specifying the fit, style, and material for your top and jeans to help me narrow down the options. For example, do you prefer fitted or loose tops? High rise or mid rise jeans? Have fun choosing!",
        ],
      }
    `)
  })

  it('returns grouped SKU IDs when the bullets are nested', () => {
    const assistantContent = `Here are the top picks for you:

- Fall Jackets:
  - [sa1856557]: Cargo Jacket w/ Tan Stripe Lining
  - [sb3067918]: Poppy Sherpa Cargo Jacket
  - [sc2932028]: Regan Rain Jacket - Longline
  - [sd3026625]: Fashion Fleece Jacket
- Black Cardigan:
  - [se2080079]: Wells Confetti Cardigan (this one has pockets!)
- Flannels:
  - [sf666639]: Hayley Relaxed Button Down Woven Top
  - [sg1749178]: Analis Graphic Knit Tee
  - [sh2891273]: Hannah Sleep & Lounge Ultimate Cozy Long Sleeve Tunic and Jogger Set
  - [si1687579]: Joanna Chevron ColorBlock Hooded Knit Top
- Tunic:
  - [sj2891273]: Hannah Sleep & Lounge Ultimate Cozy Long Sleeve Tunic and Jogger Set
  - [sk2916494]: Melanie Knit Tunic Blazer
  - [sl2703623]: Rory WeFlex Cowl Neck Hood Tulip Hem Pullover
  - [sm2399643]: Malala Split Neck French Terry Hoodie

Feel free to adjust the color, material, or specific branding for more personalized results. Enjoy your shopping!`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [],
          [
            "sa1856557",
            "sb3067918",
            "sc2932028",
            "sd3026625",
          ],
          [],
          [
            "se2080079",
          ],
          [],
          [
            "sf666639",
            "sg1749178",
            "sh2891273",
            "si1687579",
          ],
          [],
          [
            "sj2891273",
            "sk2916494",
            "sl2703623",
            "sm2399643",
          ],
          [],
        ],
        "tokenizedContent": [
          "Here are the top picks for you:",
          "- Fall Jackets:",
          null,
          "- Black Cardigan:",
          null,
          "- Flannels:",
          null,
          "- Tunic:",
          null,
          "Feel free to adjust the color, material, or specific branding for more personalized results. Enjoy your shopping!",
        ],
      }
    `)
  })

  it('does not return parsed recommended SKUs if there are none', () => {
    const assistantMessage = `I couldn't find any matching products. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedSkuIds(assistantMessage)).toMatchInlineSnapshot(`
{
  "skuIds": [
    [],
  ],
  "tokenizedContent": [
    "I couldn't find any matching products. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
  ],
}
`)
  })

  it('does not return SKUs when a SKU is mentioned in a paragraph of text', () => {
    const assistantContent = `Fantastic choices! The Alexandra Infinity Scarf (sw2209138169687189) and Sidney Pom Beanie (sw2209228195095791) will not only keep you cozy but will also channel that boho vibe. You're all geared up for the party! 🎉👒

Is there anything else you would like help with? If you want more advice or have other special events coming up, I'm here for you. Let's keep making fashion magic together! 💃💫`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [],
        ],
        "tokenizedContent": [
          "Fantastic choices! The Alexandra Infinity Scarf (sw2209138169687189) and Sidney Pom Beanie (sw2209228195095791) will not only keep you cozy but will also channel that boho vibe. You're all geared up for the party! 🎉👒",
          "Is there anything else you would like help with? If you want more advice or have other special events coming up, I'm here for you. Let's keep making fashion magic together! 💃💫",
        ],
      }
    `)
  })

  it('returns SKUs when the product description comes after the SKU ID', () => {
    const assistantContent = `Here are some fabulous options to consider for the beach wedding:

- Lilly Pulitzer Kristen Flounce Dress (sw2209228195095791): This dress is playful with lattice detail at the back and a fun paisley print. It's perfected for a dressed-up beach look.
- 41 Hawthorn Beatriz Maxi Dress with Side Slit (sw2209138169687189): With a sleek design, this maxi dress features a side slit for a fashionable and practical touch, ideal for the warm beach breeze.
- Market & Spruce Alisha Knit Strappy Back Maxi Dress (sm2399643): This dress is versatile and features a fitted bodice that compliments any figure. The strappy back adds a dash of interest too!
- Kaileigh Hillary Sleeveless Fitted Dress (sc2932028): If you're going for a more minimalist yet sophisticated style, this dress is the one for you. A simple solid yet textured blue color and side slit give it a modern touch.

These dresses were chosen as they each have a unique style that pairs well with a Beach Wedding setting. Plus, they are all blue, which is the color desired. Of course, you may want to add a light wrap or shawl for the evening, and some elegant yet comfortable shoes for dancing in the sand. Would you like me to find those too?`

    const result = parseRecommendedSkuIds(assistantContent)

    expect(result).toMatchInlineSnapshot(`
      {
        "skuIds": [
          [],
          [
            "sw2209228195095791",
            "sw2209138169687189",
            "sm2399643",
            "sc2932028",
          ],
          [],
        ],
        "tokenizedContent": [
          "Here are some fabulous options to consider for the beach wedding:",
          null,
          "These dresses were chosen as they each have a unique style that pairs well with a Beach Wedding setting. Plus, they are all blue, which is the color desired. Of course, you may want to add a light wrap or shawl for the evening, and some elegant yet comfortable shoes for dancing in the sand. Would you like me to find those too?",
        ],
      }
    `)
  })
})
