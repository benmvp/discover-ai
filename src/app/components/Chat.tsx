import type { ExtendedChatCompletionMessageParam } from '@/app/types'
import ChatBubble from './ChatBubble'
import ChatInput from './ChatInput'

interface Props {
  messages: ExtendedChatCompletionMessageParam[]
}

const Chat = ({ messages }: Props) => {
  return (
    <>
      <article style={{ marginBottom: 50 }}>
        {messages.map((message, i) => {
          return (
            <div key={i} style={{ marginTop: 20 }}>
              <ChatBubble message={message} />
            </div>
          )
        })}
      </article>
      <ChatInput />
    </>
  )
}

export default Chat
