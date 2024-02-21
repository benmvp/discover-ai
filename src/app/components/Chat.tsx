'use client'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'

import ChatInput from './ChatInput'
import Messages, { type Props as MessagesProps } from './Messages'
import { type UseChat } from './useChat'

interface Props {
  renderAssistantContent: MessagesProps['renderAssistantContent']
  useChat: UseChat
}

const Chat = ({ renderAssistantContent, useChat }: Props) => {
  const { messages, handleSubmit, handleReset } = useChat()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto auto',
        height: '100vh',
      }}
    >
      <Toolbar />

      <Messages
        messages={messages.messages}
        onReset={handleReset}
        pending={messages.pending}
        renderAssistantContent={renderAssistantContent}
      />

      <Divider />

      <Box sx={{ p: 3 }}>
        <ChatInput onSubmit={handleSubmit} pending={messages.pending} />
      </Box>
    </Box>
  )
}

export default Chat
