import { buildPostRoute } from '../route-utils'
import { ASSISTANT_PROMPT, SYSTEM_INSTRUCTION } from './constants'
import { FUNCTION_DECLARATIONS } from './functions'
import { getProducts } from './products'

// uncomment to use mock data
// import { MOCK_MESSAGES } from './mocks'

export const POST = buildPostRoute({
  assistantPrompt: ASSISTANT_PROMPT,
  getItems: getProducts,
  functionDeclarations: FUNCTION_DECLARATIONS,
  // uncomment to use mock data
  // mockMessages: MOCK_MESSAGES,
  systemInstruction: SYSTEM_INSTRUCTION,
})
