'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import RestartIcon from '@mui/icons-material/RestartAlt'
import AssistantChatBubble from './AssistantChatBubble'
import UserChatBubble from './UserChatBubble'
import { type UseChatData } from './useChat'
import type { Message } from '@/ai/types'
import { isAssistantMessage, isUserMessage } from '@/ai/utils'

export interface Props {
  messages: UseChatData['messages']['messages']
  onReset: UseChatData['handleReset']
  pending?: boolean
  renderAssistantContent?: (message: Message) => ReactNode
}

const Messages = ({
  messages,
  onReset,
  pending,
  renderAssistantContent = (message) =>
    isAssistantMessage(message) || isUserMessage(message) ? (
      <Box>{message.content}</Box>
    ) : undefined,
}: Props) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const hasUserMessage = messages.some(isUserMessage)

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
    <Box
      ref={messagesRef}
      component="div"
      sx={{ overflowY: 'auto' }}
      px={3}
      pb={3}
    >
      {messages.map((message) => {
        let ui: React.ReactNode = null

        if (isAssistantMessage(message)) {
          ui = (
            <AssistantChatBubble>
              {renderAssistantContent(message)}
            </AssistantChatBubble>
          )
        } else if (isUserMessage(message)) {
          ui = <UserChatBubble message={message} />
        }

        return ui ? (
          <Box
            key={`${message.type}${
              'content' in message ? message.content : ''
            }`}
            mt={2}
          >
            {ui}
          </Box>
        ) : null
      })}
      {pending && (
        <Box mt={2}>
          <AssistantChatBubble isLoading />
        </Box>
      )}
      {hasUserMessage && (
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fab variant="extended" size="medium" onClick={onReset}>
            <RestartIcon sx={{ mr: 1 }} />
            Reset
          </Fab>
        </Box>
      )}
    </Box>
  )
}

export default Messages
