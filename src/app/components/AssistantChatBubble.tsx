import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

const LoadingCircle = styled(Box)({
  '@keyframes pulse': {
    from: { opacity: 0 },
    '50%': { opacity: 1 },
    to: { opacity: 0 },
  },
  animation: 'pulse 0.75s infinite',
  background: 'white',
  width: 15,
  height: 15,
  borderRadius: '50%',
})

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <LoadingCircle />
      <LoadingCircle sx={{ animationDelay: '75ms' }} />
      <LoadingCircle sx={{ animationDelay: '150ms' }} />
    </Box>
  )
}

interface Props {
  children?: ReactNode
  isLoading?: boolean
}

const AssistantChatBubble = ({ children, isLoading }: Props) => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'success.main',
          color: 'success.contrastText',
          borderRadius: 6,
          borderTopLeftRadius: 0,
          padding: 2,
          maxWidth: isLoading ? undefined : '80%',
          overflow: 'hidden',

          display: isLoading ? 'inline-block' : 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {isLoading ? <Loading /> : children}
      </Box>
    </Box>
  )
}

export default AssistantChatBubble
