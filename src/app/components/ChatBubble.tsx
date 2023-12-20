import type { ExtendedChatCompletionMessageParam } from '@/app/types'
import { isParsedAssistantMessage, isUserMessage } from '../utils'
import ShopperChatBubble from './ShopperChatBubble'
import AssistantChatBubble from './AssistantChatBubble'

interface Props {
  message: ExtendedChatCompletionMessageParam
}

const ChatBubble = ({ message }: Props) => {
  let ui: React.ReactNode = null

  if (isParsedAssistantMessage(message)) {
    ui = <AssistantChatBubble message={message} />
  } else if (isUserMessage(message)) {
    ui = <ShopperChatBubble message={message} />
  }

  return ui
}

export default ChatBubble
