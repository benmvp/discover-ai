import { chat } from '../../ai/assistant'
import { getProducts } from '../../ai/products'
import OpenAI from 'openai'

interface RequestBody {
  messages?: OpenAI.ChatCompletionMessageParam[]
}

export const POST = async (req: Request) => {
  const body = (await req.json()) as RequestBody
  const { messages } = body

  const {
    filter,
    messages: newMessages,
    skuIds,
    tokenizedMessage,
  } = await chat({ messages })

  return Response.json({
    filter,
    messages: newMessages,
    skuIds,
    products: getProducts(skuIds),
    tokenizedMessage,
  })
}
