import { buildProductSearch } from './products'

describe('searchProducts', () => {
  const searchProducts = buildProductSearch(false)

  it('returns matches for color', async () => {
    const matchedProducts = await searchProducts({ color: 'blue' })

    expect(matchedProducts).toMatchInlineSnapshot(`
{
  "items": [
    {
      "id": "sk2207073469103373",
      "price": 11.5,
      "title": "SHEIN X blue Girls Slant Pocket Pants",
    },
    {
      "id": "sk2207221300841168",
      "price": 23,
      "title": "SHEIN X blue Girls Graphic Print Quilted Coat",
    },
    {
      "id": "sk2207079227524393",
      "price": 13,
      "title": "SHEIN X blue Girls Slogan Graphic Drop Shoulder Pullover",
    },
    {
      "id": "sk2207071162016112",
      "price": 10,
      "title": "SHEIN X blue Girls Colorblock & Cartoon Graphic Drop Shoulder Sweatshirt",
    },
    {
      "id": "sc2208102889135571",
      "price": 5.1,
      "title": "Geometric Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sc2211064774707599",
      "price": 5.9,
      "title": "Cat Eye Anti-blue Light Eyeglasses",
    },
    {
      "id": "sc2212293481640002",
      "price": 6.2,
      "title": "Square Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sc2209216236762550",
      "price": 4.7,
      "title": "Square Frame Anti-Blue Light Eyeglasses",
    },
    {
      "id": "sw2112035015446803",
      "price": 19.99,
      "title": "Ditsy Floral Print Ruffle Hem Dress",
    },
    {
      "id": "sw2111295297261241",
      "price": 18,
      "title": "Floral Print Puff Sleeve Ruched Split Thigh Bustier Dress",
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
      "id": "sw2212150723822626",
      "price": 15,
      "title": "SHEIN X Dress Codez Slogan Graphic Drop Shoulder Oversize Tee",
    },
    {
      "id": "sw2212233273850468",
      "price": 28.49,
      "title": "Ruffle Trim Lapel Collar Blazer Dress",
    },
    {
      "id": "sw2212020605675650",
      "price": 17.49,
      "title": "Double Breasted Ruffle Hem Blazer Dress",
    },
    {
      "id": "sw2209094647535768",
      "price": 69.99,
      "title": "MOTF PREMIUM VISCOSE-BLEND BLAZER DRESS",
    },
    {
      "id": "sw2212232164448114",
      "price": 30.49,
      "title": "Lapel Neck Rhinestone Trim Blazer Dress",
    },
    {
      "id": "sw2210163770150018",
      "price": 14.99,
      "title": "Solid Bishop Sleeve Drawstring Hoodie Dress",
    },
    {
      "id": "sw2207121871730551",
      "price": 20,
      "title": "SHEIN BAE Double Breasted Velvet Blazer Dress",
    },
    {
      "id": "sw2209280191141516",
      "price": 18.75,
      "title": "SHEIN BIZwear Lapel Neck Belted Blazer Dress",
    },
    {
      "id": "sw2208182548011183",
      "price": 24.99,
      "title": "SHEIN BIZwear Lantern Sleeve Double Breasted Blazer Dress",
    },
    {
      "id": "sw2207210463024422",
      "price": 33.99,
      "title": "SHEIN Unity Lapel Neck Flap Detail Blazer Dress",
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
      "price": 13.75,
      "title": "SHEIN X Penelope Ping Distressed Knit Top & Knit Pants",
    },
    {
      "id": "st2203314334176054",
      "price": 11.99,
      "title": "Men Slogan Graphic Sports Pants",
    },
    {
      "id": "st2112076684666046",
      "price": 11.99,
      "title": "Men Letter Graphic Sports Pants",
    },
    {
      "id": "st2211096620617066",
      "price": 9.49,
      "title": "Men Drawstring Waist Sports Pants",
    },
    {
      "id": "st2210178213241619",
      "price": 9.88,
      "title": "Men Drawstring Waist Sports Pants",
    },
    {
      "id": "sw2211304171465643",
      "price": 13.49,
      "title": "Solid Patched Pocket Cargo Pants",
    },
    {
      "id": "sw2211253265659049",
      "price": 14.99,
      "title": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2212032507477872",
      "price": 8.25,
      "title": "Drawstring Waist Flap Pocket Cargo Pants",
    },
    {
      "id": "sw2212055833273271",
      "price": 13.49,
      "title": "Solid Flap Pocket Side Cargo Pants",
    },
    {
      "id": "st2209085111167000",
      "price": 11.49,
      "title": "Men Contrast Panel Drawstring Waist Sports Pants",
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
      "id": "sw2212108266462626",
      "price": 16.99,
      "title": "Plaid Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211183575102275",
      "price": 14.99,
      "title": "Brush Print Batwing Sleeve Belted Shirt Dress",
    },
    {
      "id": "sw2211211033100249",
      "price": 11.99,
      "title": "Striped Print Shirt Dress",
    },
    {
      "id": "sw2211254891201015",
      "price": 14.49,
      "title": "Contrast Leopard Belted Shirt Dress",
    },
    {
      "id": "sw2211140602431112",
      "price": 14.49,
      "title": "Allover Letter Graphic Shirt Dress",
    },
    {
      "id": "sw2211262304218224",
      "price": 15.49,
      "title": "Solid Half Button Shirt Dress Without Belt",
    },
    {
      "id": "sw2211143700393052",
      "price": 15.49,
      "title": "Brush Print Belted Shirt Dress",
    },
    {
      "id": "sw2110182034855490",
      "price": 18.99,
      "title": "Lantern Sleeve Flap Detail Shirt Dress Without Belt",
    },
    {
      "id": "sw2111122032336444",
      "price": 18,
      "title": "Letter Graphic Lantern Sleeve Shirred Shirt Dress",
    },
    {
      "id": "sw2207049607919140",
      "price": 17,
      "title": "Allover Letter Graphic Contrast Mesh Bishop Sleeve Belted Shirt Dress",
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
      "id": "sw2107210728304149",
      "price": 12.75,
      "title": "SHEIN X Black Sheep Allover Floral Print Pocket Patched Shirt Dress Without Belt",
    },
    {
      "id": "sw2209017474592348",
      "price": 22.25,
      "title": "SHEIN X FRIDAY CANDY Double Breasted Fringe Trim Blazer Dress",
    },
    {
      "id": "swlounge03201223960",
      "price": 6.49,
      "title": "Plus Floral Print Ruffle Hem Satin Cami Night Dress",
    },
    {
      "id": "si2209230086488789",
      "price": 9.99,
      "title": "Plus Contrast Lace Cami Nightdress",
    },
    {
      "id": "si2211261663223337",
      "price": 11.49,
      "title": "SHEIN FIT+ Plus Lace Trim Satin Slips",
    },
    {
      "id": "si2212160933894151",
      "price": 15.99,
      "title": "Contrast Lace Satin Cami Nightdress & Belted Robe",
    },
    {
      "id": "si2212010219804014",
      "price": 7.99,
      "title": "Plus Floral Print Satin Cami Nightdress",
    },
    {
      "id": "si2212167713112242",
      "price": 5,
      "title": "Plus Floral Print Satin Cami Nightdress",
    },
    {
      "id": "sw2205264466719129",
      "price": 19.49,
      "title": "Pleated Belted Dress",
    },
    {
      "id": "sw2204117427276271",
      "price": 7,
      "title": "SHEIN Unity Drop Shoulder Lettuce Trim Mesh Dress Without Cami Dress",
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
  "items": [
    {
      "id": "sw2211238018901176",
      "price": 10,
      "title": "SHEIN Frenchy High Waist Flare Leg Pants",
    },
    {
      "id": "sw2211011811178955",
      "price": 15,
      "title": "High Waist Glitter Wide Leg Pants",
    },
    {
      "id": "sw2208153916525121",
      "price": 20,
      "title": "SHEIN X GOD.like High Waist Topstitching Pants",
    },
    {
      "id": "sw2107138820617896",
      "price": 14.49,
      "title": "SHEIN Unity Plus Solid High Waist Pants",
    },
    {
      "id": "sw2211161621817717",
      "price": 22.49,
      "title": "DAZY High Waist Pocket Patched Pants",
    },
    {
      "id": "sw2212221604066282",
      "price": 20.99,
      "title": "DAZY High Waist Plicated Detail Pants",
    },
    {
      "id": "sw2201178811378137",
      "price": 9,
      "title": "SHEIN Unity Solid Knot Front Pants",
    },
    {
      "id": "sw2112104807506499",
      "price": 11.49,
      "title": "SHEIN Unity Solid Slant Pocket Skinny Pants",
    },
    {
      "id": "sS2106170092965576",
      "price": 15.99,
      "title": "SHEIN Unity Plus Solid Flare Leg Pants",
    },
    {
      "id": "sf2208199889480676",
      "price": 15.75,
      "title": "SHEIN X mia Plus Slant Pocket Belted Pants",
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
  "items": [
    {
      "id": "st2206125463322257",
      "price": 16.49,
      "title": "Solid Raglan Sleeve Sport Tee & Leggings Set",
    },
    {
      "id": "sw2107218851252425",
      "price": 9,
      "title": "Neon Green Raglan Sleeve Sports Tee With Thumb Holes",
    },
    {
      "id": "st2205246816951991",
      "price": 4.4,
      "title": "Sports Camo Print Half-finger Gloves",
    },
    {
      "id": "st2203314334176054",
      "price": 11.99,
      "title": "Men Slogan Graphic Sports Pants",
    },
    {
      "id": "st2209085111167000",
      "price": 11.49,
      "title": "Men Contrast Panel Drawstring Waist Sports Pants",
    },
    {
      "id": "sx2210309913993130",
      "price": 20.9,
      "title": "Lace-up Front Canvas Shoes",
    },
    {
      "id": "sw2108160193355008",
      "price": 16.49,
      "title": "High Stretch Seamless Camo Cut Sports Top & Wide Band Waist Sports Leggings",
    },
    {
      "id": "st2205197731209239",
      "price": 5.49,
      "title": "Wide Waistband Sports Shorts",
    },
    {
      "id": "st2212025843225235",
      "price": 9,
      "title": "Solid Racer Back Sports Bra",
    },
    {
      "id": "st2110187644777352",
      "price": 11.99,
      "title": "Seamless Tie Dye Sports Leggings",
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
  "items": [
    {
      "id": "sw2106198644589565",
      "price": 9.75,
      "title": "SHEINNeu High Waist Striped Pattern Pocket Front Shorts",
    },
    {
      "id": "sw2202149931996619",
      "price": 10,
      "title": "SHEIN BIZwear Asymmetrical Waist Slant Pocket Shorts",
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
  "items": [
    {
      "id": "sw2106260372009523",
      "price": 11.49,
      "title": "Wide Waistband Pleated Sports Skort",
    },
    {
      "id": "st2208235652399446",
      "price": 13.49,
      "title": "VUTRU Elastic Waist Sports Skort",
    },
    {
      "id": "st2206295651529832",
      "price": 8.49,
      "title": "Curved Hem Solid Sports Skort",
    },
    {
      "id": "st2203100087354196",
      "price": 9.49,
      "title": "Breathable Softness Flare Tennis Skort",
    },
    {
      "id": "sw2211252580582072",
      "price": 10.49,
      "title": "High Waist Button Detail Wrap Skort",
    },
    {
      "id": "st2202231536139166",
      "price": 13.49,
      "title": "VUTRU Wide Waistband Solid Sports Skort",
    },
    {
      "id": "st2212171208410205",
      "price": 11.49,
      "title": "VUTRU Shirred Waist Phone Pocket Sports Skort",
    },
    {
      "id": "st2208176365311633",
      "price": 8,
      "title": "High Waist Phone Pocket Ruffle Sports Skort",
    },
    {
      "id": "sw2205052488114580",
      "price": 8,
      "title": "SHEIN Dopamine Dressing Phone Pocket Detail Skort",
    },
    {
      "id": "st2205218087584437",
      "price": 13.49,
      "title": "VUTRU Wide Waistband Sports Skort With Phone Pocket",
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
      "price": 19,
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
