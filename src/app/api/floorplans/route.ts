import { buildPostRoute } from '../route-utils'
import { ASSISTANT_PROMPT, SYSTEM_INSTRUCTION } from './constants'
import { FUNCTION_DECLARATIONS } from './functions'
import { getPlans } from './plans'

// uncomment to use mock data
// import { MOCK_MESSAGES } from './mocks'

export const POST = buildPostRoute({
  assistantPrompt: ASSISTANT_PROMPT,
  getItems: getPlans,
  // uncomment to use mock data
  // mockMessages: MOCK_MESSAGES,
  functionDeclarations: FUNCTION_DECLARATIONS,
  systemInstruction: SYSTEM_INSTRUCTION,
})
