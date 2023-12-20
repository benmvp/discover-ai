import { chat } from '@/app/ai/assistant'
import Chat from '@/app/components/Chat'

const Page = async () => {
  const { filter, messages } = await chat()

  console.log(messages, filter)

  return (
    <main>
      <h1>Let's chat</h1>

      {messages && <Chat messages={messages} />}
    </main>
  )
}

export default Page
