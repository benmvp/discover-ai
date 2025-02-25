'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import AssistantChatBubble from './AssistantChatBubble'
import UserChatBubble from './UserChatBubble'
import { type UseChatData } from './useChat'
import type { Message } from '@/app/types'
import {
  isAssistantContentMessage,
  isAssistantMessage,
  isFunctionCallMessage,
  isUserMessage,
} from '@/app/utils'
import Markdown from './Markdown'

export interface Props {
  messages: UseChatData['messages']['messages']
  pending?: boolean
  renderAssistantContent?: (message: Message) => ReactNode
}

const Messages = ({
  messages,
  pending,
  renderAssistantContent = (message) =>
    typeof message.content === 'string' && <Box>{message.content}</Box>,
}: Props) => {
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
    <Box
      ref={messagesRef}
      component="div"
      sx={{ overflowY: 'auto' }}
      px={3}
      pb={3}
    >
      {messages.map((message) => {
        let ui: React.ReactNode = null

        if (isAssistantContentMessage(message)) {
          // if it's a normal assistant message, it can be the result of a
          // function call and have all of the search results content. So we
          // need to render it with potentially all of the fancy content/
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
    </Box>
  )
}

export default Messages
