#!/usr/bin/env node

import { resolve } from 'path'
import readline from 'readline/promises'
import OpenAI from 'openai'
import colors from 'colors/safe'
import { loadEnvConfig } from '@next/env'
import { chat } from '../src/ai/assistant'
import { readJsonSync } from 'fs-extra'
import type { SheinProduct } from '@/data/types'

const PRODUCTS_PATH = resolve(__dirname, '../src/data/products.json')
const PRODUCTS = readJsonSync(PRODUCTS_PATH) as Record<string, SheinProduct>

loadEnvConfig(resolve(__dirname, '../'))

const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

// simulating the API "backend"
const getProducts = (skuIds: string[]) => {
  return skuIds.map((skuId) => PRODUCTS[skuId])
}

// simulating the "frontend"
const displayProductsUi = (skuIds: string[], tokenizedMessage: string) => {
  const productsUi = tokenizedMessage.replace(
    PRODUCTS_LIST_TOKEN,
    getProducts(skuIds)
      .map((product) => {
        const displayName = colors.yellow(product.name)
        const displayPrice = colors.green(`\$${product.price.toFixed(2)}`)
        const displayId = colors.gray(`(${product.skuId})`)
        const displayUrl = colors.cyan(product.url)

        return `- ${displayName}: ${displayPrice} ${displayId}\n  ${displayUrl}`
      })
      .join('\n\n'),
  )

  console.log(`\n${colors.yellow(productsUi)}\n`)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const questionAnswer = async (
  messages?: OpenAI.ChatCompletionMessageParam[],
): Promise<void> => {
  const lastMessage = messages?.[messages.length - 1]?.content

  // An empty message ends the conversation
  if (lastMessage === '') {
    return
  }

  const {
    messages: newMessages,
    skuIds,
    tokenizedMessage,
  } = await chat({ messages })

  if (tokenizedMessage) {
    displayProductsUi(skuIds, tokenizedMessage)

    const userContent = await rl.question('> ')

    console.log('\nSearching...\n')

    await questionAnswer([
      ...newMessages,
      { role: 'user', content: userContent },
    ])
  }
}

const main = async () => {
  await questionAnswer()

  console.log(`\n\n${colors.cyan('Thanks for using Shein Assistant!')}`)
  process.exit(0)
}

main()
