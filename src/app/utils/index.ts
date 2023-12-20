import OpenAI from 'openai'
import type {
  ParsedChatCompletionAssistantMessageParam,
  ProductChatCompletionAssistantMessageParam,
} from '@/app/types'

export const isAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionAssistantMessageParam =>
  message.role === 'assistant' && message.content !== null

export const isUserMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is OpenAI.ChatCompletionUserMessageParam =>
  message.role === 'user' && message.content !== null

export const isParsedAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is ParsedChatCompletionAssistantMessageParam =>
  isAssistantMessage(message) && 'skuIds' in message

export const isProductAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is ProductChatCompletionAssistantMessageParam =>
  isParsedAssistantMessage(message) && 'products' in message
