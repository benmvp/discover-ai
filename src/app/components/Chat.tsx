'use client'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import RestartIcon from '@mui/icons-material/RestartAlt'

import ChatInput from './ChatInput'
import Messages, { type Props as MessagesProps } from './Messages'
import { type UseChat } from './useChat'
import { isUserMessage } from '@/app/utils'
import Link from './Link'
import { DiscoveryName } from '../types'
import { DiscoveryNameSources } from '../page-utils'

interface Props {
  name: DiscoveryName
  renderAssistantContent: MessagesProps['renderAssistantContent']
  useChat: UseChat
}

const Chat = ({ name, renderAssistantContent, useChat }: Props) => {
  const { messages, handleSubmit, handleReset } = useChat()
  const hasUserMessage = messages.messages.some(isUserMessage)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto auto auto',
        height: '100vh',
      }}
    >
      <Toolbar />

      <Messages
        messages={messages.messages}
        pending={messages.pending}
        renderAssistantContent={renderAssistantContent}
      />

      {hasUserMessage && (
        <Box my={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Fab variant="extended" size="medium" onClick={handleReset}>
            <RestartIcon sx={{ mr: 1 }} />
            Reset
          </Fab>
        </Box>
      )}

      <Divider />

      <Box sx={{ p: 3 }}>
        <ChatInput onSubmit={handleSubmit} pending={messages.pending} />

        <Box mt={1} textAlign="right">
          * Source:{' '}
          <Link
            href={DiscoveryNameSources[name].url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {DiscoveryNameSources[name].name}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat
