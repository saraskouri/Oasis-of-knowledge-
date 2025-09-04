"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  FileText,
  Eye,
  TrendingUp,
  Award,
  Users,
  Settings,
  PlusCircle,
  Star,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react"
import CommunitySection from "@/components/community-section"

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("overview")

  // Mock data - in real app, this would come from your database
  const stats = {
    articles: 12,
    views: 1847,
    progress: 68,
    badges: 5,
  }

  const recentActivity = [
    {
      id: 1,
      type: "article",
      title: "Published: Advanced Machine Learning Techniques",
      time: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "course",
      title: "Completed: Data Science Fundamentals",
      time: "1 day ago",
      icon: BookOpen,
    },
    {
      id: 3,
      type: "badge",
      title: "Earned: Research Pioneer Badge",
      time: "3 days ago",
      icon: Award,
    },
  ]

  const suggestedReads = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Healthcare",
      author: "Dr. Sarah Chen",
      readTime: "8 min read",
      category: "AI & Health",
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Developing Countries",
      author: "Prof. Ahmed Hassan",
      readTime: "12 min read",
      category: "Environment",
    },
    {
      id: 3,
      title: "Quantum Computing: Breaking Down Complex Concepts",
      author: "Dr. Maria Rodriguez",
      readTime: "15 min read",
      category: "Technology",
    },
  ]

  const dailyQuotes = [
    "Knowledge is power, but sharing knowledge is empowerment.",
    "The best way to learn is to teach others.",
    "Innovation distinguishes between a leader and a follower.",
    "Education is the most powerful weapon to change the world.",
    "The future belongs to those who learn more skills and combine them in creative ways.",
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % dailyQuotes.length)
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(interval)
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("loading")}</h2>
          <p className="text-muted-foreground">Please log in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  const isAdmin = user.email === "sara@oasisofknowledge.com"

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{t("welcome_back", { name: user.displayName || "Researcher" })}</h1>
            <p className="text-muted-foreground mt-2">Ready to continue your learning journey?</p>
          </div>
          {isAdmin && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Settings className="mr-1 h-4 w-4" />
              {t("admin_dashboard")}
            </Badge>
          )}
        </div>

        {/* Daily Quote */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardContent className="p-6">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="font-semibold">{t("daily_quote")}</h3>
            </div>
            <p className="text-lg italic text-muted-foreground">"{dailyQuotes[currentQuote]}"</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="community">{t("community")}</TabsTrigger>
          <TabsTrigger value="courses">{t("my_courses")}</TabsTrigger>
          <TabsTrigger value="research">{t("my_research")}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("posts_published")}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.articles}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("profile_views")}</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.views.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("learning_progress")}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.progress}%</div>
                <Progress value={stats.progress} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("community_badges")}</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.badges}</div>
                <p className="text-xs text-muted-foreground">+1 this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {t("recent_activity")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Suggested Reads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  {t("suggested_reads")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedReads.map((article) => (
                  <div key={article.id} className="space-y-2">
                    <h4 className="text-sm font-medium line-clamp-2">{article.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by {article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex-col space-y-2">
                  <PlusCircle className="h-6 w-6" />
                  <span>{t("submit_work")}</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                  <BookOpen className="h-6 w-6" />
                  <span>Browse Courses</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span>Join Discussion</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community">
          <CommunitySection />
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_courses")}</CardTitle>
              <CardDescription>Track your learning progress and continue your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-4">No courses enrolled yet</p>
                <Button>Browse Available Courses</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_research")}</CardTitle>
              <CardDescription>Manage your research projects and publications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-4">No research projects yet</p>
                <Button>Start New Research</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
