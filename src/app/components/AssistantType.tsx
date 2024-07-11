'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { useAssistantTypeStore } from './useAssistantTypeStore'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function AssistantTypeUi() {
  const assistantType = useAssistantTypeStore(
    ({ assistantType }) => assistantType,
  )
  const setAssistantType = useAssistantTypeStore(
    ({ setAssistantType }) => setAssistantType,
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <ToggleButtonGroup
        color="standard"
        exclusive
        aria-label="Generative AI assistant type"
        value={assistantType}
        onChange={(_, newAssistantType) => {
          if (newAssistantType) {
            setAssistantType(newAssistantType)
          }
        }}
      >
        <ToggleButton value="openai">OpenAI</ToggleButton>
        <ToggleButton value="gemini">Gemini</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  )
}
