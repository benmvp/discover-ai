import type { AssistantMessage, AssistantType, Message } from '@/app/types'
import type { ProcessMessages } from '../ai/types'
import { chat } from '@/app/ai/chat'
import type { ChatOptions } from '../ai/types'
import {
  createAssistantMessage,
  isAssistantMessage,
  isFunctionCallMessage,
} from '@/app/utils'
// uncomment to use mock data
// import { getMockStream } from './mocks'
import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ItemExtendedMessage,
  Item,
  FilterParameters,
} from '@/app/items/types'
import { isParsedAssistantMessage } from '@/app/items/utils'
import { addItemsToMessages, parseRecommendedItemIds } from './items'

interface RequestJson {
  assistantType: AssistantType
  history: Message[]
  userPrompt: string
}

const getRequest = async (req: Request): Promise<RequestJson> => {
  return req.json()
}

const processAssistantMessageChunk = (
  assistantMessage: AssistantMessage,
  itemIdRegex: RegExp,
): AssistantMessage => {
  const parsedContent = parseRecommendedItemIds(
    assistantMessage.content,
    itemIdRegex,
  )
  const parsedAssistantMessage: ParsedAssistantMessage = {
    ...assistantMessage,
    filter: null,
    parsedContent,
  }

  return parsedAssistantMessage
}

interface BuilderOptions {
  /**
   * Gets the items for the given Item IDs
   */
  getItems: (itemIds: string[]) => Promise<Item[]>

  /**
   * The regex to use to extract the Item IDs from the message content
   */
  itemIdRegex: RegExp

  /**
   * The name of the search function that was called by the assistant
   */
  searchFunctionName: string
}

const buildProcessMessages = ({
  getItems,
  itemIdRegex,
  searchFunctionName,
}: BuilderOptions): ProcessMessages => {
  const processMessages = async (
    rawMessages: Message[],
    shouldGetItems = true,
  ): Promise<ItemExtendedMessage[]> => {
    const messages = rawMessages.map((rawMessage, index): ExtendedMessage => {
      if (!isAssistantMessage(rawMessage)) {
        return rawMessage
      }

      const message = processAssistantMessageChunk(rawMessage, itemIdRegex)

      if (!isParsedAssistantMessage(message)) {
        return message
      }

      // We need to find the most recent function call message prior to this
      // message that has the Item IDs. This will be the search function call
      // message that will have the filter parameters that we want to associate
      // with this message.
      const priorRawMessages = rawMessages.slice(0, index)
      const potentialFunctionCallMessage = priorRawMessages.findLast(
        isFunctionCallMessage,
      )
      const filterParams: FilterParameters | undefined =
        potentialFunctionCallMessage &&
        // Get the arguments for the search function call. We choose the last one
        // since that'll be the last set of suggestions shown in the conversation.
        potentialFunctionCallMessage.calls.findLast(
          (call) => call.name === searchFunctionName,
        )?.arguments

      return {
        ...message,
        filter: filterParams,
      }
    })

    // add `items` property to each of the assistant
    return shouldGetItems ? addItemsToMessages(messages, getItems) : messages
  }

  return processMessages
}

/**
 * Creates a readable stream processing the messages provided
 */
const getReadableStream = (
  processMessages: ProcessMessages,
  messages: Message[],
) => {
  const stream = new ReadableStream<string>({
    start(controller) {
      processMessages(messages).then((newMessages) => {
        controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
        controller.close()
      })
    },
  })

  return stream
}

interface BuildPostRouteOptions extends BuilderOptions {
  assistantPrompt: string
  functionDeclarations: ChatOptions['functionDeclarations']
  mockMessages?: Message[]
  systemInstruction: ChatOptions['systemInstruction']
}

export const buildPostRoute = ({
  assistantPrompt,
  getItems,
  functionDeclarations,
  itemIdRegex,
  mockMessages,
  searchFunctionName,
  systemInstruction,
}: BuildPostRouteOptions) => {
  const postRoute = async (req: Request) => {
    const { assistantType, history, userPrompt } = await getRequest(req)

    if (!Array.isArray(history)) {
      return new Response('Invalid `history` JSON', { status: 400 })
    }

    const processMessages = buildProcessMessages({
      getItems,
      itemIdRegex,
      searchFunctionName,
    })

    // Uses mock data if provided
    if (mockMessages) {
      return new Response(
        getReadableStream(processMessages, [
          createAssistantMessage(assistantPrompt),
          ...mockMessages,
        ]),
      )
    }

    // If there are no messages or no user prompt starting the conversation,
    // stream the initial messages
    if (history.length === 0 || !userPrompt) {
      return new Response(
        getReadableStream(processMessages, [
          createAssistantMessage(assistantPrompt),
        ]),
      )
    }
    const chatStream = await chat({
      assistantType,
      history,
      userPrompt,
      processMessages,
      systemInstruction,
      functionDeclarations,
    })

    return new Response(chatStream)
  }

  return postRoute
}
