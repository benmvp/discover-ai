import OpenAI from 'openai'
import type {
  ExtendedChatCompletionMessageParam,
  ParsedChatCompletionAssistantMessageParam,
  ProductChatCompletionAssistantMessageParam,
  ProductExtendedChatCompletionMessageParam,
} from '@/app/types'
import { isContentAssistantMessage } from '../utils'

export const isParsedAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is ParsedChatCompletionAssistantMessageParam =>
  isContentAssistantMessage(message) && 'skuIds' in message

export const isProductAssistantMessage = (
  message: OpenAI.ChatCompletionMessageParam,
): message is ProductChatCompletionAssistantMessageParam =>
  isParsedAssistantMessage(message) && 'products' in message
/**
 * Strip `skuIds` & `tokenizedContent` from `requestMessages` (added previously
 * by `parseAssistantMessages`) from assistant messages before making the chat
 * request
 */

export const stripExtendedAssistantMessages = (
  extendedMessages?: ExtendedChatCompletionMessageParam[],
): OpenAI.ChatCompletionMessageParam[] | undefined =>
  extendedMessages?.map(
    (extendedMessage): OpenAI.ChatCompletionMessageParam => {
      if (!isParsedAssistantMessage(extendedMessage)) {
        return extendedMessage
      }

      // rest object will be the same as `extendedMessage` but without `skuIds` &
      // `tokenizedContent`
      const {
        filter: filterParams,
        skuIds,
        tokenizedContent,
        ...message
      } = extendedMessage

      return message
    },
  )

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
