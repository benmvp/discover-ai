import { chat } from '@/app/ai/assistant'
import Chat from '@/app/components/Chat'
import Typography from '@mui/material/Typography'

const Page = async () => {
  const { filter, messages } = await chat()

  console.log(messages, filter)

  return (
    <main>
      <Typography variant="h3" component="h1">
        Let's chat
      </Typography>

      {messages && <Chat messages={messages} />}
    </main>
  )
}

export default Page
