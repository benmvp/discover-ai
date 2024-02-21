'use client'

import type OpenAI from 'openai'
import { ReactNode, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import RestartIcon from '@mui/icons-material/RestartAlt'
import AssistantChatBubble from './AssistantChatBubble'
import { isContentAssistantMessage, isUserMessage } from '@/app/utils'
import UserChatBubble from './UserChatBubble'
import { type UseChatData } from './useChat'

export interface Props {
  messages: UseChatData['messages']['messages']
  onReset: UseChatData['handleReset']
  pending?: boolean
  renderAssistantContent?: (
    message: OpenAI.ChatCompletionAssistantMessageParam,
  ) => ReactNode
}

const Messages = ({
  messages,
  onReset,
  pending,
  renderAssistantContent = (message) =>
    message.content && <Box>{message.content}</Box>,
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

        if (isContentAssistantMessage(message)) {
          ui = (
            <AssistantChatBubble>
              {renderAssistantContent(message)}
            </AssistantChatBubble>
          )
        } else if (isUserMessage(message)) {
          ui = <UserChatBubble message={message} />
        }

        return ui ? (
          <Box key={`${message.role}${message.content}`} mt={2}>
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
