import {
  RunnableToolFunction,
  RunnableFunctionWithParse,
  RunnableTools,
} from 'openai/lib/RunnableFunction'
import { RunnableFunctionDeclaration } from '../types'

/**
 * Maps the function declarations to the function tools used during the chat
 * with the OpenAI assistant
 */
export const toRunnableTools = (
  functionDeclarations: RunnableFunctionDeclaration[],
): RunnableTools<object[]> => {
  return functionDeclarations.map(
    (functionDeclaration): RunnableToolFunction<object> => {
      const runnableFunction: RunnableFunctionWithParse<object> = {
        ...functionDeclaration,
        parse: JSON.parse,
      }

      return {
        type: 'function',
        function: runnableFunction,
      } as RunnableToolFunction<object>
    },
  )
}
