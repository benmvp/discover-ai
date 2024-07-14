import type {
  Content as GeminiContent,
  Tool as GeminiTool,
  FunctionDeclaration as GeminiFunctionDeclaration,
  FunctionCallPart as GeminiFunctionCallPart,
} from '@google/generative-ai'
import type {
  AssistantMessage,
  FunctionCallMessage,
  FunctionResponseMessage,
  Message,
  FunctionDeclaration,
  UserMessage,
} from '../types'
import {
  isAssistantMessage,
  isFunctionCallMessage,
  isFunctionResponse,
} from '../utils'

/**
 * Transform the function declarations to the function tools used during the chat
 * with the Gemini model
 */
export const toTools = (
  functionDeclarations: FunctionDeclaration[],
): GeminiTool[] => {
  return [
    {
      functionDeclarations: functionDeclarations.map(
        (functionDeclaration): GeminiFunctionDeclaration => {
          return {
            description: functionDeclaration.description,
            name: functionDeclaration.name,
            parameters: functionDeclaration.parameters,
          }
        },
      ),
    },
  ]
}

export type GeminiModelContent = GeminiContent
export type GeminiUserContent = GeminiContent
export type GeminiFunctionCallContent = GeminiContent
export type GeminiFunctionResponseContent = GeminiContent

const isModelContent = (
  content: GeminiContent,
): content is GeminiModelContent =>
  content.role === 'model' && content.parts.some((part) => part.text)
const isUserContent = (content: GeminiContent): content is GeminiUserContent =>
  content.role === 'user' && content.parts.some((part) => part.text)
const isFunctionCallContent = (
  content: GeminiContent,
): content is GeminiFunctionCallContent =>
  content.role === 'model' && content.parts.some((part) => part.functionCall)
const isFunctionResponseContent = (
  content: GeminiContent,
): content is GeminiFunctionResponseContent =>
  content.role === 'function' &&
  content.parts.some((part) => part.functionResponse)

/**
 * Transform our abstraction user message to the Gemini user message param
 */
const toUserContent = ({ content }: UserMessage): GeminiUserContent => ({
  role: 'user',
  parts: [{ text: content }],
})
/**
 * Transform the Gemini user content to our abstraction user message
 */
const fromUserContent = ({ parts }: GeminiUserContent): UserMessage => ({
  type: 'user',
  content: parts.filter((part) => part.text).join('\n\n'),
})

/**
 * Transform our abstraction assistant message to the Gemini model content
 */
const toModelContent = ({ content }: AssistantMessage): GeminiModelContent => ({
  role: 'model',
  parts: [{ text: content }],
})
/**
 * Transform the Gemini model content to our abstraction assistant message
 */
const fromModelContent = (
  content: GeminiModelContent,
): AssistantMessage | undefined =>
  isModelContent(content)
    ? {
        type: 'assistant',
        content: content.parts.filter((part) => part.text).join('\n\n'),
      }
    : undefined

/**
 * Transform our abstraction function call message to the Gemini model function call content
 */
const toModelFunctionCallContent = (
  message: FunctionCallMessage,
): GeminiFunctionCallContent => ({
  role: 'model',
  parts: message.calls.map((call) => ({
    functionCall: {
      name: call.name,
      args: call.arguments,
    },
  })),
})
/**
 * Transform the Gemini model function call content to our abstraction function call message
 */
const fromModelFunctionCallContent = (
  content: GeminiFunctionCallContent,
): FunctionCallMessage => {
  const functionCallParts = content.parts.filter(
    (part): part is GeminiFunctionCallPart => !!part.functionCall,
  )

  return {
    calls: functionCallParts.map((part) => ({
      id: '',
      name: part.functionCall.name,
      arguments: part.functionCall.args,
    })),
    content: functionCallParts.map((part) => part.text).join('\n\n'),
    type: 'functionCall',
  }
}

/**
 * Transform our abstraction function response message to the Gemini function response content
 */
const toFunctionResponseContent = (
  message: FunctionResponseMessage,
): GeminiFunctionResponseContent => ({
  role: 'function',
  parts: [
    {
      functionResponse: {
        name: message.name,
        response: message.content,
      },
    },
  ],
})
export const toMergedFunctionResponseContent = (
  messages: FunctionResponseMessage[],
): GeminiFunctionResponseContent => ({
  role: 'function',
  parts: messages.map((message) => ({
    functionResponse: {
      name: message.name,
      response: message.content,
    },
  })),
})
/**
 * Transform the Gemini function response content to our abstraction function response message
 */
const fromFunctionResponseContent = (
  content: GeminiFunctionResponseContent,
): FunctionResponseMessage | undefined => {
  const functionResponse = content.parts.find(
    (part) => part.functionResponse,
  )?.functionResponse

  return functionResponse
    ? {
        name: functionResponse.name,
        content: functionResponse.response,
        id: '',
        type: 'functionResponse',
      }
    : undefined
}

/**
 * Transform the Gemini content to our abstraction message
 */
export const fromContent = (content: GeminiContent): Message | undefined => {
  if (isModelContent(content)) {
    return fromModelContent(content)
  }
  if (isFunctionCallContent(content)) {
    return fromModelFunctionCallContent(content)
  }
  if (isFunctionResponseContent(content)) {
    return fromFunctionResponseContent(content)
  }
  if (isUserContent(content)) {
    return fromUserContent(content)
  }
}

/**
 * Transform our abstraction message to the Gemini content
 * @param message
 * @returns
 */
const toContent = (message: Message): GeminiContent => {
  if (isAssistantMessage(message)) {
    return toModelContent(message)
  }
  if (isFunctionCallMessage(message)) {
    return toModelFunctionCallContent(message)
  }
  if (isFunctionResponse(message)) {
    return toFunctionResponseContent(message)
  }

  return toUserContent(message)
}

/**
 * Transform the abstraction messages to the Gemini content list
 */
export const toContents = (messages: Message[]): GeminiContent[] =>
  messages.map(toContent)
