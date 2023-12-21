'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import ChatBubble from './ChatBubble'
import ChatInput from './ChatInput'
import { addShopperMessage } from './actions'
import { useEffect, useRef } from 'react'

interface MessagesProps {
  messages: ProductExtendedChatCompletionMessageParam[]
}

const Messages = ({ messages }: MessagesProps) => {
  const { pending } = useFormStatus()
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Box ref={messagesRef} component="div" sx={{ overflowY: 'auto' }}>
      <Box px={3}>
        {messages.map((message, i) => {
          return (
            <Box key={i} sx={{ mt: 2 }}>
              <ChatBubble message={message} />
            </Box>
          )
        })}
      </Box>
      {pending && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,

            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="inherit" size={200} />
        </Box>
      )}
    </Box>
  )
}

interface Props {
  initialMessages: ProductExtendedChatCompletionMessageParam[]
}

const Chat = ({ initialMessages }: Props) => {
  const [messages, addMessageFormAction] = useFormState(
    addShopperMessage,
    initialMessages,
  )
  const formRef = useRef<HTMLFormElement>(null)

  const onFormAction = (formData: FormData) => {
    addMessageFormAction(formData)

    formRef.current?.reset()
  }

  return (
    <Box
      ref={formRef}
      component="form"
      action={onFormAction}
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto auto',
        height: '100vh',
      }}
    >
      <Toolbar />

      <Messages messages={messages} />

      <Divider />

      <Box sx={{ p: 3 }}>
        <ChatInput />
      </Box>
    </Box>
  )
}

export default Chat
