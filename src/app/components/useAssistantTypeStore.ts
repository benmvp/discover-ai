import { AssistantType } from '@/app/types'
import { create } from 'zustand'

interface AssistantTypeStore {
  assistantType: AssistantType
  setAssistantType: (assistantType: AssistantType) => void
}

export const useAssistantTypeStore = create<AssistantTypeStore>((set) => ({
  assistantType: 'gemini',
  setAssistantType: (assistantType) => set({ assistantType }),
}))
