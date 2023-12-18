#!/usr/bin/env node

import { resolve } from 'path'
import readline from 'readline/promises'
import OpenAI from 'openai'
import colors from 'colors/safe'
import { chat } from '../src/ai/assistant'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(resolve(__dirname, '../'))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const questionAnswer = async (
  messages?: OpenAI.ChatCompletionMessageParam[],
): Promise<void> => {
  const lastMessage = messages?.[messages.length - 1]?.content

  if (lastMessage === '') {
    return
  }

  const newMessages = await chat({ messages })
  const newLastMessage = newMessages[newMessages.length - 1]

  if (newLastMessage.role === 'assistant' && newLastMessage.content) {
    console.log('\n', colors.yellow(newLastMessage.content), '\n')

    const userContent = await rl.question('> ')

    await questionAnswer([
      ...newMessages,
      { role: 'user', content: userContent },
    ])
  }
}

const main = async () => {
  await questionAnswer()

  console.log('\n\n', colors.cyan('Thanks for using Shein Assistant!'))
  process.exit(0)
}

main()
