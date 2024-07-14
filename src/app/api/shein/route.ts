import { chat } from '@/ai/chat'
import type { AssistantMessage, FunctionCallMessage, Message } from '@/ai/types'
import { isAssistantMessage, isFunctionCallMessage } from '@/ai/utils'
import { getRequest } from '../utils'
import {
  ASSISTANT_PROMPT,
  SEARCH_FUNCTION_NAME,
  SYSTEM_INSTRUCTION,
} from './constants'
import { FUNCTION_DECLARATIONS } from './functions'
// uncomment to use mock data
// import { getMockStream } from './mocks'
import { addProductsToMessages, parseRecommendedSkuIds } from './products'
import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ProductExtendedMessage,
  ProductFilterParams,
} from '../../shein/types'
import { isParsedAssistantMessage } from '@/app/shein/utils'

const processAssistantMessageChunk = (
  assistantMessage: AssistantMessage,
): AssistantMessage => {
  const { skuIds, tokenizedContent } = parseRecommendedSkuIds(
    assistantMessage.content,
  )
  const parsedAssistantMessage: ParsedAssistantMessage = {
    ...assistantMessage,
    filter: null,
    skuIds,
    tokenizedContent,
  }

  return parsedAssistantMessage
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

    // We need to find the most recent function call message prior to this
    // message that has the SKU IDs. This will be the search function call
    // message that will have the filter parameters that we want to associate
    // with this message.
    const priorRawMessages = rawMessages.slice(0, index)
    const potentialFunctionCallMessage = priorRawMessages.findLast(
      isFunctionCallMessage,
    )
    const filterParams: ProductFilterParams | undefined =
      potentialFunctionCallMessage &&
      // Get the arguments for the search function call. We choose the last one
      // since that'll be the last set of suggestions shown in the conversation.
      potentialFunctionCallMessage.calls.findLast(
        (call) => call.name === SEARCH_FUNCTION_NAME,
      )?.arguments

    return {
      ...message,
      filter: filterParams,
    }
  })

  // add `products` property to each of the assistant
  return addProductsToMessages(messages)
}

export const POST = async (req: Request) => {
  const { assistantType, history, userPrompt } = await getRequest(req)

  if (!Array.isArray(history)) {
    return new Response('Invalid `messages` JSON', { status: 400 })
  }

  const chatStream = await chat({
    assistantType,
    history,
    userPrompt,
    processAssistantMessageChunk,
    processMessages,
    systemInstruction: SYSTEM_INSTRUCTION,
    assistantPrompt: ASSISTANT_PROMPT,
    functionDeclarations: FUNCTION_DECLARATIONS,
  })

  // uncomment to use mock data
  // const chatStream = getMockStream(ASSISTANT_PROMPT)

  return new Response(chatStream)
}
