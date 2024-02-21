import OpenAI from 'openai'

export const isContentAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionAssistantMessageParam =>
  message.role === 'assistant' && message.content !== null

export const isUserMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionUserMessageParam =>
  message.role === 'user' && message.content !== null
