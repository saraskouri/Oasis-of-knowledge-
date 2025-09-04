"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Code, Megaphone, Calendar, CheckCircle } from "lucide-react"

export default function VolunteerPage() {
  const { t } = useLanguage()
  const [formStatus, setFormStatus] = useState("Sign Up")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("Submitting...")
    // Simulate submit - no backend yet
    setTimeout(() => {
      alert("Thank you for your interest in volunteering! We will get in touch soon.")
      setFormStatus("Sign Up")
      e.currentTarget.reset()
    }, 1000)
  }

  const volunteerRoles = [
    {
      icon: Globe,
      title: "Translation",
      description: "Translate articles and research into Arabic, French, or English",
      skills: ["Bilingual/Multilingual", "Academic Writing", "Cultural Sensitivity"],
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    },
    {
      icon: Code,
      title: "Development",
      description: "Help improve the website design and features",
      skills: ["React/Next.js", "UI/UX Design", "Web Development"],
      color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    },
    {
      icon: Megaphone,
      title: "Outreach",
      description: "Manage social media and community outreach",
      skills: ["Social Media", "Content Creation", "Community Management"],
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Organize virtual events and workshops",
      skills: ["Event Planning", "Public Speaking", "Workshop Facilitation"],
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Volunteer with Oasis of Knowledge 🤝
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your time and skills can make a huge difference. Join our community of volunteers to help spread knowledge,
            support multilingual research, and build a more open and peaceful world.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">50+</h3>
              <p className="text-blue-600 dark:text-blue-400">Active Volunteers</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">7</h3>
              <p className="text-green-600 dark:text-green-400">Languages Supported</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-6">
              <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">200+</h3>
              <p className="text-purple-600 dark:text-purple-400">Articles Translated</p>
            </CardContent>
          </Card>
        </div>

        {/* Volunteer Roles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerRoles.map((role, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${role.color}`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Join Our Team</CardTitle>
              <CardDescription className="text-center">
                Fill out this form and we'll get in touch with you about volunteer opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" type="text" placeholder="Your full name" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="skills">Skills & Interests *</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    placeholder="Tell us what you're good at or interested in helping with..."
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    name="availability"
                    type="text"
                    placeholder="Days and times you can volunteer (e.g., weekends, 2-3 hours/week)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    placeholder="What motivates you to help with Oasis of Knowledge?"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formStatus === "Submitting..."}
                  className="w-full text-lg py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="lg"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  {formStatus}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                🌍 Building a Global Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Every volunteer brings unique skills and perspectives that help make knowledge more accessible
                worldwide. Whether you can spare 1 hour a week or 10, your contribution matters.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Remote-friendly
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Flexible schedule
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Global impact
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Skill development
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
