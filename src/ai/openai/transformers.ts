import OpenAI from 'openai'
import {
  RunnableToolFunction,
  RunnableFunctionWithParse,
  RunnableTools,
} from 'openai/lib/RunnableFunction'
import {
  AssistantMessage,
  FunctionCallMessage,
  FunctionResponseMessage,
  Message,
  RunnableFunctionDeclaration,
  UserMessage,
} from '../types'
import {
  isAssistantMessage,
  isFunctionCallMessage,
  isFunctionResponse,
} from '../utils'

/**
 * Transform the function declarations to the function tools used during the chat
 * with the OpenAI assistant
 */
export const toRunnableTools = (
  functionDeclarations: RunnableFunctionDeclaration[],
): RunnableTools<object[]> => {
  return functionDeclarations.map(
    (functionDeclaration): RunnableToolFunction<object> => {
      const runnableFunction: RunnableFunctionWithParse<object> = {
        ...functionDeclaration,
        parse: JSON.parse,
      }

      return {
        type: 'function',
        function: runnableFunction,
      } as RunnableToolFunction<object>
    },
  )
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
  message.role === 'assistant' && message.tool_calls?.[0].type === 'function'
const isToolMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionToolMessageParam => message.role === 'tool'

/**
 * Transform our abstraction user message to the OpenAI user message param
 */
export const toUserMessageParam = ({
  content,
}: UserMessage): OpenAI.ChatCompletionUserMessageParam => ({
  role: 'user',
  content,
})
/**
 * Transform the OpenAI user message param to our abstraction user message
 */
export const fromUserMessageParam = ({
  content,
}: OpenAI.ChatCompletionUserMessageParam): UserMessage => ({
  type: 'user',
  content: typeof content === 'string' ? content : '',
})

/**
 * Transform our abstraction assistant message to the OpenAI assistant message param
 */
export const toContentAssistantMessageParam = ({
  content,
}: AssistantMessage): OpenAI.ChatCompletionAssistantMessageParam => ({
  role: 'assistant',
  content,
})
/**
 * Transform the OpenAI assistant content message param to our abstraction assistant message
 */
export const fromContentAssistantMessageParam = (
  message: OpenAI.ChatCompletionAssistantMessageParam,
): AssistantMessage | undefined =>
  isContentAssistantMessageParam(message)
    ? {
        type: 'assistant',
        content: message.content ?? '',
      }
    : undefined

/**
 * Transform our abstraction function call message to the OpenAI assistant tool call message param
 */
export const toAssistantToolCallMessageParam = (
  message: FunctionCallMessage,
): OpenAI.ChatCompletionAssistantMessageParam => ({
  role: 'assistant',
  content: null,
  tool_calls: [
    {
      type: 'function',
      id: message.id ?? '',
      function: {
        name: message.name,
        arguments: JSON.stringify(message.arguments),
      },
    },
  ],
})
/**
 * Transform the OpenAI assistant tool call message param to our abstraction function call message
 */
export const fromAssistantToolCallMessageParam = (
  message: OpenAI.ChatCompletionAssistantMessageParam,
): FunctionCallMessage | undefined => {
  const toolCall = message.tool_calls?.[0]

  if (!toolCall || toolCall.type !== 'function') {
    return undefined
  }

  return {
    id: toolCall.id,
    name: toolCall.function.name,
    arguments: JSON.parse(toolCall.function.arguments),
    type: 'functionCall',
  }
}

/**
 * Transform our abstraction function response message to the OpenAI tool message param
 */
export const toToolMessageParam = (
  message: FunctionResponseMessage,
): OpenAI.ChatCompletionToolMessageParam => ({
  role: 'tool',
  content: JSON.stringify(message.content),
  tool_call_id: message.id ?? '',
})
/**
 * Transform the OpenAI tool message param to our abstraction function response message
 */
export const fromToolMessageParam = (
  message: OpenAI.ChatCompletionToolMessageParam,
): FunctionResponseMessage => ({
  name: '',
  content: JSON.parse(message.content ?? '{}'),
  id: message.tool_call_id,
  type: 'functionResponse',
})

/**
 * Transform the OpenAI message param to our abstraction message
 */
export const fromMessageParam = (
  message: OpenAI.ChatCompletionMessageParam,
): Message | undefined => {
  if (isContentAssistantMessageParam(message)) {
    return fromContentAssistantMessageParam(message)
  }
  if (isToolCallAssistantMessageParam(message)) {
    return fromAssistantToolCallMessageParam(message)
  }
  if (isToolMessageParam(message)) {
    return fromToolMessageParam(message)
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
  if (isAssistantMessage(message)) {
    return toContentAssistantMessageParam(message)
  }
  if (isFunctionCallMessage(message)) {
    return toAssistantToolCallMessageParam(message)
  }
  if (isFunctionResponse(message)) {
    return toToolMessageParam(message)
  }

  return toUserMessageParam(message)
}

/**
 * Transform the abstraction messages to the OpenAI message params
 */
export const toMessageParams = (
  messages: Message[],
): OpenAI.ChatCompletionMessageParam[] => messages.map(toMessageParam)
