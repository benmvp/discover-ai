import type OpenAI from 'openai'
import { chat } from '@/app/ai/assistant'
import { getProducts } from '@/app/ai/products'
import { isParsedAssistantMessage } from '@/app/utils'
import type {
  ProductExtendedChatCompletionMessageParam,
  ProductFilterParams,
} from '@/app/types'

export interface RequestParams {
  messages?: OpenAI.ChatCompletionMessageParam[]
}
export interface ChatData {
  filter?: ProductFilterParams
  messages: ProductExtendedChatCompletionMessageParam[]
}

export const getChatData = async ({
  messages: requestMessages,
}: RequestParams = {}): Promise<ChatData> => {
  const { filter, messages: responseMessages } = await chat({
    messages: requestMessages,
  })

  return {
    filter,

    // add `products` property to each of the assistant
    messages: responseMessages.map((message) =>
      isParsedAssistantMessage(message)
        ? { ...message, products: getProducts(message.skuIds) }
        : message,
    ),
  }
}

export const POST = async (req: Request) => {
  const body = (await req.json()) as RequestParams

  return Response.json(await getChatData(body))
}
