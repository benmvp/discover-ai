import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import { isProductAssistantMessage, isUserMessage } from '../utils'
import ShopperChatBubble from './ShopperChatBubble'
import AssistantChatBubble from './AssistantChatBubble'

interface Props {
  message: ProductExtendedChatCompletionMessageParam
}

const ChatBubble = ({ message }: Props) => {
  let ui: React.ReactNode = null

  if (isProductAssistantMessage(message)) {
    ui = <AssistantChatBubble message={message} />
  } else if (isUserMessage(message)) {
    ui = <ShopperChatBubble message={message} />
  }

  return ui
}

export default ChatBubble
