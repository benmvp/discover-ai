import type { ProcessMessages, ChatOptions } from './types'
import { chat as chatOpenAI } from './openai/assistant'
import { chat as chatGemini } from './gemini/model'
/**
 * Creates a readable stream with the initial message(s)
 */
const getInitialReadableStream = (
  processMessages: ProcessMessages,
  assistantPrompt: ChatOptions['assistantPrompt'],
) => {
  const initialMessagesStream = new ReadableStream<string>({
    start(controller) {
      processMessages([{ type: 'assistant', content: assistantPrompt }]).then(
        (newMessages) => {
          controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
          controller.close()
        },
      )
    },
  })

  return initialMessagesStream
}

/**
 * A function calling chat with the OpenAI/Gemini assistant, returning a streamed response of messages,
 * configured by the specified parameters
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  assistantType,
  history,
  userPrompt,
  processAssistantMessageChunk = (msg) => msg,
  processMessages = async (msgs) => msgs,
  systemInstruction,
  assistantPrompt,
  functionDeclarations,
}: ChatOptions): ReadableStream<string> | Promise<ReadableStream<string>> => {
  // If there are no messages or no user prompt, stream the initial messages
  if (history.length === 0 || !userPrompt) {
    return getInitialReadableStream(processMessages, assistantPrompt)
  }

  if (assistantType === 'openai') {
    return chatOpenAI({
      history,
      userPrompt,
      processAssistantMessageChunk,
      processMessages,
      systemInstruction,
      functionDeclarations,
    })
  }

  return chatGemini({
    history,
    userPrompt,
    processAssistantMessageChunk,
    processMessages,
    systemInstruction,
    functionDeclarations,
  })
}
