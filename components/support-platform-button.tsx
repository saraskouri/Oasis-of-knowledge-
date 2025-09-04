"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, Users, Share2, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function SupportPlatformButton() {
  const [showModal, setShowModal] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const supportOptions = [
    {
      icon: DollarSign,
      title: "Financial Support",
      description: "Help us keep the platform free and accessible",
      actions: [
        { name: "Ko-fi", href: "https://ko-fi.com/saritaskouri", color: "bg-red-500 hover:bg-red-600" },
        { name: "PayPal", href: "#", color: "bg-blue-500 hover:bg-blue-600" },
        { name: "Donate Page", href: "/donate", color: "bg-purple-500 hover:bg-purple-600" },
      ],
    },
    {
      icon: Users,
      title: "Volunteer Your Time",
      description: "Contribute your skills to help our mission",
      actions: [
        { name: "Join Volunteers", href: "/volunteer", color: "bg-green-500 hover:bg-green-600" },
        { name: "Translation Help", href: "/volunteer", color: "bg-emerald-500 hover:bg-emerald-600" },
      ],
    },
    {
      icon: Share2,
      title: "Spread the Word",
      description: "Share our platform with friends and community",
      actions: [
        { name: "Share on Social", href: "#", color: "bg-orange-500 hover:bg-orange-600" },
        { name: "Tell Friends", href: "#", color: "bg-pink-500 hover:bg-pink-600" },
      ],
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
          className="text-lg px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
        >
          <Heart className="mr-2 h-5 w-5" />
          Support the Platform
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
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="shadow-2xl border-2 border-red-200 dark:border-red-800">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-red-500 to-pink-500 p-3 rounded-full">
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        Support Oasis of Knowledge 💖
                      </CardTitle>
                      <CardDescription className="text-base">
                        Your support helps us keep the platform free, improve content, and reach more learners
                        worldwide. Every contribution makes a difference!
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} className="p-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {supportOptions.map((option, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mx-auto mb-3 w-fit">
                              <option.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                          </div>
                          <div className="space-y-2">
                            {option.actions.map((action, actionIndex) => (
                              <Button
                                key={actionIndex}
                                asChild
                                size="sm"
                                className={`w-full ${action.color} text-white`}
                              >
                                <Link href={action.href} target={action.href.startsWith("http") ? "_blank" : "_self"}>
                                  {action.name}
                                  {action.href.startsWith("http") && <ExternalLink className="ml-2 h-3 w-3" />}
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-lg text-center">
                    <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">🌟 Why Your Support Matters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <p className="mb-2">
                          <strong>🌍 Global Impact:</strong> Help break down language barriers in education
                        </p>
                        <p className="mb-2">
                          <strong>💡 Free Access:</strong> Keep knowledge accessible to everyone, everywhere
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <strong>🚀 Innovation:</strong> Fund new features and improvements
                        </p>
                        <p className="mb-2">
                          <strong>🤝 Community:</strong> Support a growing global learning community
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Badge variant="secondary">7 Languages</Badge>
                      <Badge variant="secondary">Free Forever</Badge>
                      <Badge variant="secondary">Community Driven</Badge>
                      <Badge variant="secondary">Open Source</Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Can't contribute financially? No problem! Sharing our platform and volunteering your time are
                      equally valuable.
                    </p>
                    <Button onClick={() => setShowModal(false)} variant="outline" className="px-8">
                      Close
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
