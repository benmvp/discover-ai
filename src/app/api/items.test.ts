import { parseRecommendedItemIds } from './items'
import { ITEM_ID_REGEX } from './shein/constants'

describe('parseRecommendedItemIds', () => {
  it('returns parsed recommended items (bulleted)', () => {
    const assistantMessage = `Here are some regular size white sports shorts that you might like:

- st2111174095230420: Absorbs Sweat Breathable Sports Shorts
- st2204115757248053: Plus Lightweight Dalmatian Print Sports Shorts
- st2210085200206136: Men Colorblock 2 In 1 Sports Shorts

These options are designed for sports activities and come in the white color you're looking for. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns parsed recommended items (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress
2. sw2211049001334380: SHEIN MOD Plaid Print Tie Neck Flounce Sleeve Tweed Dress
3. sf2210106109540663: SHEIN Unity Plus Contrast Dobby Mesh Flounce Sleeve Dress
4. sw2211288535270908: Striped Print Drawstring Hooded Bodycon Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns parsed recommended items (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2210093012192118**: Buffalo Plaid Print Open Front Teddy Vest Coat
- **sw2109093443314646**: SHEIN X Catherine Chen Teddy Panel Drop Shoulder Tweed Coat
- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns recommended items if there is only one (bulleted)', () => {
    const assistantMessage = `I found a stunning black mermaid style maxi dress for you:

- sw2209228195095791: SHEIN Unity Square Neck Mermaid Hem Bodycon Dress

This black dress features a square neck design and a mermaid hem, making it an elegant and sleek choice for a wedding or any formal event. If you need more options in black or any other color, feel free to let me know, and I can find more recommendations for you. Happy to help you find the perfect outfit for the wedding!`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns recommended item if there is only one (numbered)', () => {
    const assistantMessage = `Here are the top white dresses that would be perfect for a wedding:

1. sw2208248101173885: LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress

These dresses come in various styles and lengths, perfect for making a statement without overshadowing the bride. Enjoy picking the perfect dress for the occasion!

To narrow down your options further, you can consider specifying the length, material, and pattern you prefer for the dress.`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns recommended item if there is only one (bolded)', () => {
    const assistantMessage = `Here are the best winter coats for you:

- **sw2209138169687189**: SHEIN X Duane Smith Two Tone Lapel Collar Belted Trench Coat

These coats are warm, stylish, and perfect for the winter season. If you want to narrow down the options, you can also consider attributes like color, material, and length. Happy shopping!`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
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

  it('returns items when the IDs are at the end of the bullets', () => {
    const assistantContent = `Perfect, I've found some delightful options for you:

- Moiraine Lattice Back Tee (sw2655301)
- Harper Button Down Tunic Blouse (sdress3051490)
- Madison Longline V-Neck Tee (sq3068039)
- Katie Soft Rib Long Sleeve Top (sww2223144)
- Caillen Button Front Top (suw2809538)

These options consist of lovely tops ranging from the simple and versatile Moiraine Tee to the chic Harper Button Down Tunic. How exciting!

Remember, you can always narrow down the options by giving more specifics such as color, material, fit, lengths and so on. Let's make your shopping experience as fun and easy as possible! You're just a step away from your next favorite outfit.`

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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

  it('returns grouped item IDs when there are groups of items with block headings', () => {
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

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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

  it('returns grouped item IDs when there are groups of items with text headings', () => {
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

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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

  it('returns grouped item IDs when the bullets are nested', () => {
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

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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

  it('does not return parsed recommended items if there are none', () => {
    const assistantMessage = `I couldn't find any matching items. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!`

    expect(parseRecommendedItemIds(assistantMessage, ITEM_ID_REGEX))
      .toMatchInlineSnapshot(`
{
  "itemIds": [
    [],
  ],
  "tokenizedContent": [
    "I couldn't find any matching items. If you have any other specific preferences or if there's anything else I can assist you with, feel free to let me know!",
  ],
}
`)
  })

  it('does not return items when a item is mentioned in a paragraph of text', () => {
    const assistantContent = `Fantastic choices! The Alexandra Infinity Scarf (sw2209138169687189) and Sidney Pom Beanie (sw2209228195095791) will not only keep you cozy but will also channel that boho vibe. You're all geared up for the party! 🎉👒

Is there anything else you would like help with? If you want more advice or have other special events coming up, I'm here for you. Let's keep making fashion magic together! 💃💫`

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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

  it('returns items when the item description comes after the item ID', () => {
    const assistantContent = `Here are some fabulous options to consider for the beach wedding:

- Lilly Pulitzer Kristen Flounce Dress (sw2209228195095791): This dress is playful with lattice detail at the back and a fun paisley print. It's perfected for a dressed-up beach look.
- 41 Hawthorn Beatriz Maxi Dress with Side Slit (sw2209138169687189): With a sleek design, this maxi dress features a side slit for a fashionable and practical touch, ideal for the warm beach breeze.
- Market & Spruce Alisha Knit Strappy Back Maxi Dress (sm2399643): This dress is versatile and features a fitted bodice that compliments any figure. The strappy back adds a dash of interest too!
- Kaileigh Hillary Sleeveless Fitted Dress (sc2932028): If you're going for a more minimalist yet sophisticated style, this dress is the one for you. A simple solid yet textured blue color and side slit give it a modern touch.

These dresses were chosen as they each have a unique style that pairs well with a Beach Wedding setting. Plus, they are all blue, which is the color desired. Of course, you may want to add a light wrap or shawl for the evening, and some elegant yet comfortable shoes for dancing in the sand. Would you like me to find those too?`

    const result = parseRecommendedItemIds(assistantContent, ITEM_ID_REGEX)

    expect(result).toMatchInlineSnapshot(`
      {
        "itemIds": [
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
