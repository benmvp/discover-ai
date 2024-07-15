import { Message } from '@/app/types'

export const MOCK_MESSAGES: Message[] = [
  {
    type: 'assistant',
    content:
      "Hi there. Let's find the very best clothes for you based on your needs. Are you searching for clothes for a specific occasion, in a specific color or matching a specific style? Describe what you're looking for and let's get started!",
  },
  { content: 'my friends keep making fun of my outfits 😭', type: 'user' },
  {
    type: 'assistant',
    content:
      "Oh no, we can't have that! Let's turn those heads for all the right reasons. 🌟\n\nTo help you look absolutely fab, can you tell me where and when you'll be wearing these new outfits? Are there specific colors or styles you love? Let's fix this wardrobe situation pronto! 💃✨",
  },
  {
    content:
      'I guess for more casual outings. Ideally I can wear them year round by layering. I want to stay away from floral prints',
    type: 'user',
  },
  {
    type: 'assistant',
    content:
      "Perfect! Casual and versatile pieces sound like a great plan. Let's find some stylish outfits that you can layer throughout the year without floral prints. 🎉\n\nDo you have any preferred colors or a specific budget in mind? That will help me tailor the options even more to your tastes. 😊",
  },
  { content: "i'm open to anything at this point", type: 'user' },
  {
    calls: [
      {
        id: 'call_cf5FlCmUGhfa5kMurC4dkv59',
        name: 'searchProducts',
        arguments: { style: 'casual', pattern: 'solid' },
      },
      {
        id: 'call_A9rUnhziV8h5Yy79OQ6WJ9JJ',
        name: 'searchProducts',
        arguments: { style: 'casual', pattern: 'striped' },
      },
      {
        id: 'call_kd2vvqJUEtDtRjH6KALNeYyu',
        name: 'searchProducts',
        arguments: { style: 'casual', pattern: 'plain' },
      },
    ],
    content:
      "Got it! Let's find some amazing casual and versatile items to revamp your wardrobe. I'm on it! 😊\n\nI'll look for:\n\n- Casual styles\n- Non-floral patterns\n- Pieces suitable for year-round wear through layering\n\nHang tight while I fetch some fabulous options for you! 🛍️✨",
    type: 'functionCall',
  },
  {
    name: '',
    content: { items: [] },
    id: 'call_cf5FlCmUGhfa5kMurC4dkv59',
    type: 'functionResponse',
  },
  {
    name: '',
    content: {
      items: [
        {
          id: 'sw2204296244611112',
          title: 'ROMWE PUNK Striped & Letter Graphic Tee',
        },
        {
          id: 'sw2212010032313301',
          title: 'ROMWE PUNK Striped Print Crop Halter Top',
        },
        {
          id: 'sw2211095907150257',
          title: 'DAZY Striped Print Drop Shoulder Shirt',
        },
        {
          id: 'sw2111237451960562',
          title: 'SHEIN EZwear Striped Pattern Rib-knit Bodycon Dress',
        },
        {
          id: 'sw2208080234275505',
          title: 'Striped Print Ruffle Trim Crisscross Back One Piece Swimsuit',
        },
        {
          id: 'sw2211026197162041',
          title: 'DAZY Striped Pattern Contrast Trim Sweater',
        },
        {
          id: 'sw2211171873851094',
          title: 'MOTF PREMIUM SLINKY BUTTON-CHAIN DETAIL SWEATER',
        },
        {
          id: 'sw2206095255556484',
          title: 'SHEIN PETITE Striped Crop Cami Top',
        },
        {
          id: 'sw2205260058946849',
          title: 'SHEIN SXY Striped Print Drop Shoulder Tee',
        },
        {
          id: 'swvest07200805036',
          title: 'SHEIN Unity Plus Ribbed Striped Cropped Cami Top',
        },
      ],
    },
    id: 'call_A9rUnhziV8h5Yy79OQ6WJ9JJ',
    type: 'functionResponse',
  },
  {
    name: '',
    content: {
      items: [
        {
          id: 'sw2211216161070033',
          title: 'Swiss Dot Shirred Detail Frill Trim Smock Dress',
        },
        { id: 'swvest24210511451', title: 'Solid Rib-Knit Crop Tank Top' },
        {
          id: 'sS2106120069434345',
          title: 'SHEIN SXY Solid Rib-knit Halter Crop Top',
        },
        {
          id: 'sw2206293992980018',
          title: 'SHEIN ICON High Waist Ruched Parachute Skirt',
        },
        {
          id: 'sw2211092273341870',
          title: 'Jacquard Off Shoulder Lantern Sleeve Crop Blouse',
        },
        {
          id: 'sw2202151185117326',
          title: 'SHEIN PETITE Scoop Neck Tank Bodycon Dress',
        },
        {
          id: 'sw2211249095559294',
          title: 'SHEIN Frenchy Scallop Trim Button Back Blouse',
        },
        {
          id: 'sw2210277625174760',
          title: 'SHEIN MOD Solid Drawstring Hem Cargo Pants',
        },
        {
          id: 'sw2212036552746364',
          title: 'SHEIN MOD Solid Pleated Belted Skort',
        },
        { id: 'sw2207294408017518', title: 'Solid Crop PU Halter Top' },
      ],
    },
    id: 'call_kd2vvqJUEtDtRjH6KALNeYyu',
    type: 'functionResponse',
  },
  {
    type: 'assistant',
    content:
      "Here are some fabulous casual options for you to consider! 🎉\n\n- **Striped Patterns:**\n  - sw2204296244611112: ROMWE PUNK Striped & Letter Graphic Tee\n  - sw2212010032313301: ROMWE PUNK Striped Print Crop Halter Top\n  - sw2211095907150257: DAZY Striped Print Drop Shoulder Shirt\n  - sw2111237451960562: SHEIN EZwear Striped Pattern Rib-knit Bodycon Dress\n  - sw2211026197162041: DAZY Striped Pattern Contrast Trim Sweater\n\n- **Plain/Solid Patterns:**\n  - swvest24210511451: Solid Rib-Knit Crop Tank Top\n  - sS2106120069434345: SHEIN SXY Solid Rib-knit Halter Crop Top\n  - sw2206293992980018: SHEIN ICON High Waist Ruched Parachute Skirt\n  - sw2202151185117326: SHEIN PETITE Scoop Neck Tank Bodycon Dress\n  - sw2207294408017518: Solid Crop PU Halter Top\n\nAll these options are casual, trendy, and perfect for layering throughout the year. You've got some fantastic striped and solid pieces here that can mix and match effortlessly! 🌈✨ \n\nTo narrow it down further, you might want to consider the length, specific types of clothing items (like shirts, dresses, or pants), or your preferred color palette. Let's make sure every outfit you wear turns heads for all the right reasons! 😊👗👖",
  },
]
