import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { Message, UserMessage } from '../types'
import { createUserMessage } from '../utils'
import {
  fromMessageParam,
  toMessageParam,
  toMessageParams,
  toRunnableTools,
} from './transformers'
import { ChatOptions, ProcessMessages } from './types'

/**
 * An OpenAI function calling chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters (see:
 * https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
 * @returns A readable stream that can be streamed to a Response
 */
export function chat({
  assistantType,
  history,
  userPrompt,
  systemInstruction,
  functionDeclarations,
  processMessages = async (msgs) => msgs,
}: ChatOptions) {
  const userMessage = createUserMessage(userPrompt)

  const chatRunner = chatByFunction({
    assistantType,
    functionDeclarations,
    systemInstruction,
    history,
    userMessage,
  })

  return toChatReadableStream(chatRunner, processMessages, userMessage)
}

const recommendationsSetSchema = z.object({
  ids: z.array(z.string()).describe('The list of recommendation IDs'),
  summary: z
    .string()
    .describe(
      'A conversational summary of the recommendations in this list and why they are relevant',
    ),
})
const recommendationsResponseSchema = z.object({
  recommendations: z
    .array(recommendationsSetSchema)
    .describe('The list of recommendation sets from the search function'),
  opening: z
    .string()
    .describe("A friendly opening acknowledging the user's request"),
  nexSteps: z
    .string()
    .describe(
      'A prompt for the user asking for more information in order to provide even better recommendations',
    ),
  filter: z
    .string()
    .describe('The JSON parameters passed to the search function call'),
})

export type RecommendationsResponse = z.infer<
  typeof recommendationsResponseSchema
>

interface ChatByFunctionOptions extends Omit<ChatOptions, 'userPrompt'> {
  userMessage: UserMessage
}

function chatByFunction({
  assistantType,
  history,
  userMessage,
  systemInstruction,
  functionDeclarations,
}: ChatByFunctionOptions) {
  const client = new OpenAI({
    apiKey:
      assistantType === 'gemini'
        ? process.env.GEMINI_API_KEY
        : process.env.OPENAI_API_KEY,
    baseURL:
      assistantType === 'gemini' ? process.env.GEMINI_API_BASE_URL : undefined,
  })
  const model =
    assistantType === 'gemini'
      ? process.env.GEMINI_MODEL
      : process.env.OPENAI_MODEL
  const systemMessage: OpenAI.ChatCompletionSystemMessageParam = {
    role: 'system',
    content: systemInstruction,
  }
  const messages = [
    systemMessage,
    ...toMessageParams(history),
    toMessageParam(userMessage),
  ]
  const tools = toRunnableTools(functionDeclarations)
  const responseFormat = zodResponseFormat(
    recommendationsResponseSchema,
    'content',
  )

  // Guide: https://platform.openai.com/docs/guides/function-calling
  const runner = client.beta.chat.completions.runTools({
    model: model || 'gpt-4o-mini',
    messages,
    tools,
    n: 1,
    response_format: responseFormat,
  })

  return runner
}

function toChatReadableStream(
  chatRunner: ReturnType<typeof chatByFunction>,
  processMessages: ProcessMessages,
  userMessage: UserMessage,
) {
  const newMessages: Message[] = [userMessage]

  // Create a readable stream from the chat response stream
  const readableStream = new ReadableStream<string>({
    // Start function is called when the stream starts
    start(controller) {
      chatRunner
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
          console.log('newMessages', JSON.stringify(newMessages))
          // now that everything we've retrieved everything, process the
          // messages to get out all the data we need.
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
