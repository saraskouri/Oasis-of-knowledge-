"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      // Show after a short delay for better UX
      const timeout = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timeout)
    }
  }, [])

  const acceptCookies = () => {
    setFadeOut(true)
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "true")
      setVisible(false)
      setFadeOut(false)
    }, 500) // match animation duration
  }

  const declineCookies = () => {
    setFadeOut(true)
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "false")
      setVisible(false)
      setFadeOut(false)
    }, 500)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: fadeOut ? 0 : 1, y: fadeOut ? 100 : 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                  <Cookie className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">We use cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    This website uses cookies to enhance your experience and analyze our traffic. By continuing to
                    browse, you agree to our use of cookies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={acceptCookies} size="sm" className="flex-1">
                      Accept All
                    </Button>
                    <Button onClick={declineCookies} variant="outline" size="sm" className="flex-1">
                      Decline
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Learn more in our{" "}
                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={declineCookies} className="p-1 h-auto">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
