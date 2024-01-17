#!/usr/bin/env node

import { resolve } from 'path'
import readline from 'readline/promises'
import colors from 'colors/safe'
import { loadEnvConfig } from '@next/env'
import { isParsedAssistantMessage } from '../src/app/utils'
import { chat } from '../src/app/ai/assistant'
import { getProducts } from '../src/app/ai/products'
import type {
  ProductExtendedChatCompletionMessageParam,
  ParsedChatCompletionAssistantMessageParam,
} from '@/app/types'

loadEnvConfig(resolve(__dirname, '../'))

const PRODUCTS_LIST_TOKEN = '[PRODUCTS_LIST_HERE]'

// simulating the "frontend"
const displayProductsUi = (
  assistantMessage: ParsedChatCompletionAssistantMessageParam,
) => {
  const productsUi = assistantMessage.tokenizedContent.replace(
    PRODUCTS_LIST_TOKEN,
    getProducts(assistantMessage.skuIds)
      .map((product) => {
        const displayName = colors.yellow(product.name)
        const displayPrice = colors.green(`\$${product.price.toFixed(2)}`)
        const displayId = colors.gray(`(${product.skuId})`)
        const displayUrl = colors.cyan(product.url)

        return `- ${displayName}: ${displayPrice} ${displayId}\n  ${displayUrl}`
      })
      .join('\n\n'),
  )

  if (assistantMessage.filter) {
    console.log(
      colors.gray(`filtered by ${JSON.stringify(assistantMessage.filter)}`),
    )
  }

  console.log(`\n${colors.yellow(productsUi)}\n`)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const questionAnswer = async (
  messages?: ProductExtendedChatCompletionMessageParam[],
): Promise<void> => {
  const lastMessage = messages?.[messages.length - 1]?.content

  // An empty message ends the conversation
  if (lastMessage === '') {
    return
  }

  // get new chat response (assistant message) based on the newly added user message
  const responseMessages = await chat(messages)

  const lastResponseMessage = responseMessages[responseMessages.length - 1]

  if (isParsedAssistantMessage(lastResponseMessage)) {
    displayProductsUi(lastResponseMessage)

    // wait for user input
    const userContent = await rl.question('> ')

    console.log('\nSearching...\n')

    // recursively call `questionAnswer` with the new user message from stdin
    await questionAnswer([
      ...responseMessages,
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
