import type OpenAI from 'openai'

interface RequestJson {
  messages: OpenAI.ChatCompletionMessageParam[]
}

export const getMessagesFromRequest = async (req: Request) => {
  const json = (await req.json()) as RequestJson
  const { messages } = json

  return messages
}
