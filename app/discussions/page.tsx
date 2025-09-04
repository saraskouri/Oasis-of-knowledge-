"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, Plus, Clock, Eye, TrendingUp, X } from "lucide-react"
import Link from "next/link"

// Sample discussions data - replace with real data from your backend
const sampleDiscussions = [
  {
    id: 1,
    title: "How to get started with academic research?",
    author: "Lina A.",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    replies: 15,
    views: 234,
    lastUpdated: "2024-12-15",
    category: "Research",
    tags: ["research", "beginner", "academic"],
    isHot: true,
  },
  {
    id: 2,
    title: "Best free resources for learning biology",
    author: "Ahmed B.",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    replies: 8,
    views: 156,
    lastUpdated: "2024-12-14",
    category: "Education",
    tags: ["biology", "resources", "free"],
    isHot: false,
  },
  {
    id: 3,
    title: "Volunteering opportunities in Morocco",
    author: "Sara S.",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    replies: 23,
    views: 445,
    lastUpdated: "2024-12-13",
    category: "Community",
    tags: ["volunteer", "morocco", "opportunities"],
    isHot: true,
  },
  {
    id: 4,
    title: "Translation challenges in scientific papers",
    author: "Dr. Maria R.",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    replies: 12,
    views: 189,
    lastUpdated: "2024-12-12",
    category: "Translation",
    tags: ["translation", "science", "challenges"],
    isHot: false,
  },
]

const categories = ["All", "Research", "Education", "Community", "Translation", "Technology"]

export default function DiscussionsPage() {
  const { user } = useAuth()
  const [discussions, setDiscussions] = useState(sampleDiscussions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewTopicForm, setShowNewTopicForm] = useState(false)
  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    category: "",
  })

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const hotDiscussions = filteredDiscussions.filter((d) => d.isHot)
  const recentDiscussions = filteredDiscussions.sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
  )

  const handleSubmitTopic = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTopic.title.trim() || !user) return

    const newDiscussion = {
      id: discussions.length + 1,
      title: newTopic.title.trim(),
      author: user.name || "Anonymous",
      authorAvatar: user.avatar || "/placeholder.svg?height=40&width=40",
      replies: 0,
      views: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      category: newTopic.category || "General",
      tags: [],
      isHot: false,
    }

    setDiscussions([newDiscussion, ...discussions])
    setNewTopic({ title: "", content: "", category: "" })
    setShowNewTopicForm(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-purple-600" />
            Community Discussions
          </h1>
          <p className="text-xl text-muted-foreground">
            Share questions, ideas, and knowledge with our global community
          </p>
        </div>
        {user ? (
          <Button className="mt-4 lg:mt-0" onClick={() => setShowNewTopicForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        ) : (
          <Button className="mt-4 lg:mt-0" asChild>
            <Link href="/login">Login to Participate</Link>
          </Button>
        )}
      </div>

      {/* New Topic Form Modal */}
      {showNewTopicForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Start New Discussion</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewTopicForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Share your question or topic with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTopic} className="space-y-4">
                <div>
                  <Label htmlFor="topic-title">Discussion Title *</Label>
                  <Input
                    id="topic-title"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                    placeholder="What would you like to discuss?"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="topic-content">Description</Label>
                  <Textarea
                    id="topic-content"
                    value={newTopic.content}
                    onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                    placeholder="Provide more details about your discussion topic..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Start Discussion
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewTopicForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="recent">Recent ({recentDiscussions.length})</TabsTrigger>
          <TabsTrigger value="hot">
            Hot <TrendingUp className="ml-1 h-3 w-3" /> ({hotDiscussions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {recentDiscussions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No discussions found</h3>
              <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
              {user && (
                <Button onClick={() => setShowNewTopicForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Start First Discussion
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {recentDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.authorAvatar || "/placeholder.svg"}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                              {discussion.title}
                              {discussion.isHot && (
                                <Badge variant="destructive" className="ml-2">
                                  Hot
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                          </div>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>

                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {discussion.views} views
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(discussion.lastUpdated).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {discussion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hot" className="space-y-4">
          {hotDiscussions.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hot discussions</h3>
              <p className="text-muted-foreground">Start engaging conversations to see them here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {hotDiscussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.authorAvatar || "/placeholder.svg"}
                        alt={discussion.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                              {discussion.title}
                              <Badge variant="destructive" className="ml-2">
                                🔥 Hot
                              </Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                          </div>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>

                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {discussion.views} views
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(discussion.lastUpdated).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
