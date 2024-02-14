import OpenAI from 'openai';
import { RunnableTools } from 'openai/lib/RunnableFunction';

const chatByFunction = (
  tools: RunnableTools<object[]>,
  messages: OpenAI.ChatCompletionMessageParam[],
) => {
  // Create an OpenAI instance (with the API key)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Guide: https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls
  const streamingRunner = client.beta.chat.completions.runTools({
    model: 'gpt-4',
    stream: true,
    messages,
    tools,
  });

  return streamingRunner;
};

export type ProcessAssistantMessageChunk = (
  assistantMessage: OpenAI.ChatCompletionMessageParam,
) => OpenAI.ChatCompletionMessageParam;
export type ProcessMessages = (
  rawMessages: OpenAI.ChatCompletionMessageParam[],
) => Promise<OpenAI.ChatCompletionMessageParam[]>;

/**
 * Converts the streamed chat completion response to a readable stream
 */
const toChatReadableStream = (
  processAssistantMessageChunk: ProcessAssistantMessageChunk,
  processMessages: ProcessMessages,
  chatResponseStream: ReturnType<typeof chatByFunction>,
) => {
  const allMessages: OpenAI.ChatCompletionMessageParam[] = [];

  // Create a readable stream
  const readableStream = new ReadableStream({
    // Start function called when the stream starts
    start(controller) {
      chatResponseStream
        .on('content', (_, contentSnapshot) => {
          // Grab the full content as the message gets streamed in chunks, and
          // convert to the message format so that we can display it in the
          // frontend as if it were the full message. this will exclude any of
          // the function/tool related messages
          const newMessages = [
            processAssistantMessageChunk({
              role: 'assistant',
              content: contentSnapshot,
            }),
          ];

          controller.enqueue(`\n${JSON.stringify({ newMessages })}`);
        })
        .on('message', message => {
          // as we get messages (like the function messages) append to the list
          // of messages so that we can send the final list of messages at the
          // end.
          allMessages.push(message);
        })
        .on('end', async () => {
          // once we've streamed everything, push one more set of messages that
          // has everything, including the products
          const newMessages = await processMessages(allMessages);

          controller.enqueue(`\n${JSON.stringify({ newMessages })}`);
          controller.close();
        });
    },
  });

  return readableStream;
};

/**
 * Creates a readable stream with the initial messages
 */
const getInitialReadableStream = (
  processMessages: ProcessMessages,
  initialMessages: OpenAI.ChatCompletionMessageParam[],
) => {
  const initialMessagesStream = new ReadableStream({
    start(controller) {
      processMessages(initialMessages).then(newMessages => {
        controller.enqueue(`\n${JSON.stringify({ newMessages })}`);
        controller.close();
      });
    },
  });

  return initialMessagesStream;
};

interface ChatOptions {
  /**
   * Initial/Default messages to use when `messages` is empty to start off
   */
  initialMessages: OpenAI.ChatCompletionMessageParam[];

  /**
   * Messages to pass to the assistant chat
   */
  messages: OpenAI.ChatCompletionMessageParam[];

  /**
   * A function to process a raw assistant message chunk being streamed to the client
   */
  processAssistantMessageChunk?: ProcessAssistantMessageChunk;

  /**
   * A function to process the raw messages from the assistant when the final messages ready to be streamed to the client
   */
  processMessages?: ProcessMessages;

  /**
   * The function tools to use during the chat with the assistant (see: https://github.com/openai/openai-node/blob/HEAD/helpers.md#automated-function-calls)
   */
  tools: RunnableTools<object[]>;
}

/**
 * A generic chat with the assistant, returning a streamed response of messages,
 * configured by the specified parameters
 * @returns A readable stream that can be streamed to a Response
 */
export const chat = ({
  initialMessages,
  messages,
  processAssistantMessageChunk = msg => msg,
  processMessages = async msgs => msgs,
  tools,
}: ChatOptions) => {
  // If there are no messages, stream the initial messages
  if (messages.length === 0) {
    return getInitialReadableStream(processMessages, initialMessages);
  }

  const chatResponse = chatByFunction(tools, messages);

  return toChatReadableStream(
    processAssistantMessageChunk,
    processMessages,
    chatResponse,
  );
};
