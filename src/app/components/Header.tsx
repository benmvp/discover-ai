import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AssistantTypeUi from './AssistantType'
import Link from './Link'

const Header = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Link
          href="/"
          variant="h6"
          color="inherit"
          underline="none"
          aria-label="Go to apps list"
          sx={{ flexGrow: 1 }}
        >
          Discover AI
        </Link>

        <AssistantTypeUi />
      </Toolbar>
    </AppBar>
  )
}

export default Header
