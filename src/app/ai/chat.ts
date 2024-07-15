import type { ChatOptions } from './types'
import { chat as chatOpenAI } from './openai/assistant'
import { chat as chatGemini } from './gemini/model'

/**
 * A function calling chat with the OpenAI/Gemini assistant, returning a streamed response of messages,
 * configured by the specified parameters
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  assistantType,
  history,
  userPrompt,
  processMessages = async (msgs) => msgs,
  systemInstruction,
  functionDeclarations,
}: ChatOptions): ReadableStream<string> | Promise<ReadableStream<string>> => {
  if (assistantType === 'openai') {
    return chatOpenAI({
      history,
      userPrompt,
      processMessages,
      systemInstruction,
      functionDeclarations,
    })
  }

  return chatGemini({
    history,
    userPrompt,
    processMessages,
    systemInstruction,
    functionDeclarations,
  })
}
