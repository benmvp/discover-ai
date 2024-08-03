import type {
  AssistantMessage,
  FunctionCallMessage,
  FunctionResponseMessage,
  Message,
  UserMessage,
} from './types'

export const isAssistantMessage = (
  message: Message,
): message is AssistantMessage => message.type === 'assistant'

export const isUserMessage = (message: Message): message is UserMessage =>
  message.type === 'user'

export const isFunctionCallMessage = (
  message: Message,
): message is FunctionCallMessage => message.type === 'functionCall'

export const isFunctionResponse = (
  message: Message,
): message is FunctionResponseMessage => message.type === 'functionResponse'

export const isAssistantContentMessage = (
  message: Message,
): message is AssistantMessage | FunctionCallMessage =>
  Boolean(message.content) &&
  (isAssistantMessage(message) || isFunctionCallMessage(message))

/**
 * Create an assistant message for the specified content
 */
export const createAssistantMessage = (
  content: AssistantMessage['content'],
): AssistantMessage => ({
  content,
  type: 'assistant',
})

/**
 * Create a user message for the specified content
 */
export const createUserMessage = (
  content: UserMessage['content'],
): UserMessage => ({
  content,
  type: 'user',
})
