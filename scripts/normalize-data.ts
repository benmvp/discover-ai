import { createReadStream, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { parse } from 'csv-parse'
import type { SheinProduct, SheinProducts } from '@/data/types'

interface SheinCsvRecord {
  brand: string
  description: string
  images: string
  name: string
  price: string
  sku: string
  size: string
  url: string
}

// to take a random XXXXX number products from `raw-data/shein-all.csv`, run:
// { head -n 1 ./raw-data/shein-all.csv; tail -n +2 ./raw-data/shein-all.csv | shuf -n XXXXX; } > ./raw-data/shein-XXXXX.csv
export const DATA_NAME = `shein-${process.argv[2] || '25000'}`
const SOURCE_RAW_DATA_PATH = resolve(
  __dirname,
  '../raw-data',
  `${DATA_NAME}.csv`,
)
const DESTINATION_DATA_PATH = resolve(__dirname, '../src/data/products.json')

const CSV_PARSER = parse({
  columns: true,
  delimiter: ';',
  skipEmptyLines: true,
})

const VALID_META_PROPS = new Set([
  'Bottom Type',
  'Bra Type',
  'Closure Type',
  'Color',
  'Composition',
  'Details',
  'Fabric',
  'Fit Type',
  'Length',
  'Material',
  'Neckline',
  'Pattern Type',
  'Pockets',
  'Sleeve Length',
  'Sleeve Type',
  'Style',
  'Top Type',
  'Type',
  'Waist Line',
])

const normalizeMetaPropValue = (propName: string, propValue: string) => {
  let values = propValue.split(',').map((value) => value.trim())

  if (propName === 'Composition') {
    values = values.map((material) => material.replace(/[0-9.]+%/g, '').trim())
  }

  return values.sort()
}

const normalizeMeta = (meta: SheinProduct['meta']) => {
  return Object.fromEntries(
    Object.entries(meta)
      .filter(([propName]) => VALID_META_PROPS.has(propName))
      .map(([propName, propValue]) =>
        normalizeMetaPropValue(propName, propValue).map((value) => [
          propName,
          value,
        ]),
      )
      .flat(),
  )
}

const normalizeRecord = (record: SheinCsvRecord): SheinProduct => {
  const { brand, description, images, name, price, sku, url } = record
  const properties = eval(description) as { [key: string]: string }[]

  const meta = properties.reduce(
    (metaInProgress, subProperties) => ({
      ...metaInProgress,
      ...normalizeMeta(subProperties),
    }),
    {},
  )

  return {
    brand,
    image: (eval(images) as string[]).at(-1) || '',
    meta,
    name,
    price: Number(price.replace('$', '')),
    skuId: sku.replace('SKU:', '').trim(),
    url,
  }
}

const main = async () => {
  console.log('Normalizing data...')

  const parser = createReadStream(SOURCE_RAW_DATA_PATH).pipe(CSV_PARSER)
  const products: SheinProducts = {}

  for await (const rec of parser) {
    const record = rec as SheinCsvRecord
    const product = normalizeRecord(record)

    products[product.skuId] = product
  }

  await writeJson(DESTINATION_DATA_PATH, products, { spaces: 2 })

  console.log('Products data written to:', DESTINATION_DATA_PATH)
}

main()
