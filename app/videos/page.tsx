"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Calendar, Users, Search, Video, Tv, Trophy, Clock } from "lucide-react"
import { motion } from "framer-motion"

const sampleVideos = {
  recorded: [
    {
      id: 1,
      title: "Biology Basics: Cell Structure",
      description: "Learn about the fundamental components of cells and their functions.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "https://youtu.be/abc123",
      duration: "15:30",
      views: 1250,
      category: "Biology",
    },
    {
      id: 2,
      title: "Physics Explained: Newton's Laws",
      description: "Understanding the three fundamental laws of motion.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "https://youtu.be/xyz789",
      duration: "22:45",
      views: 890,
      category: "Physics",
    },
  ],
  webinars: [
    {
      id: 3,
      title: "Live Webinar: Climate Change Solutions",
      description: "Join experts discussing innovative approaches to climate challenges.",
      date: "2025-07-01T15:00:00Z",
      url: "https://zoom.us/j/123456",
      attendees: 150,
      category: "Environment",
    },
    {
      id: 4,
      title: "Research Methods in Social Sciences",
      description: "Learn advanced research methodologies from leading academics.",
      date: "2025-07-15T14:00:00Z",
      url: "https://zoom.us/j/789012",
      attendees: 200,
      category: "Research",
    },
  ],
  live: [
    {
      id: 5,
      title: "Live Q&A: Neuroscience Discoveries",
      description: "Real-time discussion about recent breakthroughs in neuroscience.",
      url: "https://www.youtube.com/embed/live_stream",
      viewers: 45,
      category: "Neuroscience",
    },
  ],
  competitions: [
    {
      id: 6,
      title: "Science Video Challenge 2025",
      description: "Submit your best science explanation videos and win prizes!",
      deadline: "2025-08-30",
      prizes: ["$500", "$300", "$200"],
      participants: 78,
    },
    {
      id: 7,
      title: "Research Presentation Contest",
      description: "Present your research findings in a 5-minute video format.",
      deadline: "2025-09-15",
      prizes: ["Publication opportunity", "Conference ticket", "Mentorship"],
      participants: 34,
    },
  ],
}

export default function VideosPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("recorded")
  const [searchQuery, setSearchQuery] = useState("")

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "recorded":
        return <Video className="h-4 w-4" />
      case "webinars":
        return <Calendar className="h-4 w-4" />
      case "live":
        return <Tv className="h-4 w-4" />
      case "competitions":
        return <Trophy className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Play className="mr-3 h-8 w-8 text-blue-600" />
            Videos & Webinars
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our video content, join live webinars, and participate in competitions!
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recorded" className="flex items-center gap-2">
            {getTabIcon("recorded")}
            Recorded
          </TabsTrigger>
          <TabsTrigger value="webinars" className="flex items-center gap-2">
            {getTabIcon("webinars")}
            Webinars
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            {getTabIcon("live")}
            Live
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            {getTabIcon("competitions")}
            Contests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recorded" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.recorded.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="mb-2">
                        {video.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                    <CardDescription className="text-sm">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {video.views.toLocaleString()} views
                      </div>
                      <Button size="sm" asChild>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          Watch Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleVideos.webinars.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {webinar.category}
                    </Badge>
                    <Badge variant="outline" className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Upcoming
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                  <CardDescription>{webinar.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(webinar.date).toLocaleString()}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {webinar.attendees} registered
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <a href={webinar.url} target="_blank" rel="noopener noreferrer">
                      Register for Webinar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {sampleVideos.live.map((stream) => (
              <Card key={stream.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {stream.category}
                    </Badge>
                    <Badge variant="destructive" className="animate-pulse">
                      🔴 LIVE
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{stream.title}</CardTitle>
                  <CardDescription>{stream.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Tv className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Live stream embed would go here</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {stream.viewers} watching now
                    </div>
                    <Button size="sm" asChild>
                      <a href={stream.url} target="_blank" rel="noopener noreferrer">
                        Join Live Stream
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleVideos.competitions.map((competition) => (
              <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      <Trophy className="h-3 w-3 mr-1" />
                      Competition
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{competition.title}</CardTitle>
                  <CardDescription>{competition.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{new Date(competition.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-medium">{competition.participants}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Prizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {competition.prizes.map((prize, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {prize}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Participate Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
