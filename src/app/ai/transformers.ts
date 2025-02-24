import OpenAI from 'openai'
import type {
  AssistantMessage,
  FunctionCallMessage,
  FunctionResponseMessage,
  Message,
  FunctionDeclaration,
  UserMessage,
} from '../types'
import {
  createAssistantMessage,
  isAssistantMessage,
  isFunctionCallMessage,
  isFunctionResponse,
} from '../utils'

/**
 * Transform the function declarations to the function tools used during the chat
 * with the OpenAI assistant
 */
export const toRunnableTools = (
  functionDeclarations: FunctionDeclaration[],
) => {
  return functionDeclarations.map((functionDeclaration) => {
    const runnableFunction = {
      strict: false,
      parse: JSON.parse,
      ...functionDeclaration,
      parameters: {
        ...functionDeclaration.parameters,
        additionalProperties: false,
      },
    }

    return {
      type: 'function',
      function: runnableFunction,
    } as const
  })
}

const isContentAssistantMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionAssistantMessageParam =>
  message.role === 'assistant' && message.content !== null
const isUserMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionUserMessageParam =>
  message.role === 'user' && message.content !== null
const isToolCallAssistantMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionAssistantMessageParam =>
  message.role === 'assistant' &&
  !!message.tool_calls?.some((toolCall) => toolCall.type === 'function')
const isToolMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionToolMessageParam => message.role === 'tool'

/**
 * Transform our abstraction user message to the OpenAI user message param
 */
const toUserMessageParam = ({
  content,
}: UserMessage): OpenAI.ChatCompletionUserMessageParam => ({
  role: 'user',
  content,
})
/**
 * Transform the OpenAI user message param to our abstraction user message
 */
const fromUserMessageParam = ({
  content,
}: OpenAI.ChatCompletionUserMessageParam): UserMessage => ({
  type: 'user',
  content: typeof content === 'string' ? content : '',
})

/**
 * Transform our abstraction assistant message to the OpenAI assistant message param
 */
const toContentAssistantMessageParam = ({
  content,
}: AssistantMessage): OpenAI.ChatCompletionAssistantMessageParam => ({
  role: 'assistant',
  content,
})
/**
 * Transform the OpenAI assistant content message param to our abstraction assistant message
 */
const fromContentAssistantMessageParam = (
  message: OpenAI.ChatCompletionAssistantMessageParam,
): AssistantMessage | undefined =>
  isContentAssistantMessageParam(message)
    ? createAssistantMessage(
        typeof message.content === 'string' ? message.content : '',
      )
    : undefined

/**
 * Transform our abstraction function call message to the OpenAI assistant tool call message param
 */
const toAssistantToolCallMessageParam = (
  message: FunctionCallMessage,
): OpenAI.ChatCompletionAssistantMessageParam => ({
  role: 'assistant',
  content: message.content,
  tool_calls: message.calls.map((call) => ({
    type: 'function',
    id: call.id ?? '',
    function: {
      name: call.name,
      arguments: JSON.stringify(call.arguments),
    },
  })),
})
/**
 * Transform the OpenAI assistant tool call message param to our abstraction function call message
 */
const fromAssistantToolCallMessageParam = (
  message: OpenAI.ChatCompletionAssistantMessageParam,
): FunctionCallMessage | undefined => {
  const toolCalls = message.tool_calls?.filter(
    (toolCall) => toolCall.type === 'function',
  )

  if (!toolCalls) {
    return undefined
  }

  return {
    calls: toolCalls.map((toolCall) => ({
      id: toolCall.id,
      name: toolCall.function.name,
      arguments: JSON.parse(toolCall.function.arguments),
    })),
    content: typeof message.content === 'string' ? message.content : null,
    type: 'functionCall',
  }
}

/**
 * Transform our abstraction function response message to the OpenAI tool message param
 */
const toToolMessageParam = (
  message: FunctionResponseMessage,
): OpenAI.ChatCompletionToolMessageParam => ({
  role: 'tool',
  content: JSON.stringify(message.content),
  tool_call_id: message.id ?? '',
})
/**
 * Transform the OpenAI tool message param to our abstraction function response message
 */
const fromToolMessageParam = (
  message: OpenAI.ChatCompletionToolMessageParam,
): FunctionResponseMessage => ({
  name: '',
  content:
    typeof message.content === 'string' ? JSON.parse(message.content) : {},
  id: message.tool_call_id,
  type: 'functionResponse',
})

/**
 * Transform the OpenAI message param to our abstraction message
 */
export const fromMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): Message | undefined => {
  if (isToolCallAssistantMessageParam(message)) {
    return fromAssistantToolCallMessageParam(message)
  }
  if (isToolMessageParam(message)) {
    return fromToolMessageParam(message)
  }
  if (isContentAssistantMessageParam(message)) {
    return fromContentAssistantMessageParam(message)
  }
  if (isUserMessageParam(message)) {
    return fromUserMessageParam(message)
  }
}

/**
 * Transform our abstraction message to the OpenAI message param
 * @param message
 * @returns
 */
export const toMessageParam = (
  message: Message,
): OpenAI.ChatCompletionMessageParam => {
  if (isFunctionCallMessage(message)) {
    return toAssistantToolCallMessageParam(message)
  }
  if (isFunctionResponse(message)) {
    return toToolMessageParam(message)
  }
  if (isAssistantMessage(message)) {
    return toContentAssistantMessageParam(message)
  }

  return toUserMessageParam(message)
}

/**
 * Transform the abstraction messages to the OpenAI message params
 */
export const toMessageParams = (
  messages: Message[],
): OpenAI.ChatCompletionMessageParam[] => messages.map(toMessageParam)
