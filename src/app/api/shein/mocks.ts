import type { SheinProductExtendedMessage } from '@/app/shein/types'

export const MOCK_MESSAGES: SheinProductExtendedMessage[] = [
  {
    type: 'user',
    content:
      "I'm looking for some fresh new black pants for my friend's outdoor dinner party coming up in May here in Houston",
  },
  {
    type: 'functionCall',
    content: null,
    calls: [
      {
        id: 'call_pjt2bf2nztnrQofNeDgHWPWn',
        name: 'searchProducts',
        arguments: {
          color: 'black',
          type: 'pants',
          style: 'party',
        },
      },
    ],
  },
  {
    type: 'functionResponse',
    id: 'call_pjt2bf2nztnrQofNeDgHWPWn',
    name: 'searchProducts',
    content: {
      items: [
        {
          id: 'swpants07200807999',
          name: 'SHEIN BAE Zip Front Wide Waistband Coated Pants',
        },
        {
          id: 'sw2108251156521888',
          name: 'SHEIN BAE High Waist PU Leather Skinny Pants',
        },
        {
          id: 'sw2109239020235037',
          name: 'SHEIN Unity Crop Sequin Cami Top and Wide Leg Pants Set',
        },
        {
          id: 'sw2211144118197961',
          name: 'SHEIN PETITE High Waist Sequin Straight Leg Pants',
        },
        {
          id: 'sw2209165785055175',
          name: 'SHEIN BAE Solid Glitter Flare Leg Pants',
        },
        {
          id: 'sw2209229383891421',
          name: 'SHEIN BAE High Waist Glitter Wide Leg Pants',
        },
        {
          id: 'sw2209280192782655',
          name: 'SHEIN Unity High Waist Stacked PU Pants',
        },
        {
          id: 'sw2209194492900641',
          name: 'SHEIN Unity Drawstring Waist Glitter Pants',
        },
        {
          id: 'sw2210269997983004',
          name: 'SHEIN PETITE High Waist PU Skinny Pants',
        },
        {
          id: 'sw2108300603808094',
          name: 'SHEIN BAE High Waist PU Leather Pants',
        },
      ],
    },
  },
  {
    content:
      "Here are my top picks for you:\n\n1. `sw2211144118197961`: SHEIN PETITE High Waist Sequin Straight Leg Pants\n2. `sw2108251156521888`: SHEIN BAE High Waist PU Leather Skinny Pants\n3. `sw2209280192782655`: SHEIN Unity High Waist Stacked PU Pants\n4. `sw2209229383891421`: SHEIN BAE High Waist Glitter Wide Leg Pants\n5. `sw2209165785055175`: SHEIN BAE Solid Glitter Flare Leg Pants\n\nWith Houston's temperamental weather, these pants are perfect for the chic sparkle your dinner party fits needs! Sequins, PU leather, and glitter details provide a stylish kick, while their high waists flatter your silhouette. Some are straight, while others are wide or flare leg, offering variety for your comfort and preference. \n\nIf you wish to narrow down further, feel free to provide more specifics, like the length of the pants, your budget, or the pattern you prefer!",
    type: 'assistant',
    itemIds: [
      [],
      [
        'sw2211144118197961',
        'sw2108251156521888',
        'sw2209280192782655',
        'sw2209229383891421',
        'sw2209165785055175',
      ],
      [],
      [],
    ],
    tokenizedContent: [
      'Here are my top picks for you:',
      null,
      "With Houston's temperamental weather, these pants are perfect for the chic sparkle your dinner party fits needs! Sequins, PU leather, and glitter details provide a stylish kick, while their high waists flatter your silhouette. Some are straight, while others are wide or flare leg, offering variety for your comfort and preference.",
      'If you wish to narrow down further, feel free to provide more specifics, like the length of the pants, your budget, or the pattern you prefer!',
    ],
    filter: { color: 'black', type: 'pants', style: 'party' },
    items: {
      sw2211144118197961: {
        brand: 'SHEIN PETITE',
        imageUrl:
          'https://storage.yandexcloud.net/clothes-and-wildberries/clothes-parsing-dataset/shein/2022/12/13/16709038169af85e10949d4937bb74217f4d65fbf2_thumbnail_600x.webp',
        meta: {
          Color: 'Black',
          Style: 'Party',
          'Pattern Type': 'Plain',
          Type: 'Straight Leg',
          'Closure Type': 'Zipper Fly',
          Details: 'Zipper',
          'Waist Line': 'High Waist',
          Length: 'Long',
          'Fit Type': 'Regular Fit',
          Fabric: 'Non-Stretch',
          Material: 'Woven Fabric',
          Composition: 'Polyester',
        },
        title: 'SHEIN PETITE High Waist Sequin Straight Leg Pants',
        price: 18.75,
        id: 'sw2211144118197961',
        url: 'https://us.shein.com/SHEIN-PETITE-High-Waist-Sequin-Straight-Leg-Pants-p-12459648-cat-1740.html?mallCode=1',
      },
      sw2108251156521888: {
        brand: 'SHEIN BAE',
        imageUrl:
          'https://storage.yandexcloud.net/clothes-and-wildberries/clothes-parsing-dataset/shein/2022/08/29/1661765800b57142ebc00b2981f581ccb4494e45c7_thumbnail_600x.webp',
        meta: {
          Color: 'Black',
          Style: 'Party',
          'Pattern Type': 'Plain',
          Type: 'Skinny',
          'Closure Type': 'Zipper Fly',
          Details: 'Zipper',
          'Waist Line': 'High Waist',
          Length: 'Long',
          'Fit Type': 'Skinny',
          Fabric: 'Non-Stretch',
          Material: 'PU Leather',
          Composition: 'Polyester',
        },
        title: 'SHEIN BAE High Waist PU Leather Skinny Pants',
        price: 13.49,
        id: 'sw2108251156521888',
        url: 'https://us.shein.com/SHEIN-BAE-High-Waist-PU-Leather-Skinny-Pants-p-3909051-cat-1740.html?mallCode=1',
      },
      sw2209280192782655: {
        brand: 'SHEIN Unity',
        imageUrl:
          'https://storage.yandexcloud.net/clothes-and-wildberries/clothes-parsing-dataset/shein/2022/11/24/166927104782a89ad81915e6eefe989ea5617c38b0_thumbnail_600x.webp',
        meta: {
          Color: 'Black',
          Style: 'Party',
          'Pattern Type': 'Plain',
          Type: 'Straight Leg',
          'Closure Type': 'Zipper Fly',
          Details: 'Zipper',
          'Waist Line': 'High Waist',
          Length: 'Long',
          'Fit Type': 'Skinny',
          Fabric: 'Slight Stretch',
          Material: 'PU Leather',
          Composition: 'Polyester',
        },
        title: 'SHEIN Unity High Waist Stacked PU Pants',
        price: 24.49,
        id: 'sw2209280192782655',
        url: 'https://us.shein.com/SHEIN-Unity-High-Waist-Stacked-PU-Pants-p-12241226-cat-1740.html?mallCode=1',
      },
      sw2209229383891421: {
        brand: 'SHEIN BAE',
        imageUrl:
          'https://storage.yandexcloud.net/clothes-and-wildberries/clothes-parsing-dataset/shein/2023/01/03/16727068669b920903ed7ab4ffb40dddf9e177f683_thumbnail_600x.webp',
        meta: {
          Color: 'Black',
          Style: 'Party',
          'Pattern Type': 'Plain',
          Type: 'Wide Leg',
          'Closure Type': 'Elastic Waist',
          'Waist Line': 'High Waist',
          Length: 'Long',
          'Fit Type': 'Loose',
          Fabric: 'High Stretch',
          Material: 'Knitted Fabric',
          Composition: 'Polyester',
        },
        title: 'SHEIN BAE High Waist Glitter Wide Leg Pants',
        price: 15,
        id: 'sw2209229383891421',
        url: 'https://us.shein.com/SHEIN-BAE-High-Waist-Glitter-Wide-Leg-Pants-p-12650904-cat-1740.html?mallCode=1',
      },
      sw2209165785055175: {
        brand: 'SHEIN BAE',
        imageUrl:
          'https://storage.yandexcloud.net/clothes-and-wildberries/clothes-parsing-dataset/shein/2022/12/09/167055519974c168d81a8559b408827f1e88741e5f_thumbnail_600x.webp',
        meta: {
          Color: 'Black',
          Style: 'Party',
          'Pattern Type': 'Plain',
          Type: 'Flare Leg',
          'Closure Type': 'Elastic Waist',
          'Waist Line': 'Natural',
          Length: 'Long',
          'Fit Type': 'Regular Fit',
          Fabric: 'Medium Stretch',
          Material: 'Metallic',
          Composition: 'Polyester',
        },
        title: 'SHEIN BAE Solid Glitter Flare Leg Pants',
        price: 10.28,
        id: 'sw2209165785055175',
        url: 'https://us.shein.com/SHEIN-BAE-Solid-Glitter-Flare-Leg-Pants-p-12417048-cat-1740.html?mallCode=1',
      },
    },
  },
]

/**
 * Creates a readable stream with mock messages
 */
export const getMockStream = (assistantPrompt: string) => {
  const initialMessagesStream = new ReadableStream<string>({
    start(controller) {
      controller.enqueue(
        `\n${JSON.stringify({
          newMessages: [
            { type: 'assistant', content: assistantPrompt },
            ...MOCK_MESSAGES,
          ],
        })}`,
      )

      controller.close()
    },
  })

  return initialMessagesStream
}
