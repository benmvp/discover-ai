import Box from '@mui/material/Box'
import { UserMessage } from '@/ai/types'
import Markdown from './Markdown'

interface Props {
  message: UserMessage
}

const UserChatBubble = ({ message }: Props) => {
  if (typeof message.content !== 'string') {
    return null
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 6,
          borderBottomRightRadius: 0,
          padding: 2,
          maxWidth: '50%',
        }}
      >
        <Markdown>{message.content}</Markdown>
      </Box>
    </Box>
  )
}
export default UserChatBubble
