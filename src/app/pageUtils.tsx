import Box from '@mui/material/Box'
import Chat from '@/app/components/Chat'
import { buildUseChat } from '@/app/components/useChat'
import AssistantChatBubbleContent from './components/AssistantChatBubbleContent'
import {
  stripExtendedAssistantMessages,
  stripItemAssistantMessages,
} from './items/utils'

interface BuildChatPageOptions {
  name: string
}

export const buildChatPage = ({ name }: BuildChatPageOptions) => {
  const useChat = buildUseChat({
    name,
    getAssistantResponse: (assistantType, history, userPrompt) => {
      const strippedHistory = stripExtendedAssistantMessages(
        stripItemAssistantMessages(history),
      )

      return fetch(`/api/${name}`, {
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

  return Page
}
