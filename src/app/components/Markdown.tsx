import { styled } from '@mui/material'
import ReactMarkdown from 'react-markdown'

const Markdown = styled(ReactMarkdown)(({ theme }) => ({
  '&': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  '& p': {
    margin: 0,
  },
}))

export default Markdown
