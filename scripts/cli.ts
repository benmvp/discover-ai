#!/usr/bin/env node

import { resolve } from 'path'
import { chat } from '../src/ai/assistant'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(resolve(__dirname, '../'))

const main = async () => {
  await chat({
    messages: [
      {
        role: 'user',
        content:
          'I am looking for some inexpensive leggings that I can wear while working out.',
      },
    ],
  })
}

main()
