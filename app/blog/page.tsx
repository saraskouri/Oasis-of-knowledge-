"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, User, Eye, MessageSquare, BookOpen, Plus, Filter } from "lucide-react"
import Link from "next/link"

// Sample blog posts data - replace with real data from your backend
const blogPosts = [
  {
    id: 1,
    title: "Welcome to the Oasis of Knowledge Blog",
    summary: "Discover how we're spreading knowledge and building a global community of learners and researchers.",
    content: "Full content here...",
    author: "Sara Skouri",
    date: "2024-12-15",
    category: "Announcements",
    tags: ["welcome", "community", "mission"],
    views: 1250,
    comments: 23,
    featured: true,
  },
  {
    id: 2,
    title: "How to Get Involved as a Volunteer",
    summary: "Learn about different ways to contribute your time and skills to help democratize education worldwide.",
    content: "Full content here...",
    author: "Ahmed Hassan",
    date: "2024-12-12",
    category: "Volunteering",
    tags: ["volunteer", "contribute", "skills"],
    views: 890,
    comments: 15,
    featured: false,
  },
  {
    id: 3,
    title: "Breaking Language Barriers in Academic Research",
    summary: "Exploring the challenges and solutions for making scientific knowledge accessible across languages.",
    content: "Full content here...",
    author: "Maria Rodriguez",
    date: "2024-12-10",
    category: "Research",
    tags: ["research", "translation", "accessibility"],
    views: 2100,
    comments: 34,
    featured: true,
  },
  {
    id: 4,
    title: "The Future of Multilingual Education",
    summary: "How technology and community collaboration are reshaping global education accessibility.",
    content: "Full content here...",
    author: "Dr. James Wilson",
    date: "2024-12-08",
    category: "Education",
    tags: ["education", "technology", "future"],
    views: 1560,
    comments: 28,
    featured: false,
  },
]

const categories = ["All", "Announcements", "Volunteering", "Research", "Education", "Technology"]

export default function BlogPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const recentPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
            Oasis of Knowledge Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Articles, updates, and stories about our journey to democratize education
          </p>
        </div>
        <Button className="mt-4 lg:mt-0" asChild>
          <Link href="/blog/submit">
            <Plus className="mr-2 h-4 w-4" />
            Submit Article
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles..."
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
              <Filter className="mr-1 h-3 w-3" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="all">All Articles ({filteredPosts.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({featuredPosts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={post.featured ? "default" : "secondary"}>{post.category}</Badge>
                      {post.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views.toLocaleString()}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          {featuredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No featured articles</h3>
              <p className="text-muted-foreground">Check back soon for featured content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="default">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views.toLocaleString()}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/blog/${post.id}`}>Read Full Article</Link>
                    </Button>
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
