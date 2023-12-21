import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Shopping AI',
  description:
    'An app showcasing different ways to use AI in an e-commerce environment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <Box
          component="body"
          className={roboto.className}
          sx={{ backgroundColor: 'grey.300' }}
        >
          <AppBar component="nav">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shopping AI
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" sx={{ backgroundColor: 'grey.300' }}>
            {children}
          </Container>
        </Box>
      </html>
    </>
  )
}
