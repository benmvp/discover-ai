import Box from '@mui/material/Box'
import Chat from '@/app/components/Chat'
import { chatNext } from '@/app/components/comm'

const Page = async () => {
  // grab the initial messages from the server
  const { messages } = await chatNext()

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Chat initialMessages={messages} />
    </Box>
  )
}

export default Page
