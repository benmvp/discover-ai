#!/usr/bin/env node

import { resolve } from 'path'
import readline from 'readline/promises'
import OpenAI from 'openai'
import colors from 'colors/safe'
import { loadEnvConfig } from '@next/env'
import { chat } from '../src/app/ai/assistant'
import { type ProductFilterParams, getProducts } from '../src/app/ai/products'

loadEnvConfig(resolve(__dirname, '../'))

const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

// simulating the "frontend"
const displayProductsUi = (
  skuIds: string[],
  tokenizedMessage: string,
  filter?: ProductFilterParams,
) => {
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

  if (filter) {
    console.log(colors.gray(`filtered by ${JSON.stringify(filter)}`))
  }

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
    filter,
    messages: newMessages,
    skuIds,
    tokenizedMessage,
  } = await chat({ messages })

  if (tokenizedMessage) {
    displayProductsUi(skuIds, tokenizedMessage, filter)

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
