import Box from '@mui/material/Box'
import Chat from '@/app/components/Chat'
import { buildUseChat } from '@/app/components/useChat'
import AssistantChatBubbleContent from './components/AssistantChatBubbleContent'
import {
  stripExtendedAssistantMessages,
  stripItemAssistantMessages,
} from './items/utils'
import { DiscoveryName } from './types'

interface BuildChatPageOptions {
  /**
   * The name/source of the chat
   */
  name: DiscoveryName
}

/**
 * Builds a chat page for the given data source
 */
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
          name={name}
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

export const DiscoveryNameSources: Record<
  DiscoveryName,
  { name: string; url: string }
> = {
  books: {
    name: 'Google Books API',
    url: 'https://developers.google.com/books',
  },
  clothing: {
    name: 'Kaggle Shein dataset',
    url: 'https://www.kaggle.com/datasets/trainingdatapro/shein-e-commerce-dataset',
  },
  tech: {
    name: 'Best Buy API',
    url: 'https://developer.bestbuy.com',
  },
}
