import OpenAI from 'openai';
import { useCallback, useState, useEffect } from 'react';

export type SubmitMessages = (
  requestMessages: OpenAI.ChatCompletionMessageParam[],
) => Promise<Response>;
export type ProcessNewMessages = (
  newMessages: OpenAI.ChatCompletionMessageParam[],
) =>
  | OpenAI.ChatCompletionMessageParam[]
  | Promise<OpenAI.ChatCompletionMessageParam[]>;

interface StreamResponseData {
  newMessages: OpenAI.ChatCompletionMessageParam[];
}

interface Options {
  /**
   * The name to use for the chat in session storage
   */
  name: string;

  /**
   * Call API to get back the new messages with the assistant response
   * (streamed)
   */
  submitMessages: SubmitMessages;

  /**
   * Optionally process any new messages that come in streamed from the API
   */
  processNewMessages?: ProcessNewMessages;
}

/**
 * Makes a `useChat` Hook that maintains the messages state and sends/streams
 * messages to/from an API.
 */
export const makeUseChat = ({
  name,
  submitMessages,
  processNewMessages = async newMessages => newMessages,
}: Options) => {
  const storageKey = `${name}-ai-messages`;

  /**
   * Maintains the messages state, providing a function to add a new user message.
   */
  const useChat = () => {
    const [messages, setMessages] = useState({
      messages: [] as OpenAI.ChatCompletionMessageParam[],
      pending: false,
    });

    const submit = useCallback(
      async (requestMessages: OpenAI.ChatCompletionMessageParam[]) => {
        // Submit messages with user content (likely to an API) and get back the new
        // messages with the assistant response (streamed)
        const res = await submitMessages(requestMessages);

        if (!res.body) {
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        const processStream = async () => {
          const { done, value } = await reader.read();

          if (done) {
            return;
          }

          // the stream may contain multiple sets of messages. but they are separated
          // by newlines, so we can split them and then take the last one
          const responses = decoder.decode(value).trim().split('\n');
          const { newMessages } = JSON.parse(
            responses[responses.length - 1],
          ) as StreamResponseData;

          // process the new messages to add any products
          const processedMessages = await processNewMessages(newMessages);

          // concatenate the new messages with the existing ones we already have
          const allMessages = [...requestMessages, ...processedMessages];

          // update the state with the new messages and store them in session storage
          setMessages({
            messages: allMessages,
            pending: false,
          });
          sessionStorage.setItem(storageKey, JSON.stringify(allMessages));

          await processStream();
        };

        await processStream();
      },
      [],
    );

    // Store & retrieve messages from session storage in case the user refreshes
    // or navigates away clicking a link. We're only storing for the session
    // because persisting across sessions increases the likelihood of stale data
    // or data that's no longer in the expected format.
    useEffect(() => {
      const savedMessages = sessionStorage.getItem(storageKey);

      if (savedMessages) {
        // TODO: validate the messages to ensure they're still in the expected format
        setMessages({
          messages: JSON.parse(savedMessages),
          pending: false,
        });

        // clear the messages from the session storage in case the data was bad.
        // it'll get reset after the next message is sent
        sessionStorage.removeItem(storageKey);
      } else {
        // if there are no messages in session storage, retrieve the initial
        // messages state
        submit([]);
      }
    }, [submit]);

    const handleSubmit = (userMessage: string) => {
      const requestMessages: OpenAI.ChatCompletionMessageParam[] = [
        ...messages.messages,
        {
          role: 'user',
          content: userMessage,
        },
      ];

      // submit the new user message to the API
      submit(requestMessages);

      // optimistically update the UI until the API call returns
      setMessages({
        messages: requestMessages,
        pending: true,
      });
    };

    const handleReset = () => {
      sessionStorage.removeItem(storageKey);

      // reset by retrieving the initial messages state
      submit([]);
    };

    return {
      messages,
      handleSubmit,
      handleReset,
    } as const;
  };

  return useChat;
};
