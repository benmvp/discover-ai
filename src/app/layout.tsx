import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Header from './components/Header'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Discover AI',
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
          <Header />
          <Container maxWidth="md" sx={{ backgroundColor: 'grey.300' }}>
            {children}
          </Container>
        </Box>
      </html>
    </>
  )
}
