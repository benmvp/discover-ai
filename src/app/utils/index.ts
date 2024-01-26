import OpenAI from 'openai'
import type {
  ExtendedChatCompletionMessageParam,
  ParsedChatCompletionAssistantMessageParam,
  ProductChatCompletionAssistantMessageParam,
  ProductExtendedChatCompletionMessageParam,
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

export const stripProductAssistantMessages = (
  productMessages?: ProductExtendedChatCompletionMessageParam[],
): ExtendedChatCompletionMessageParam[] | undefined =>
  productMessages?.map((productMessage): ExtendedChatCompletionMessageParam => {
    if (!isProductAssistantMessage(productMessage)) {
      return productMessage
    }

    // rest object will be the same as `productMessage` but without `products`
    const { products, ...message } = productMessage

    return message
  })
