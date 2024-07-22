'use client'

import { memo, useEffect, useRef, useState } from 'react'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import type { UseChatData } from './useChat'

interface Props {
  onSubmit: UseChatData['handleSubmit']
  pending?: boolean
}

const ChatInput = memo(function ChatInput({ onSubmit, pending }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input when the component mounts or when pending state changes to false
  useEffect(() => {
    if (!pending && inputRef.current) {
      inputRef.current.focus()
    }
  }, [pending])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
        setValue('')
      }}
    >
      <TextField
        inputRef={inputRef}
        name="message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="What are you looking for?"
        variant="outlined"
        fullWidth
        disabled={pending}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {pending ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <IconButton type="submit" aria-label="Search" edge="end">
                  <SendIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
})

export default ChatInput
