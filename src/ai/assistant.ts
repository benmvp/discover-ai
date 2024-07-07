import type {
  AssistantType,
  Message,
  ProcessAssistantMessageChunk,
  ProcessMessages,
  RunnableFunctionDeclaration,
} from './types'
import { toRunnableTools } from './openai/transformers'
import { chat as chatOpenAI } from './openai/assistant'

export interface ChatOptions {
  /**
   * The introductory prompt/message from the assistant to start the chat
   */
  assistantPrompt: string

  /**
   * The desired assistant to fulfill the chat request
   */
  assistantType: AssistantType

  /**
   * The function declarations to use during the chat with the assistant
   */
  functionDeclarations: RunnableFunctionDeclaration[]

  /**
   * Messages to pass to the assistant chat
   */
  messages: Message[]

  /**
   * A function to process a raw assistant message chunk being streamed to the client
   */
  processAssistantMessageChunk?: ProcessAssistantMessageChunk

  /**
   * A function to process the raw messages from the assistant when the final messages ready to be streamed to the client
   */
  processMessages?: ProcessMessages

  /**
   * The additional context to steer the behavior of the model
   */
  systemInstruction: string
}

/**
 * An OpenAI function calling chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters (see:
 * https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  assistantType,
  messages,
  processAssistantMessageChunk = (msg) => msg,
  processMessages = async (msgs) => msgs,
  systemInstruction,
  assistantPrompt,
  functionDeclarations,
}: ChatOptions) => {
  if (assistantType === 'openai') {
    return chatOpenAI({
      messages,
      processAssistantMessageChunk,
      processMessages,
      systemInstruction,
      assistantPrompt,
      tools: toRunnableTools(functionDeclarations),
    })
  }
}
