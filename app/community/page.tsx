"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  Globe,
  Heart,
  MessageSquare,
  ExternalLink,
  MapPin,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Workshop: Research Skills for Beginners",
    date: "2024-12-30",
    time: "15:00 GMT",
    type: "Workshop",
    attendees: 45,
    maxAttendees: 100,
  },
  {
    id: 2,
    title: "Live Q&A with Experts in Science & Medicine",
    date: "2025-01-15",
    time: "18:00 GMT",
    type: "Q&A Session",
    attendees: 78,
    maxAttendees: 150,
  },
  {
    id: 3,
    title: "Community Volunteer Meetup",
    date: "2025-02-10",
    time: "14:00 GMT+1",
    type: "Meetup",
    location: "Rabat, Morocco",
    attendees: 23,
    maxAttendees: 50,
  },
]

const memberHighlights = [
  {
    name: "Lina A.",
    role: "Lead Translator",
    avatar: "/placeholder.svg?height=80&width=80",
    contributions: "150+ articles translated",
    languages: ["Arabic", "English", "French"],
    joinDate: "2024-03",
    badges: ["Top Contributor", "Multilingual Expert"],
  },
  {
    name: "Ahmed B.",
    role: "Volunteer Coordinator",
    avatar: "/placeholder.svg?height=80&width=80",
    contributions: "50+ volunteers onboarded",
    languages: ["Arabic", "English"],
    joinDate: "2024-05",
    badges: ["Community Builder", "Mentor"],
  },
  {
    name: "Dr. Maria R.",
    role: "Research Specialist",
    avatar: "/placeholder.svg?height=80&width=80",
    contributions: "25+ research papers reviewed",
    languages: ["Spanish", "English", "Portuguese"],
    joinDate: "2024-02",
    badges: ["Expert Reviewer", "Academic Leader"],
  },
  {
    name: "Sara S.",
    role: "Founder & Platform Developer",
    avatar: "/placeholder.svg?height=80&width=80",
    contributions: "Platform creator & maintainer",
    languages: ["Arabic", "English", "French"],
    joinDate: "2024-01",
    badges: ["Founder", "Visionary", "Developer"],
  },
]

const communityStats = [
  { icon: Users, label: "Active Members", value: "2,450+", growth: "+15%" },
  { icon: Globe, label: "Countries", value: "45", growth: "+8%" },
  { icon: MessageSquare, label: "Discussions", value: "890", growth: "+25%" },
  { icon: Heart, label: "Volunteer Hours", value: "1,240", growth: "+30%" },
]

const socialLinks = [
  {
    name: "Discord Server",
    description: "Join our real-time community chat",
    href: "#",
    icon: "💬",
    members: "450+",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
  },
  {
    name: "Facebook Group",
    description: "Connect with members worldwide",
    href: "#",
    icon: "📘",
    members: "1,200+",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  },
  {
    name: "LinkedIn Network",
    description: "Professional networking and opportunities",
    href: "https://www.linkedin.com/in/sara-skouri-415774342",
    icon: "💼",
    members: "800+",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
  },
  {
    name: "Newsletter",
    description: "Monthly updates and highlights",
    href: "/newsletter",
    icon: "📧",
    members: "2,100+",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Join the Oasis Community 🌍
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Together, we're creating a welcoming space to share knowledge, collaborate, and grow. Connect with learners,
          researchers, and educators from around the world.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {communityStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <stat.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
              <Badge variant="secondary" className="text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.growth}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                  Join Discussions
                </CardTitle>
                <CardDescription>Participate in community conversations and share your knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/discussions">View Discussions</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Volunteer
                </CardTitle>
                <CardDescription>Contribute your skills and help democratize education worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/volunteer">Get Involved</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-green-600" />
                  Share Knowledge
                </CardTitle>
                <CardDescription>Submit articles, research, or educational content to our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/blog/submit">Submit Content</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Community Activity</CardTitle>
              <CardDescription>See what's happening in our community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">New member joined from Nigeria</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Research paper translated to Arabic</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium">New discussion started about AI in education</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground">Join our community events and workshops</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{event.type}</Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {event.location && (
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                    <Badge variant="secondary">{Math.round((event.attendees / event.maxAttendees) * 100)}% full</Badge>
                  </div>
                  <Button className="w-full">Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Member Highlights</h2>
            <p className="text-muted-foreground">Meet some of our amazing community contributors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberHighlights.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{member.contributions}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {member.languages.map((lang, langIndex) => (
                      <Badge key={langIndex} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Member since {new Date(member.joinDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connect" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground">Join our community on various platforms and stay connected</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${link.color}`}>
                      <span className="text-2xl">{link.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{link.name}</h3>
                      <p className="text-muted-foreground mb-3">{link.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{link.members} members</Badge>
                        <Button asChild size="sm">
                          <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : "_self"}>
                            Join
                            {link.href.startsWith("http") && <ExternalLink className="ml-1 h-3 w-3" />}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
                🌟 Ready to Join Our Community?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Whether you're a student, researcher, educator, or simply passionate about learning, there's a place for
                you in our community. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">Join the Community</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/volunteer">Become a Volunteer</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
