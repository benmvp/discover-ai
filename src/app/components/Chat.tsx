'use client'

import type OpenAI from 'openai'
import { useFormState } from 'react-dom'
import { useOptimistic } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import type { ProductExtendedChatCompletionMessageParam } from '@/app/types'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { addShopperMessage } from './actions'
import { useRef } from 'react'

interface Props {
  initialMessages: ProductExtendedChatCompletionMessageParam[]
}

const Chat = ({ initialMessages }: Props) => {
  // set up the form state that will be used to send & receive messages from the
  // server
  const [formStateMessages, formAction] = useFormState(
    addShopperMessage,
    initialMessages,
  )

  // set up the optimistic UI state that will be used to add the user message to
  // the UI prior to receiving the updated messages from the server
  const [messages, addOptimisticMessage] = useOptimistic(
    formStateMessages,
    (currMessages, message: OpenAI.ChatCompletionUserMessageParam) => [
      ...currMessages,
      message,
    ],
  )
  const formRef = useRef<HTMLFormElement>(null)

  const onFormAction = async (formData: FormData) => {
    const shopperMessage = formData.get('message')

    if (typeof shopperMessage !== 'string') {
      return
    }

    // optimistically add the user message to the UI
    addOptimisticMessage({ role: 'user', content: shopperMessage })

    formRef.current?.reset()

    // send the user message to the server
    await formAction(shopperMessage)
  }

  return (
    <Box
      ref={formRef}
      component="form"
      action={onFormAction}
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto auto',
        height: '100vh',
      }}
    >
      <Toolbar />

      <Messages messages={messages} />

      <Divider />

      <Box sx={{ p: 3 }}>
        <ChatInput />
      </Box>
    </Box>
  )
}

export default Chat
