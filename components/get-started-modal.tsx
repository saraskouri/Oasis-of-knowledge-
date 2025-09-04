"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Heart, BookOpen, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function GetStartedModal() {
  const [showModal, setShowModal] = useState(false)
  const [animate, setAnimate] = useState(false)

  // Trigger fade-in + bounce on mount
  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const nextSteps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description: "Sign up to join our global community of learners and researchers",
      action: "Sign Up",
      href: "/register",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    },
    {
      icon: Heart,
      title: "Volunteer Your Skills",
      description: "Help translate content, develop features, or spread the word",
      action: "Volunteer",
      href: "/volunteer",
      color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    },
    {
      icon: BookOpen,
      title: "Explore Content",
      description: "Browse our multilingual research library and educational resources",
      action: "Explore",
      href: "/courses",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-block"
      >
        <Button
          onClick={() => setShowModal(true)}
          size="lg"
          className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Get Started
        </Button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full">
                          <Rocket className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome to Oasis of Knowledge! 🌟
                      </CardTitle>
                      <CardDescription className="text-base">
                        Thank you for your interest! Here's how you can get started on your journey with us:
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} className="p-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {nextSteps.map((step, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 text-center">
                          <div className={`p-3 rounded-lg mx-auto mb-3 w-fit ${step.color}`}>
                            <step.icon className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                          <Button asChild size="sm" variant="outline" className="w-full">
                            <Link href={step.href}>{step.action}</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg text-center">
                    <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">🌍 Our Mission</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      We're building a world where knowledge has no language barriers. Every contribution, big or small,
                      helps us democratize education and research for everyone.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary">7 Languages</Badge>
                      <Badge variant="secondary">Global Community</Badge>
                      <Badge variant="secondary">Free Access</Badge>
                      <Badge variant="secondary">Open Source</Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button onClick={() => setShowModal(false)} variant="outline" className="px-8">
                      I'll explore on my own
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
