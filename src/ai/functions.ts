import { resolve } from 'path'
import { readJsonSync } from 'fs-extra'
import type { ChatCompletionCreateParams } from 'openai/resources/chat'

export type SheinMetaLookup = Record<string, string[]>

export const DATA_NAME = 'shein-5000'
export const DATA_LOOKUP_PATH = resolve(
  __dirname,
  '../data',
  `${DATA_NAME}-lookup.json`,
)

const DATA_LOOKUP = readJsonSync(DATA_LOOKUP_PATH) as SheinMetaLookup

export const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'getProducts',
    description: 'Gets matching products',
    parameters: {
      type: 'object',
      properties: Object.fromEntries(
        Object.entries(DATA_LOOKUP).map(([propName, propValues]) => [
          propName,
          {
            type: 'string',
            enum: propValues,
          },
        ]),
      ),
    },
  },
]
