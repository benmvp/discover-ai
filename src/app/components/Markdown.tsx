import { styled } from '@mui/material'
import ReactMarkdown from 'react-markdown'

const Markdown = styled(ReactMarkdown)(({ theme }) => ({
  '&': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  '& p, & h2, & h3, & h4, & h5, & h6, & ul': {
    margin: 0,
  },
}))

export default Markdown
