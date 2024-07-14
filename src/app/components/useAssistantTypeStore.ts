import { AssistantType } from '@/ai/types'
import { create } from 'zustand'

interface AssistantTypeStore {
  assistantType: AssistantType
  setAssistantType: (assistantType: AssistantType) => void
}

export const useAssistantTypeStore = create<AssistantTypeStore>((set) => ({
  assistantType: 'openai',
  setAssistantType: (assistantType) => set({ assistantType }),
}))
