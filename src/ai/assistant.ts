import OpenAI from 'openai'
import { AssistantType, RunnableFunctionDeclaration } from './types'
import { toRunnableTools } from './openai/mappers'
import { chat as chatOpenAI } from './openai/assistant'

// TODO: REPLACE THE `OpenAI.ChatCompletionMessageParam` TYPES WITH OUR FLEXIBLE TYPES

export type ProcessAssistantMessageChunk = (
  assistantMessage: OpenAI.ChatCompletionMessageParam,
) => OpenAI.ChatCompletionMessageParam
export type ProcessMessages = (
  rawMessages: OpenAI.ChatCompletionMessageParam[],
) => Promise<OpenAI.ChatCompletionMessageParam[]>

export interface ChatOptions {
  /**
   * The function declarations to use during the chat with the assistant
   */
  functionDeclarations: RunnableFunctionDeclaration[]

  /**
   * Initial/Default messages to use when `messages` is empty to start off
   */
  initialMessages: OpenAI.ChatCompletionMessageParam[]

  /**
   * Messages to pass to the assistant chat
   */
  messages: OpenAI.ChatCompletionMessageParam[]

  /**
   * A function to process a raw assistant message chunk being streamed to the client
   */
  processAssistantMessageChunk?: ProcessAssistantMessageChunk

  /**
   * A function to process the raw messages from the assistant when the final messages ready to be streamed to the client
   */
  processMessages?: ProcessMessages

  /**
   * The desired assistant to fulfill the chat request
   */
  type: AssistantType
}

/**
 * An OpenAI function calling chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters (see:
 * https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  type,
  initialMessages,
  messages,
  processAssistantMessageChunk = (msg) => msg,
  processMessages = async (msgs) => msgs,
  functionDeclarations,
}: ChatOptions) => {
  if (type === 'openai') {
    return chatOpenAI({
      initialMessages,
      messages,
      processAssistantMessageChunk,
      processMessages,
      tools: toRunnableTools(functionDeclarations),
    })
  }
}
