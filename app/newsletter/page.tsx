"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, Users, Globe, BookOpen, Calendar } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here, you can add real submission logic later (e.g., API or service)
    setSubmitted(true)
  }

  const newsletterFeatures = [
    {
      icon: BookOpen,
      title: "Latest Articles",
      description: "Get notified when new research and educational content is published",
    },
    {
      icon: Users,
      title: "Volunteer Opportunities",
      description: "Be the first to know about new ways to contribute to our mission",
    },
    {
      icon: Calendar,
      title: "Events & Workshops",
      description: "Stay updated on webinars, workshops, and community events",
    },
    {
      icon: Globe,
      title: "Platform Updates",
      description: "Learn about new features, languages, and improvements",
    },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Thank You for Subscribing! 🎉
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                You're now part of the Oasis of Knowledge community. We'll keep you updated with news, events, and
                opportunities to get involved.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary">Welcome aboard!</Badge>
                <Badge variant="secondary">Check your email</Badge>
                <Badge variant="secondary">Stay tuned</Badge>
              </div>
              <Button asChild>
                <a href="/">Return to Homepage</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest news, events, and volunteering opportunities. Join our global community of
            learners and knowledge builders.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">2,450+</h3>
              <p className="text-blue-600 dark:text-blue-400">Newsletter Subscribers</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Monthly</h3>
              <p className="text-purple-600 dark:text-purple-400">Newsletter Frequency</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">7</h3>
              <p className="text-green-600 dark:text-green-400">Languages Available</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Newsletter Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">What You'll Receive</h2>
            {newsletterFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscription Form */}
          <div>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Join Our Community</CardTitle>
                <CardDescription>
                  Get the latest updates delivered directly to your inbox. No spam, unsubscribe anytime.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Privacy Promise</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      We respect your privacy. Your email will only be used for our newsletter and you can unsubscribe
                      at any time. We never share your information with third parties.
                    </p>
                  </div>

                  <Button type="submit" className="w-full text-lg py-3" size="lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Subscribe to Newsletter
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-amber-800 dark:text-amber-200">📧 What to Expect Next</h3>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>• Welcome email with platform overview</li>
                  <li>• Monthly updates on new content and features</li>
                  <li>• Exclusive volunteer opportunities</li>
                  <li>• Early access to new language versions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
