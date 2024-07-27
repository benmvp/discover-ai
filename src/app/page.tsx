import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import { url } from 'inspector'

const PAGES = [
  {
    name: 'Books',
    description: 'Discover your next favorite read',
    icon: CollectionsBookmarkIcon,
    url: '/books',
  },
  {
    name: 'Clothing',
    description: 'Search for stylish new clothes',
    icon: CheckroomIcon,
    url: '/clothing',
  },
  {
    name: 'Technology',
    description: 'Find the latest & greatest in tech',
    icon: ConnectedTvIcon,
    url: '/tech',
  },
]

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Toolbar />

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {PAGES.map((page, index) => (
          <>
            <ListItemButton key={page.url} component="a" href={page.url}>
              <ListItemAvatar>
                <Avatar>
                  <page.icon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={page.name} secondary={page.description} />
            </ListItemButton>

            {index < PAGES.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        ))}
      </List>
    </Box>
  )
}
