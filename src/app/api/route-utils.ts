import type { AssistantType, FunctionDeclaration, Message } from '@/app/types'
import type { ProcessMessages } from '../ai/types'
import type { ChatOptions } from '../ai/types'
import { createAssistantMessage, isAssistantContentMessage } from '@/app/utils'
import type {
  ExtendedMessage,
  ParsedAssistantMessage,
  ItemExtendedMessage,
  Item,
} from '@/app/items/types'
import { addItemsToMessages, parseRecommendations } from './items'
import { chat } from '../ai/assistant'

interface RequestJson {
  assistantType: AssistantType
  history: Message[]
  userPrompt: string
}

const getRequest = async (req: Request): Promise<RequestJson> => {
  return req.json()
}

interface BuildPostRouteOptions {
  assistantPrompt: string
  functionDeclarations: FunctionDeclaration[]
  /**
   * Gets the items for the given Item IDs
   */
  getItems: (itemIds: string[]) => Promise<Item[]>
  mockMessages?: Message[]
  systemInstruction: ChatOptions['systemInstruction']
}

export function buildPostRoute({
  assistantPrompt,
  functionDeclarations,
  getItems,
  mockMessages,
  systemInstruction,
}: BuildPostRouteOptions) {
  const postRoute = async (req: Request) => {
    const { assistantType, history, userPrompt } = await getRequest(req)

    if (!Array.isArray(history)) {
      return new Response('Invalid `history` JSON', { status: 400 })
    }

    const processMessages = buildProcessMessages({ getItems })

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
      systemInstruction,
      functionDeclarations,
      processMessages,
    })

    return new Response(chatStream)
  }

  return postRoute
}

function buildProcessMessages({
  getItems,
}: {
  getItems: BuildPostRouteOptions['getItems']
}): ProcessMessages {
  return function processMessages(
    rawMessages: Message[],
  ): Promise<ItemExtendedMessage[]> {
    const messages = rawMessages.map((rawMessage): ExtendedMessage => {
      if (!isAssistantContentMessage(rawMessage) || !rawMessage.content) {
        return rawMessage
      }

      const recommended = parseRecommendations(rawMessage.content)
      const message: ParsedAssistantMessage = {
        ...rawMessage,
        content: rawMessage.content,
        ...recommended,
      }

      return message
    })

    // add `items` property to each of the assistant
    return addItemsToMessages(messages, getItems)
  }
}

/**
 * Creates a readable stream processing the messages provided
 */
function getReadableStream(
  processMessages: ProcessMessages,
  messages: Message[],
) {
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
