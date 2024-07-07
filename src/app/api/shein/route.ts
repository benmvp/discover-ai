import { chat } from '@/ai/assistant'
import type { AssistantMessage, Message } from '@/ai/types'
import { isAssistantMessage, isFunctionCallMessage } from '@/ai/utils'
import { getMessagesFromRequest } from '../utils'
import {
  ASSISTANT_PROMPT,
  SEARCH_FUNCTION_NAME,
  SYSTEM_INSTRUCTION,
} from './constants'
import { FUNCTION_DECLARATIONS } from './functions'
// uncomment to use mock data
// import { MOCK_MESSAGES } from './constants.mocks'
import { addProductsToMessages, parseRecommendedSkuIds } from './products'
import type {
  ExtendedMessage,
  ProductExtendedMessage,
  ProductFilterParams,
} from '../../shein/types'
import { isParsedAssistantMessage } from '@/app/shein/utils'

const processAssistantMessageChunk = (
  assistantMessage: AssistantMessage,
): ExtendedMessage => {
  if (!isAssistantMessage(assistantMessage)) {
    return assistantMessage
  }

  const { skuIds, tokenizedContent } = parseRecommendedSkuIds(
    assistantMessage.content,
  )

  return {
    ...assistantMessage,
    filter: null,
    skuIds,
    tokenizedContent,
  }
}

const processMessages = async (
  rawMessages: Message[],
): Promise<ProductExtendedMessage[]> => {
  const messages = rawMessages.map((rawMessage, index): ExtendedMessage => {
    if (!isAssistantMessage(rawMessage)) {
      return rawMessage
    }

    const message = processAssistantMessageChunk(rawMessage)

    if (!isParsedAssistantMessage(message)) {
      return message
    }

    // the message 2 before the current one should be the function call if this
    // one is the assistant response with the SKUs. if so, parse the filter
    // params from that function call so we can include it with the extended
    // message
    const potentialFunctionCallMessage = rawMessages[index - 2]
    const filterParams: ProductFilterParams | null =
      potentialFunctionCallMessage &&
      isFunctionCallMessage(potentialFunctionCallMessage) &&
      potentialFunctionCallMessage.name === SEARCH_FUNCTION_NAME
        ? potentialFunctionCallMessage.arguments
        : null

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
  // uncomment to use mock data
  // const messages = MOCK_MESSAGES

  if (!Array.isArray(messages)) {
    return new Response('Invalid `messages` JSON', { status: 400 })
  }

  // TODO create a helper function to return a mock chat stream to avoid making
  // the AI API call (similar to `getInitialReadableStream` in `openai/assistant.ts`)

  const chatStream = chat({
    assistantType: 'openai',
    messages,
    processAssistantMessageChunk,
    processMessages,
    systemInstruction: SYSTEM_INSTRUCTION,
    assistantPrompt: ASSISTANT_PROMPT,
    functionDeclarations: FUNCTION_DECLARATIONS,
  })

  return new Response(chatStream)
}
