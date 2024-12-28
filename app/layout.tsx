import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ApeThisPumpFun',
  description: 'Current metas and meta search for pump.fun',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crypto%20Claus%20(3)-eBSMr9OFd5Q1j2oSeq1DjtJdxEqdUL.png',
    shortcut: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crypto%20Claus%20(3)-eBSMr9OFd5Q1j2oSeq1DjtJdxEqdUL.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crypto%20Claus%20(3)-eBSMr9OFd5Q1j2oSeq1DjtJdxEqdUL.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

