import OpenAI from 'openai'
import type { ChatOptions, ProcessMessages } from '@/app/ai/types'
import {
  fromMessageParam,
  toMessageParam,
  toMessageParams,
  toRunnableTools,
} from './transformers'
import type { Message, UserMessage } from '../../types'
import { createAssistantMessage, createUserMessage } from '../../utils'

const chatByFunction = (
  functionDeclarations: OpenAIChatOptions['functionDeclarations'],
  systemInstruction: OpenAIChatOptions['systemInstruction'],
  history: Message[],
  userMessage: UserMessage,
) => {
  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: systemInstruction,
  }
  const messages = [
    systemMessage,
    ...toMessageParams(history),
    toMessageParam(userMessage),
  ]

  // Guide: https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls
  const streamingRunner = client.beta.chat.completions.runTools({
    model: 'gpt-4o-mini',
    stream: true,
    messages,
    tools: toRunnableTools(functionDeclarations),
  })

  return streamingRunner
}

/**
 * Converts the streamed chat completion response to a readable stream
 */
const toChatReadableStream = (
  processMessages: ProcessMessages,
  chatResponseStream: ReturnType<typeof chatByFunction>,
  userMessage: UserMessage,
) => {
  const newMessages: Message[] = [userMessage]

  // Create a readable stream from the chat response stream
  const readableStream = new ReadableStream<string>({
    // Start function is called when the stream starts
    start(controller) {
      chatResponseStream
        .on('content', async (_, contentSnapshot) => {
          // The content snapshot is a chunk of the assistant's response to the
          // user message. We process the chunk as if it were a full message so
          // that it can be displayed in the UI. We include the increasing chunk
          // with the user message so that the UI will display both the user
          // prompt and the streaming assistant response.
          const chunkedNewMessages = await processMessages([
            ...newMessages,
            createAssistantMessage(contentSnapshot),
          ])

          controller.enqueue(
            `\n${JSON.stringify({ newMessages: chunkedNewMessages })}`,
          )
        })
        .on('message', (messageParam) => {
          // as we get new messages (like the function messages), append them to the list
          // of messages so that we can send the final list of messages at the
          // end with all the new messages.
          const message = fromMessageParam(messageParam)

          if (message) {
            newMessages.push(message)
          }
        })
        .on('end', async () => {
          // once we've streamed everything, push one more set of messages that
          // has all the messages (including the user prompt message) and
          // processed as necessary with any extra data
          const processedNewMessages = await processMessages(newMessages)

          controller.enqueue(
            `\n${JSON.stringify({ newMessages: processedNewMessages })}`,
          )
          controller.close()
        })
    },
  })

  return readableStream
}

type OpenAIChatOptions = Omit<
  ChatOptions,
  'assistantType' | 'assistantPrompt' | 'processAssistantMessageChunk'
>

/**
 * An OpenAI function calling chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters (see:
 * https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  history,
  userPrompt,
  processMessages = async (msgs) => msgs,
  systemInstruction,
  functionDeclarations,
}: OpenAIChatOptions) => {
  const userMessage = createUserMessage(userPrompt)

  const chatResponse = chatByFunction(
    functionDeclarations,
    systemInstruction,
    history,
    userMessage,
  )

  return toChatReadableStream(processMessages, chatResponse, userMessage)
}
