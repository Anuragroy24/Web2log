import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
// Update the import path if the file exists elsewhere, for example:
import { ThemeProvider } from "../components/theme-provider"
// Or, if the file does not exist, create 'theme-provider.tsx' in the 'components' directory.

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog",
  description: "A personal blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
