import OpenAI from 'openai'
import { RunnableTools } from 'openai/lib/RunnableFunction'
import { ChatOptions } from '../assistant'
import { fromMessageParam, toMessageParams } from './transformers'
import {
  Message,
  ProcessAssistantMessageChunk,
  ProcessMessages,
} from '../types'

const chatByFunction = (
  tools: RunnableTools<object[]>,
  systemInstruction: OpenAIChatOptions['systemInstruction'],
  messages: Message[],
) => {
  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: systemInstruction,
  }

  // Guide: https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls
  const streamingRunner = client.beta.chat.completions.runTools({
    model: 'gpt-4o',
    stream: true,
    messages: [systemMessage, ...toMessageParams(messages)],
    tools,
  })

  return streamingRunner
}

/**
 * Converts the streamed chat completion response to a readable stream
 */
const toChatReadableStream = (
  processAssistantMessageChunk: ProcessAssistantMessageChunk,
  processMessages: ProcessMessages,
  chatResponseStream: ReturnType<typeof chatByFunction>,
) => {
  const allMessages: Message[] = []

  // Create a readable stream
  const readableStream = new ReadableStream({
    // Start function called when the stream starts
    start(controller) {
      chatResponseStream
        .on('content', (_, contentSnapshot) => {
          // Grab the full content as the message gets streamed in chunks, and
          // convert to the message format so that we can display it in the
          // frontend as if it were the full message. this will exclude any of
          // the function/tool related messages
          const newMessages = [
            processAssistantMessageChunk({
              type: 'assistant',
              content: contentSnapshot,
            }),
          ]

          controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
        })
        .on('message', (messageParam) => {
          // as we get messages (like the function messages) append to the list
          // of messages so that we can send the final list of messages at the
          // end.
          const message = fromMessageParam(messageParam)

          if (message) {
            allMessages.push(message)
          }
        })
        .on('end', async () => {
          // once we've streamed everything, push one more set of messages that
          // has everything, including the products
          const newMessages = await processMessages(allMessages)

          controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
          controller.close()
        })
    },
  })

  return readableStream
}

/**
 * Creates a readable stream with the initial message(s)
 */
const getInitialReadableStream = (
  processMessageParams: ProcessMessages,
  assistantPrompt: OpenAIChatOptions['assistantPrompt'],
) => {
  const initialMessagesStream = new ReadableStream({
    start(controller) {
      processMessageParams([
        { type: 'assistant', content: assistantPrompt },
      ]).then((newMessages) => {
        controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
        controller.close()
      })
    },
  })

  return initialMessagesStream
}

type OpenAIChatOptions = Omit<
  ChatOptions,
  'assistantType' | 'functionDeclarations'
> & {
  /**
   * The tools containing function declarations to use during the chat with the assistant
   */
  tools: RunnableTools<object[]>
}

/**
 * An OpenAI function calling chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters (see:
 * https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  messages,
  processAssistantMessageChunk = (msg) => msg,
  processMessages: processMessages = async (msgs) => msgs,
  systemInstruction,
  assistantPrompt,
  tools,
}: OpenAIChatOptions) => {
  // If there are no messages, stream the initial messages
  if (messages.length === 0) {
    return getInitialReadableStream(processMessages, assistantPrompt)
  }

  const chatResponse = chatByFunction(tools, systemInstruction, messages)

  return toChatReadableStream(
    processAssistantMessageChunk,
    processMessages,
    chatResponse,
  )
}
