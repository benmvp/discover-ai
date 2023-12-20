import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

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
        <body className={roboto.className}>
          <Container maxWidth="md" sx={{ marginTop: 5, marginBottom: 5 }}>
            {children}
          </Container>
        </body>
      </html>
    </>
  )
}
