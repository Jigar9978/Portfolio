import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jigar Gavle - Portfolio",
  description: "Full Stack Developer Portfolio showcasing my projects and skills",
}
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="overflow-x-hidden">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

