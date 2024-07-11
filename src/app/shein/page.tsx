'use client'

import Box from '@mui/material/Box'
import Chat from '@/app/components/Chat'
import { makeUseChat } from '@/app/components/useChat'
import AssistantChatBubbleContent from './AssistantChatBubbleContent'
import {
  stripExtendedAssistantMessages,
  stripProductAssistantMessages,
} from './utils'

const useChat = makeUseChat({
  name: 'shein',
  submitMessages: (assistantType, history, userPrompt) => {
    const strippedHistory = stripExtendedAssistantMessages(
      stripProductAssistantMessages(history),
    )

    return fetch('/api/shein', {
      method: 'POST',
      body: JSON.stringify({
        assistantType,
        history: strippedHistory,
        userPrompt,
      }),
    })
  },
})

const Page = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Chat
        renderAssistantContent={(message) => (
          <AssistantChatBubbleContent message={message} />
        )}
        useChat={useChat}
      />
    </Box>
  )
}

export default Page
