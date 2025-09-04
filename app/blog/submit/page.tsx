"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, FileText, User, Tag, CheckCircle } from "lucide-react"

export default function SubmitBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    authorName: "",
    authorEmail: "",
    category: "",
    tags: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Announcements", "Volunteering", "Research", "Education", "Technology", "Community"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

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
                Article Submitted Successfully! 🎉
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Thank you for your contribution! Your article has been submitted for review and will be published once
                approved.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary">Under Review</Badge>
                <Badge variant="secondary">Email Notification</Badge>
                <Badge variant="secondary">Community Contribution</Badge>
              </div>
              <div className="space-y-2">
                <Button asChild className="mr-2">
                  <a href="/blog">View All Articles</a>
                </Button>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit Another Article
                </Button>
              </div>
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
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Submit Your Article
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge, insights, and experiences with our global community. Your contribution helps
            democratize education worldwide.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Article Submission Form</CardTitle>
              <CardDescription>
                Fill out the form below to submit your article for review. All submissions are reviewed before
                publication to ensure quality and relevance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Article Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Article Details
                  </h3>

                  <div>
                    <Label htmlFor="title">Article Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter a compelling title for your article"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary">Summary *</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="Write a brief summary that captures the essence of your article (2-3 sentences)"
                      required
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Article Content *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your full article here. You can include research findings, personal experiences, tutorials, or insights related to education, research, or community building."
                      required
                      rows={12}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={handleCategoryChange} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g., education, research, community (comma-separated)"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Author Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Author Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="authorName">Your Name *</Label>
                      <Input
                        id="authorName"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="authorEmail">Your Email *</Label>
                      <Input
                        id="authorEmail"
                        name="authorEmail"
                        type="email"
                        value={formData.authorEmail}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-800 dark:text-blue-200 flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    Submission Guidelines
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>
                      Articles should be original content and relevant to education, research, or community building
                    </li>
                    <li>Minimum 500 words for full articles, 200 words for updates or announcements</li>
                    <li>Use clear, accessible language that can be understood by a global audience</li>
                    <li>Include proper citations for any research or external sources referenced</li>
                    <li>Articles will be reviewed within 3-5 business days</li>
                  </ul>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-3" size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Submitting..." : "Submit Article for Review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
