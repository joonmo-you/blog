import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { LangProvider } from '@/context/lang-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { geistSans, geistMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'joonmo.you',
    template: '%s · joonmo.you',
  },
  description: 'Articles on frontend development and book reviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set data-lang before paint to avoid language flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('lang');if(l==='ko')document.documentElement.dataset.lang='ko';else document.documentElement.dataset.lang='en';}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
