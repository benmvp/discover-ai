import { createReadStream, writeJson } from 'fs-extra'
import { resolve } from 'path'
import { parse } from 'csv-parse'
import { VALID_META_PROPS } from '../src/app/api/clothing/constants'
import { ItemId } from '@/app/items/types'
import { SheinProduct } from '@/app/api/clothing/products'

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

type SheinProducts = Record<ItemId, SheinProduct>

// to take a random XXXXX number products from `raw-data/shein-all.csv`, run:
// { head -n 1 ./raw-data/shein-all.csv; tail -n +2 ./raw-data/shein-all.csv | shuf -n XXXXX; } > ./raw-data/shein-XXXXX.csv
export const DATA_NAME = `shein-${process.argv[2] || '25000'}`
const SOURCE_RAW_DATA_PATH = resolve(
  process.cwd(),
  'raw-data/shein',
  `${DATA_NAME}.csv`,
)
const DESTINATION_DATA_PATH = resolve(
  process.cwd(),
  'src/app/data/shein-products.json',
)

const CSV_PARSER = parse({
  columns: true,
  delimiter: ';',
  skipEmptyLines: true,
})

const standardizeMetaPropValue = (propName: string, propValue: string) => {
  let values = propValue.split(',').map((value) => value.trim())

  if (propName === 'Composition') {
    values = values.map((material) => material.replace(/[0-9.]+%/g, '').trim())
  }

  return values.sort()
}

const standardizeMeta = (meta: SheinProduct['meta']) => {
  return Object.fromEntries(
    Object.entries(meta)
      .filter(([propName]) => VALID_META_PROPS.has(propName))
      .map(([propName, propValue]) =>
        standardizeMetaPropValue(propName, propValue).map((value) => [
          propName,
          value,
        ]),
      )
      .flat(),
  )
}

const standardizeRecord = (record: SheinCsvRecord): SheinProduct => {
  const { brand, description, images, name, price, sku, url } = record
  const properties = eval(description) as { [key: string]: string }[]

  const meta = properties.reduce(
    (metaInProgress, subProperties) => ({
      ...metaInProgress,
      ...standardizeMeta(subProperties),
    }),
    {},
  )

  return {
    brand,

    // grab the last image which is actually the first/primary image on the PDP
    imageUrl: (eval(images) as string[]).at(-1) || '',

    meta,
    title: name,
    price: Number(price.replace('$', '')),
    id: sku.replace('SKU:', '').trim(),
    url,
  }
}

const main = async () => {
  console.log('Standardizing Shein data...')

  const parser = createReadStream(SOURCE_RAW_DATA_PATH).pipe(CSV_PARSER)
  const products: SheinProducts = {}

  for await (const rec of parser) {
    const record = rec as SheinCsvRecord
    const product = standardizeRecord(record)

    products[product.id] = product
  }

  await writeJson(DESTINATION_DATA_PATH, products, { spaces: 2 })

  console.log('Shein products data written to:', DESTINATION_DATA_PATH)
}

main()
