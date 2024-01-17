import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Chat from '@/app/components/Chat'
import { chatNext } from '@/app/components/comm'

const Page = async () => {
  // grab the initial messages from the server
  const { messages } = await chatNext()

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto auto',
          height: '100vh',
        }}
      >
        <Toolbar />
        <Chat initialMessages={messages} />
      </Box>
    </Box>
  )
}

export default Page
