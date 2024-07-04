import { RunnableFunctionWithParse } from 'openai/lib/RunnableFunction'

/**
 * The assistant types that can fulfill the chat request
 */
export type AssistantType = 'openai'

// NOTE: We're using the OpenAI library types as the base for our types

export type RunnableFunctionDeclaration<Args extends object = any> = Omit<
  RunnableFunctionWithParse<Args>,
  'parse'
>
