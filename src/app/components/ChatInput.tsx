'use client'

import { useFormStatus } from 'react-dom'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const ChatInput = () => {
  const { pending } = useFormStatus()

  return (
    <TextField
      name="message"
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
  )
}

export default ChatInput
