import { buildProductSearch } from './products'

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
