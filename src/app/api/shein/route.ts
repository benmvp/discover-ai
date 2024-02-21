import type OpenAI from 'openai'
import { chat } from '@/app/api/assistant'
import { isContentAssistantMessage } from '@/app/utils'
import { getMessagesFromRequest } from '../utils'
import {
  // INITIAL_MESSAGES,
  SEARCH_FUNCTION_NAME,
} from './constants'
import { TOOLS } from './tools'
// uncomment to use mock data and skip real AI API calls
import { MOCK_INITIAL_MESSAGES as INITIAL_MESSAGES } from './constants.mocks'
import { addProductsToMessages, parseRecommendedSkuIds } from './products'
import type {
  ExtendedChatCompletionMessageParam,
  ProductExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'

const processAssistantMessageChunk = (
  message: OpenAI.ChatCompletionMessageParam,
): ExtendedChatCompletionMessageParam => {
  if (!isContentAssistantMessage(message)) {
    return message
  }

  const { skuIds, tokenizedContent } = parseRecommendedSkuIds(
    message.content || '',
  )

  return {
    ...message,
    skuIds,
    tokenizedContent,
  }
}

const processMessages = async (
  rawMessages: OpenAI.ChatCompletionMessageParam[],
): Promise<ProductExtendedChatCompletionMessageParam[]> => {
  const messages = rawMessages.map((rawMessage, index) => {
    const message = processAssistantMessageChunk(rawMessage)

    // the message 2 before the current one should be the function call if this
    // one is the assistant response with the SKUs. if so, parse the filter
    // params from that function call so we can include it with the extended
    // message
    const potentialFunctionCallMessage = rawMessages[index - 2]
    let filterParams: ProductFilterParams | undefined

    if (potentialFunctionCallMessage?.role === 'assistant') {
      const searchToolCall = potentialFunctionCallMessage.tool_calls?.find(
        (call) => call.function.name === SEARCH_FUNCTION_NAME,
      )

      if (searchToolCall) {
        filterParams = JSON.parse(
          searchToolCall.function.arguments,
        ) as ProductFilterParams
      }
    }

    return {
      ...message,
      filter: filterParams,
    }
  })

  // add `products` property to each of the assistant
  return addProductsToMessages(messages)
}

export const POST = async (req: Request) => {
  const messages = await getMessagesFromRequest(req)

  if (!Array.isArray(messages)) {
    return new Response('Invalid `messages` JSON', { status: 400 })
  }

  const chatStream = chat({
    initialMessages: INITIAL_MESSAGES,
    messages,
    processAssistantMessageChunk,
    processMessages,
    tools: TOOLS,
  })

  return new Response(chatStream)
}
