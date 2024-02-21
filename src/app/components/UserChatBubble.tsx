import type OpenAI from 'openai'
import Box from '@mui/material/Box'

interface Props {
  message: OpenAI.ChatCompletionUserMessageParam
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
        {message.content}
      </Box>
    </Box>
  )
}
export default UserChatBubble
