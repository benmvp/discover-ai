import { Message } from '@/ai/types'

interface RequestJson {
  messages: Message[]
}

export const getMessagesFromRequest = async (req: Request) => {
  const json = (await req.json()) as RequestJson
  const { messages } = json

  return messages
}
