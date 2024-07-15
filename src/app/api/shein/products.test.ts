import { buildProductSearch } from './products'

describe('searchProducts', () => {
  const searchProducts = buildProductSearch(false)

  it('returns matches for color', async () => {
    const matchedProducts = await searchProducts({ color: 'blue' })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "items": [
    {
      "id": "sw2112035015446803",
      "title": "Ditsy Floral Print Ruffle Hem Dress",
    },
    {
      "id": "sw2111295297261241",
      "title": "Floral Print Puff Sleeve Ruched Split Thigh Bustier Dress",
    },
    {
      "id": "sw2211217176141116",
      "title": "SHEIN SXY Drop Shoulder Satin Dress",
    },
    {
      "id": "sh2209048181591115",
      "title": "1pc Geometric Pattern Stretchy Sofa Slipcover With 1pc Pillowcase Without Filler",
    },
    {
      "id": "si2209236855136655",
      "title": "Plus Cartoon & Slogan Graphic PJ Set",
    },
    {
      "id": "sh2205283026549362",
      "title": "Plain Tassel Decor Bed Runner",
    },
    {
      "id": "sw2202286251258551",
      "title": "Marble Print Cut Out Bikini Swimsuit",
    },
    {
      "id": "sw2107208772632406",
      "title": "Minimalist Fold Small Wallet",
    },
    {
      "id": "sw2211224038818767",
      "title": "Lace Up Front Bikini Swimsuit",
    },
    {
      "id": "sw2210111661244741",
      "title": "SHEIN BAE Twist Front Plunging Neck Sequin Bodycon Dress",
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
  "items": [
    {
      "id": "sw2107233218917187",
      "title": "SHEIN X NOOR BREICH Graphic Print Off Shoulder Sweatshirt Dress",
    },
    {
      "id": "sw2207121871730551",
      "title": "SHEIN BAE Double Breasted Velvet Blazer Dress",
    },
    {
      "id": "sw2212233273850468",
      "title": "Ruffle Trim Lapel Collar Blazer Dress",
    },
    {
      "id": "sw2209280191141516",
      "title": "SHEIN BIZwear Lapel Neck Belted Blazer Dress",
    },
    {
      "id": "sw2212020605675650",
      "title": "Double Breasted Ruffle Hem Blazer Dress",
    },
    {
      "id": "sw2208182548011183",
      "title": "SHEIN BIZwear Lantern Sleeve Double Breasted Blazer Dress",
    },
    {
      "id": "sf2211014970364336",
      "title": "EMERY ROSE Plus Leopard Heart Print Drop Shoulder Hoodie Dress",
    },
    {
      "id": "sw2106281167130106",
      "title": "SHEIN X Robyn Nichole Plus Double Button Trumpet Sleeve Asymmetrical Hem Blazer Dress",
    },
    {
      "id": "sk2207184349303949",
      "title": "SHEIN X courtnaysketches Toddler Girls Cartoon Graphic 2 In 1 Plaid Sweatshirt Dress",
    },
    {
      "id": "sw2208125185388242",
      "title": "SHEIN X GOD.like Contrast Stitch Double Breasted Belted Blazer Dress",
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
  "items": [
    {
      "id": "swtwop07210525231",
      "title": "SHEIN X Penelope Ping Distressed Knit Top & Knit Pants",
    },
    {
      "id": "sw2209096328842182",
      "title": "SHEIN X Felicity Colorblock Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2211253265659049",
      "title": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "st2209085111167000",
      "title": "Men Contrast Panel Drawstring Waist Sports Pants",
    },
    {
      "id": "sf2206168053382509",
      "title": "SHEIN X ChiChi Brewer Plus High Waist Foldover Detail Flap Pocket Side Pants",
    },
    {
      "id": "sw2209232637613077",
      "title": "SHEIN EZwear Flap Pocket Cargo Pants Without Belt",
    },
    {
      "id": "sw2210201028814719",
      "title": "SHEINNeu Elastic Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2210277625174760",
      "title": "SHEIN MOD Solid Drawstring Hem Cargo Pants",
    },
    {
      "id": "sw2212032507477872",
      "title": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "st2203314334176054",
      "title": "Men Slogan Graphic Sports Pants",
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
  "items": [
    {
      "id": "sw2211254891201015",
      "title": "Contrast Leopard Belted Shirt Dress",
    },
    {
      "id": "sw2211211033100249",
      "title": "Striped Print Shirt Dress",
    },
    {
      "id": "sw2211140602431112",
      "title": "Allover Letter Graphic Shirt Dress",
    },
    {
      "id": "sw2112023943513565",
      "title": "Button Front Ruched Front Dress",
    },
    {
      "id": "sw2211172092940210",
      "title": "Brush Print Belted Dress",
    },
    {
      "id": "sw2211262304218224",
      "title": "Solid Half Button Shirt Dress Without Belt",
    },
    {
      "id": "sw2212108266462626",
      "title": "Plaid Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211183575102275",
      "title": "Brush Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211143700393052",
      "title": "Brush Print Belted Shirt Dress",
    },
    {
      "id": "sw2204061125120271",
      "title": "DAZY Drop Shoulder Button Front Shirt Dress",
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
  "items": [
    {
      "id": "sw2209017474592348",
      "title": "SHEIN X FRIDAY CANDY Double Breasted Fringe Trim Blazer Dress",
    },
    {
      "id": "si2209230086488789",
      "title": "Plus Contrast Lace Cami Nightdress",
    },
    {
      "id": "swlounge03201223960",
      "title": "Plus Floral Print Ruffle Hem Satin Cami Night Dress",
    },
    {
      "id": "si2211261663223337",
      "title": "SHEIN FIT+ Plus Lace Trim Satin Slips",
    },
    {
      "id": "si2212160933894151",
      "title": "Contrast Lace Satin Cami Nightdress & Belted Robe",
    },
    {
      "id": "si2212010219804014",
      "title": "Plus Floral Print Satin Cami Nightdress",
    },
    {
      "id": "si2212167713112242",
      "title": "Plus Floral Print Satin Cami Nightdress",
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
  "items": [],
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
  "items": [
    {
      "id": "sx2210309913993130",
      "title": "Lace-up Front Canvas Shoes",
    },
    {
      "id": "st2209085111167000",
      "title": "Men Contrast Panel Drawstring Waist Sports Pants",
    },
    {
      "id": "st2205246816951991",
      "title": "Sports Camo Print Half-finger Gloves",
    },
    {
      "id": "st2203314334176054",
      "title": "Men Slogan Graphic Sports Pants",
    },
    {
      "id": "sx2212151636117740",
      "title": "Women Colorblock Lace-up Front Casual Shoes Outdoor Skate Shoes",
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
  "items": [],
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
  "items": [
    {
      "id": "st2212171208410205",
      "title": "VUTRU Shirred Waist Phone Pocket Sports Skort",
    },
    {
      "id": "st2205218087584437",
      "title": "VUTRU Wide Waistband Sports Skort With Phone Pocket",
    },
    {
      "id": "sw2205143124281587",
      "title": "High Waist Tie Front Shorts",
    },
    {
      "id": "sw2211252580582072",
      "title": "High Waist Button Detail Wrap Skort",
    },
    {
      "id": "sw2106260372009523",
      "title": "Wide Waistband Pleated Sports Skort",
    },
    {
      "id": "st2202231536139166",
      "title": "VUTRU Wide Waistband Solid Sports Skort",
    },
    {
      "id": "st2111175825524222",
      "title": "Breathable Pleated Hem High Waist Sports Skirt",
    },
    {
      "id": "s180828220266412",
      "title": "SHEIN Unity Wrap Solid Knot Shorts",
    },
    {
      "id": "st2208176365311633",
      "title": "High Waist Phone Pocket Ruffle Sports Skort",
    },
    {
      "id": "st2208235652399446",
      "title": "VUTRU Elastic Waist Sports Skort",
    },
  ],
}
`)
  })

  it('returns a match when a item ID is passed', async () => {
    const matchedProducts = await searchProducts({
      id: 'sw2208248101173885',
      color: 'white',
      style: 'casual',
    })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "items": [
    {
      "id": "sw2208248101173885",
      "title": "LOONEY TUNES X SHEIN Pinstriped & Cartoon Graphic Drop Shoulder Curved Hem Shirt Dress",
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
  "items": [],
}
`)
  })
})
