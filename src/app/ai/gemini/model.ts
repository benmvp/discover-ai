import { GoogleGenerativeAI } from '@google/generative-ai'
import type {
  GenerativeModel,
  Part as GeminiPart,
  GenerateContentResult,
} from '@google/generative-ai'
import type { FunctionDeclaration } from '../../types'
import type { ChatOptions } from '@/app/ai/types'
import {
  toContents,
  toMergedFunctionResponseContent,
  toTools,
} from './transformers'
import {
  FunctionCallMessage,
  FunctionResponseMessage,
  Message,
} from '../../types'
import { createAssistantMessage, createUserMessage } from '../../utils'

interface RunFunctionOptions {
  functionDeclarations: GeminiChatOptions['functionDeclarations']
  history: GeminiChatOptions['history']

  /**
   * The core Gemini generative model
   */
  model: GenerativeModel

  processMessages: NonNullable<GeminiChatOptions['processMessages']>
  userPrompt: GeminiChatOptions['userPrompt']
}

const ensureHistoryStartsWithUser = (history: Message[]) => {
  // Gemini requires that the first message in the history is from the user.
  // So, we'll trim the history to begin with the first user message.
  const firstUserIndex = history.findIndex((message) => message.type === 'user')

  // if there are no user messages in the history, then we'll just return an
  // empty array (for the case where all we have is the assistant prompt message)
  if (firstUserIndex === -1) {
    return []
  }

  return firstUserIndex > 0 ? history.slice(firstUserIndex) : history
}

/**
 * Run the multi-turn function with the model
 * See: https://ai.google.dev/gemini-api/docs/function-calling
 */
export const runFunctions = async ({
  model,
  history,
  functionDeclarations,
  userPrompt,
  processMessages,
}: RunFunctionOptions) => {
  const functionDeclarationsLookup = new Map(
    functionDeclarations.map((functionDeclaration) => [
      functionDeclaration.name,
      functionDeclaration,
    ]),
  )
  const chatSession = model.startChat({
    history: toContents(ensureHistoryStartsWithUser(history)),
  })
  const multiTurnMessages: Message[] = [createUserMessage(userPrompt)]

  let result: GenerateContentResult

  // prepare the user prompt to send to the model
  let messageRequest: string | Array<string | GeminiPart> = userPrompt

  // multi-turn allowing for back and forth function calling if necessary
  while (true) {
    // Send the message to the model. We'll either get back the model/assistant text
    // response or a function call definition
    // TODO: Figure out how to use `sendMessageStream`
    result = await chatSession.sendMessage(messageRequest)

    const functionsToCall = result.response
      .functionCalls()
      ?.map((call) => ({
        declaration: functionDeclarationsLookup.get(call.name),
        args: call.args,
      }))
      .filter(
        (
          entry,
        ): entry is {
          declaration: FunctionDeclaration
          args: object
        } => !!entry.declaration,
      )

    // if the result isn't a function call, then it must have been a model plain
    // text response so we'll quit the loop in order to stream that content
    if (!functionsToCall || functionsToCall.length === 0) {
      break
    }

    // call the internal async function(s) based on the name(s) returned by the Gemini
    // function call with the arguments provided
    const apiCalls = functionsToCall.map(({ declaration, args }) =>
      declaration.function(args),
    )
    const apiResponses = await Promise.all(apiCalls)

    const functionCallMessage: FunctionCallMessage = {
      type: 'functionCall',
      calls: functionsToCall.map(({ declaration, args }) => ({
        name: declaration.name,
        arguments: args,
      })),
      content: result.response.text(),
    }

    const functionResponseMessages: FunctionResponseMessage[] =
      apiResponses.map((apiResponse, index) => ({
        type: 'functionResponse',
        name: functionsToCall[index].declaration.name,
        content: apiResponse,
      }))

    // the function call back and forth messages need to be included in the
    // streamed response
    multiTurnMessages.push(functionCallMessage, ...functionResponseMessages)

    // prepare the function response message to be sent on the next loop
    // (may result in model/assistant text or another function call turn)
    messageRequest = toMergedFunctionResponseContent(
      functionResponseMessages,
    ).parts
  }

  // create a readable stream of all the new messages generated from the user
  // prompt multi-turn function calling
  return new ReadableStream<string>({
    start(controller) {
      // once we're done with the multi-turn function calling, the last result
      // text is the response from the model
      const modelResponseText = result.response.text()

      if (modelResponseText) {
        multiTurnMessages.push(createAssistantMessage(modelResponseText))
      }

      processMessages(multiTurnMessages).then((newMessages) => {
        controller.enqueue(`\n${JSON.stringify({ newMessages })}`)
        controller.close()
      })
    },
  })
}

type GeminiChatOptions = Omit<ChatOptions, 'assistantType' | 'assistantPrompt'>

/**
 * An Gemini function calling chat with the model, returning a streamed response of messages,
 * configured by the specified parameters (see: https://ai.google.dev/gemini-api/docs/function-calling)
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  history,
  userPrompt,
  processMessages = async (msgs) => msgs,
  systemInstruction,
  functionDeclarations,
}: GeminiChatOptions) => {
  // Create an Gemini client (with the API key)
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')
  const model = client.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
    tools: toTools(functionDeclarations),
  })

  return runFunctions({
    model,
    history,
    functionDeclarations,
    userPrompt,
    processMessages,
  })
}
