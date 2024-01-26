'use client'

import { useFormStatus } from 'react-dom'
import Box from '@mui/material/Box'
import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import { useEffect, useRef } from 'react'
import AssistantChatBubble from './AssistantChatBubble'
import { isProductAssistantMessage, isUserMessage } from '../utils'
import ShopperChatBubble from './ShopperChatBubble'

interface Props {
  messages: ProductExtendedChatCompletionMessageParam[]
}

const Messages = ({ messages }: Props) => {
  const { pending } = useFormStatus()
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // scroll to the bottom of the messages
    if (messagesRef.current !== null) {
      window.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages.length])

  return (
    <Box ref={messagesRef} component="div" sx={{ overflowY: 'auto' }}>
      <Box px={3} pb={3}>
        {messages.map((message) => {
          let ui: React.ReactNode = null

          if (isProductAssistantMessage(message)) {
            ui = <AssistantChatBubble message={message} />
          } else if (isUserMessage(message)) {
            ui = <ShopperChatBubble message={message} />
          }

          return ui ? (
            <Box key={`${message.role}${message.content}`} sx={{ mt: 2 }}>
              {ui}
            </Box>
          ) : null
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
