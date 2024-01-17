'use client'

import { useFormState } from 'react-dom'
import { useOptimistic } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import ChatBubble from './ChatBubble'
import ChatInput from './ChatInput'
import { addShopperMessage } from './actions'
import { useEffect, useRef } from 'react'

interface MessagesProps {
  messages: ProductExtendedChatCompletionMessageParam[]
}

const Messages = ({ messages }: MessagesProps) => {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Box ref={messagesRef} component="div" sx={{ overflowY: 'auto' }}>
      <Box px={3} pb={3}>
        {messages.map((message, i) => {
          return (
            <Box key={i} sx={{ mt: 2 }}>
              <ChatBubble message={message} />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

interface Props {
  initialMessages: ProductExtendedChatCompletionMessageParam[]
}

const Chat = ({ initialMessages }: Props) => {
  const [messages, formAction] = useFormState(
    addShopperMessage,
    initialMessages,
  )
  const formRef = useRef<HTMLFormElement>(null)

  const onFormAction = (formData: FormData) => {
    formAction(formData)

    formRef.current?.reset()
  }

  return (
    <>
      <Messages messages={messages} />

      <Divider />

      <Box ref={formRef} component="form" action={onFormAction} sx={{ p: 3 }}>
        <ChatInput />
      </Box>
    </>
  )
}

export default Chat
