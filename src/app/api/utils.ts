import { AssistantType, Message } from '@/ai/types'

interface RequestJson {
  assistantType: AssistantType
  history: Message[]
  userPrompt: string
}

export const getRequest = async (req: Request): Promise<RequestJson> => {
  return req.json()
}
