"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Users,
  FileText,
  Globe,
  Search,
  HelpCircle,
  Megaphone,
  HandHeart,
} from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  timestamp: Date
  likes: number
  replies: Reply[]
  isLiked: boolean
}

interface Reply {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  timestamp: Date
  likes: number
  isLiked: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Welcome to our research community!",
    content:
      "I'm excited to be part of this amazing platform. Looking forward to collaborating with researchers from around the world and sharing knowledge that can make a difference.",
    author: {
      name: "Dr. Sarah Ahmed",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Research Scientist",
    },
    category: "general",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 12,
    replies: [
      {
        id: "r1",
        content: "Welcome! This community has been incredibly helpful for my research.",
        author: {
          name: "Ahmed Hassan",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 3,
        isLiked: false,
      },
    ],
    isLiked: false,
  },
  {
    id: "2",
    title: "Looking for collaborators on AI ethics research",
    content:
      "I'm working on a project about ethical implications of AI in healthcare. Would love to connect with researchers who have experience in this area. Let's make AI more responsible together!",
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "PhD Student",
    },
    category: "collaboration",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 8,
    replies: [],
    isLiked: true,
  },
  {
    id: "3",
    title: "Question about statistical analysis methods",
    content:
      "Can anyone recommend the best approach for analyzing longitudinal data with missing values? I'm working with a healthcare dataset and need some guidance.",
    author: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Graduate Student",
    },
    category: "question",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 15,
    replies: [
      {
        id: "r2",
        content: "I'd recommend looking into multiple imputation methods. Happy to share some resources!",
        author: {
          name: "Dr. Lisa Chen",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        likes: 5,
        isLiked: true,
      },
      {
        id: "r3",
        content: "MICE (Multiple Imputation by Chained Equations) works well for this type of data.",
        author: {
          name: "Prof. David Kim",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
        likes: 7,
        isLiked: false,
      },
    ],
    isLiked: false,
  },
]

const categories = [
  { id: "general", icon: FileText, color: "bg-blue-100 text-blue-800" },
  { id: "research", icon: Search, color: "bg-green-100 text-green-800" },
  { id: "question", icon: HelpCircle, color: "bg-yellow-100 text-yellow-800" },
  { id: "announcement", icon: Megaphone, color: "bg-purple-100 text-purple-800" },
  { id: "collaboration", icon: HandHeart, color: "bg-pink-100 text-pink-800" },
]

export default function CommunitySection() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  })
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return t("just_now")
    if (diffInMinutes < 60) return t("minutes_ago", { minutes: diffInMinutes.toString() })

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return t("hours_ago", { hours: diffInHours.toString() })

    const diffInDays = Math.floor(diffInHours / 24)
    return t("days_ago", { days: diffInDays.toString() })
  }

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: user?.displayName || "Anonymous",
        avatar: user?.photoURL || "/placeholder.svg?height=40&width=40",
        role: "Community Member",
      },
      category: newPost.category,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false,
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "", category: "general" })
    setIsCreateModalOpen(false)
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleReply = (postId: string, content: string) => {
    if (!content.trim()) return

    const reply: Reply = {
      id: Date.now().toString(),
      content,
      author: {
        name: user?.displayName || "Anonymous",
        avatar: user?.photoURL || "/placeholder.svg?height=32&width=32",
      },
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
    }

    setPosts(posts.map((post) => (post.id === postId ? { ...post, replies: [...post.replies, reply] } : post)))
  }

  const toggleReplies = (postId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedReplies(newExpanded)
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0]
  }

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{t("community_title")}</h2>
          <p className="text-muted-foreground text-lg">{t("community_intro")}</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-muted-foreground">{t("community_stats_users")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3,891</p>
              <p className="text-sm text-muted-foreground">{t("community_stats_posts")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">67</p>
              <p className="text-sm text-muted-foreground">{t("community_stats_countries")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Post Button */}
      <div className="flex justify-center">
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              {t("create_post")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t("create_post")}</DialogTitle>
              <DialogDescription>
                Share your thoughts, ask questions, or start a discussion with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">{t("post_title")}</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder={t("post_title")}
                />
              </div>
              <div>
                <Label htmlFor="category">{t("post_category")}</Label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          <category.icon className="mr-2 h-4 w-4" />
                          {t(`category_${category.id}`)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">{t("post_content")}</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder={t("post_content")}
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  {t("cancel")}
                </Button>
                <Button onClick={handleCreatePost}>{t("submit")}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">{t("no_posts")}</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => {
            const categoryInfo = getCategoryInfo(post.category)
            const CategoryIcon = categoryInfo.icon

            return (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">{post.author.role}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(post.timestamp)}</p>
                      </div>
                    </div>
                    <Badge className={categoryInfo.color}>
                      <CategoryIcon className="mr-1 h-3 w-3" />
                      {t(`category_${post.category}`)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-4 border-t pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? "text-red-600" : ""}
                    >
                      <Heart className={`mr-1 h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                      {t("like")} ({post.likes})
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleReplies(post.id)}>
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {t("reply")} ({post.replies.length})
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      {t("share")}
                    </Button>
                  </div>

                  {/* Replies */}
                  {expandedReplies.has(post.id) && (
                    <div className="mt-4 space-y-4">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-3 bg-muted/50 p-4 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-semibold text-sm">{reply.author.name}</p>
                              <p className="text-xs text-muted-foreground">{formatTimeAgo(reply.timestamp)}</p>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-6 px-2 text-xs"
                              onClick={() => {
                                /* Handle reply like */
                              }}
                            >
                              <Heart className="mr-1 h-3 w-3" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <ReplyInput
                        onSubmit={(content) => handleReply(post.id, content)}
                        placeholder={t("post_content")}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

// Reply Input Component
function ReplyInput({ onSubmit, placeholder }: { onSubmit: (content: string) => void; placeholder: string }) {
  const [content, setContent] = useState("")
  const { t } = useLanguage()

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  return (
    <div className="flex space-x-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1"
      />
      <Button onClick={handleSubmit} size="sm">
        {t("reply")}
      </Button>
    </div>
  )
}
