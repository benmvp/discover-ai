'use client'

import type OpenAI from 'openai'
import { useFormState } from 'react-dom'
import { useOptimistic } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
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
  // set up the form state that will be used to send & receive messages from the
  // server
  const [formStateMessages, formAction] = useFormState(
    addShopperMessage,
    initialMessages,
  )

  // set up the optimistic UI state that will be used to add the user message to
  // the UI prior to receiving the updated messages from the server
  const [messages, addOptimisticMessage] = useOptimistic(
    formStateMessages,
    (currMessages, message: OpenAI.ChatCompletionUserMessageParam) => [
      ...currMessages,
      message,
    ],
  )
  const formRef = useRef<HTMLFormElement>(null)

  const onFormAction = async (formData: FormData) => {
    const shopperMessage = formData.get('message')

    if (typeof shopperMessage !== 'string') {
      return
    }

    // optimistically add the user message to the UI
    addOptimisticMessage({ role: 'user', content: shopperMessage })

    formRef.current?.reset()

    // send the user message to the server
    await formAction(shopperMessage)
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
