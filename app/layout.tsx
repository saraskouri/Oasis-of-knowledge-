import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CelebrationEffects } from "@/components/celebration-effects"
import { CookieConsent } from "@/components/cookie-consent"
import { TranslationDebug } from "@/components/translation-debug"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oasis of Knowledge - Multilingual Learning Platform",
  description: "A comprehensive platform for research, learning, and knowledge sharing across multiple languages",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <CelebrationEffects />
              {/* Move TranslationDebug inside the LanguageProvider */}
              {process.env.NODE_ENV === "development" && <TranslationDebug />}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
