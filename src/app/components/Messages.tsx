'use client'

import { useFormStatus } from 'react-dom'
import Box from '@mui/material/Box'
import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import ChatBubble from './ChatBubble'
import { useEffect, useRef } from 'react'
import AssistantChatBubble from './AssistantChatBubble'

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
      <Box px={3} pb={3}>
        {messages.map((message) => {
          return (
            <Box key={`${message.role}${message.content}`} sx={{ mt: 2 }}>
              <ChatBubble message={message} />
            </Box>
          )
        })}
        {pending && (
          <Box sx={{ mt: 2 }}>
            <AssistantChatBubble />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Messages
