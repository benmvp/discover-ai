import { AssistantType, Message } from '@/app/types'
import { useCallback, useState, useEffect } from 'react'
import { useAssistantTypeStore } from './useAssistantTypeStore'

export type GetAssistantResponse = (
  assistantType: AssistantType,
  history: Message[],
  userPrompt?: string,
) => Promise<Response>
export type ProcessNewMessages = (
  newMessages: Message[],
) => Message[] | Promise<Message[]>

interface StreamResponseData {
  newMessages: Message[]
}

interface Options {
  /**
   * The name to use for the chat in session storage
   */
  name: string

  /**
   * Call an API to get back the streamed assistant messages based on the user prompt
   */
  getAssistantResponse: GetAssistantResponse

  /**
   * Optionally process any new messages that come in streamed from the API
   */
  processNewMessages?: ProcessNewMessages
}

/**
 * Build a `useChat` Hook that maintains the messages state and sends/streams
 * messages to/from an API.
 */
export const buildUseChat = ({
  name,
  getAssistantResponse,
  processNewMessages = async (newMessages) => newMessages,
}: Options) => {
  /**
   * Maintains the messages state, providing a function to add a new user message.
   */
  const useChat = () => {
    const [messages, setMessages] = useState({
      messages: [] as Message[],
      pending: false,
    })
    const assistantType = useAssistantTypeStore(
      ({ assistantType }) => assistantType,
    )
    const storageKey = `${assistantType}-${name}-ai-messages`

    const submit = useCallback(
      async (history: Message[], userPrompt?: string) => {
        // Submit messages with user content (likely to an API) and get back the new
        // messages with the assistant response (streamed)
        const res = await getAssistantResponse(
          assistantType,
          history,
          userPrompt,
        )

        if (!res.body) {
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        const processStream = async () => {
          const { done, value } = await reader.read()

          if (done) {
            return
          }

          try {
            // the stream may contain multiple sets of messages. but they are separated
            // by newlines, so we can split them and then take the last one
            const responses = decoder.decode(value).trim().split('\n')
            const { newMessages } = JSON.parse(
              responses[responses.length - 1],
            ) as StreamResponseData

            // process the new messages to add any fields
            const processedMessages = await processNewMessages(newMessages)

            // concatenate the new messages with the existing ones we already have
            const allMessages = [...history, ...processedMessages]

            // update the state with the new messages and store them in session storage
            setMessages({
              messages: allMessages,
              pending: false,
            })
            sessionStorage.setItem(storageKey, JSON.stringify(allMessages))
          } catch (error) {
            // somehow the inprogress stream may not be valid JSON. So we catch
            // the error and move on to the next chunk
            console.error('Error processing streamed messages:', error)
          }

          await processStream()
        }

        await processStream()
      },
      [assistantType, storageKey],
    )

    // Store & retrieve messages from session storage in case the user refreshes
    // or navigates away clicking a link. We're only storing for the session
    // because persisting across sessions increases the likelihood of stale data
    // or data that's no longer in the expected format.
    useEffect(() => {
      const savedMessages = sessionStorage.getItem(storageKey)

      if (savedMessages) {
        // TODO: validate the messages to ensure they're still in the expected format
        setMessages({
          messages: JSON.parse(savedMessages),
          pending: false,
        })
      } else {
        // if there are no messages in session storage, retrieve the initial
        // messages state
        submit([])
      }
    }, [submit, storageKey])

    const handleSubmit = useCallback(
      (userPrompt: string) => {
        // submit the new user message to the API as the next user prompt
        submit(messages.messages, userPrompt)

        // optimistically update the UI until the API call returns
        // TODO: Try `useOptimistic` instead?
        setMessages({
          messages: [
            ...messages.messages,
            { type: 'user', content: userPrompt },
          ],
          pending: true,
        })
      },
      [submit, messages.messages],
    )

    const handleReset = useCallback(() => {
      sessionStorage.removeItem(storageKey)

      // reset by retrieving the initial messages state
      submit([])
    }, [storageKey, submit])

    return {
      messages,
      handleSubmit,
      handleReset,
    } as const
  }

  return useChat
}

export type UseChat = ReturnType<typeof buildUseChat>
export type UseChatData = ReturnType<UseChat>
