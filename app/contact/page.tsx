"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Linkedin, Send, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formStatus, setFormStatus] = useState("Send Message")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("Sending...")
    // For now, no backend connection — just simulate submit
    setTimeout(() => {
      alert("Thank you for reaching out! I'll get back to you soon.")
      setFormStatus("Send Message")
      e.currentTarget.reset()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Connect 💬
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            If you have questions, want to collaborate, or just want to say hi — reach out! Oasis of Knowledge is open
            to the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:saraskouri1@gmail.com"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  saraskouri1@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-2">I usually respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.linkedin.com/in/sara-skouri-415774342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                >
                  Sara Skouri
                </a>
                <p className="text-sm text-muted-foreground mt-2">Let's connect professionally</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                  <Clock className="h-5 w-5" />
                  <span>Response Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-700 dark:text-green-300">Usually within 24 hours</p>
                <p className="text-sm text-muted-foreground mt-2">I'm based in Tunisia (GMT+1)</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
                  <MapPin className="h-5 w-5" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-amber-700 dark:text-amber-300">Tunisia 🇹🇳</p>
                <p className="text-sm text-muted-foreground mt-2">Building bridges across cultures</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  I'd love to hear from you! Whether it's feedback, collaboration ideas, or just to say hello.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" name="name" type="text" placeholder="Your name" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="Your email" required className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" type="text" placeholder="What's this about?" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      required
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === "Sending..."}
                    className="w-full text-lg py-3"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {formStatus}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">🌟 About Sara Skouri</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a high school senior passionate about democratizing education and breaking down language barriers in
                academia. Through Oasis of Knowledge, I'm working to make research and learning accessible to everyone,
                regardless of their language or background.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
