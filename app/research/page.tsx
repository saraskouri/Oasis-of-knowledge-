"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, BookOpen, ExternalLink, Mail, Linkedin, Globe, Plus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample data - replace with Firebase data later
const researchers = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    photoUrl: "/placeholder.svg?height=200&width=200",
    bio: "Specialist in machine learning and artificial intelligence with focus on educational applications.",
    expertise: ["Machine Learning", "AI in Education", "Data Science"],
    contact: {
      email: "sarah.johnson@university.edu",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      website: "https://sarahjohnson.research.com",
    },
    publications: 45,
    citations: 1250,
  },
  {
    id: "2",
    name: "Prof. Ahmed Hassan",
    photoUrl: "/placeholder.svg?height=200&width=200",
    bio: "Research methodology expert with extensive experience in social sciences and educational research.",
    expertise: ["Research Methodology", "Social Sciences", "Educational Psychology"],
    contact: {
      email: "ahmed.hassan@institute.org",
      linkedin: "https://linkedin.com/in/ahmedhassan",
    },
    publications: 67,
    citations: 2100,
  },
  {
    id: "3",
    name: "Dr. Maria Rodriguez",
    photoUrl: "/placeholder.svg?height=200&width=200",
    bio: "Digital marketing researcher focusing on multilingual content strategies and global education outreach.",
    expertise: ["Digital Marketing", "Multilingual Content", "Global Education"],
    contact: {
      email: "maria.rodriguez@research.edu",
      website: "https://mariarodriguez.research.com",
    },
    publications: 32,
    citations: 890,
  },
]

const projects = [
  {
    id: "1",
    title: "Multilingual AI Translation for Academic Papers",
    summary:
      "Developing AI-powered translation tools specifically designed for academic and scientific content across multiple languages.",
    status: "Active",
    researcherIds: ["1", "2"],
    publicationLinks: ["https://example.com/paper1", "https://example.com/paper2"],
    startDate: "2024-01-15",
    funding: "$150,000",
  },
  {
    id: "2",
    title: "Global Education Accessibility Study",
    summary:
      "Comprehensive research on barriers to education access in developing countries and technology-based solutions.",
    status: "Completed",
    researcherIds: ["2", "3"],
    publicationLinks: ["https://example.com/paper3"],
    startDate: "2023-06-01",
    funding: "$75,000",
  },
  {
    id: "3",
    title: "Community-Driven Learning Platforms",
    summary: "Investigating the effectiveness of peer-to-peer learning in online educational environments.",
    status: "Planning",
    researcherIds: ["1", "3"],
    startDate: "2024-03-01",
    funding: "$200,000",
  },
]

export default function ResearchPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("researchers")

  const filteredResearchers = researchers.filter(
    (researcher) =>
      researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <BookOpen className="mr-3 h-8 w-8 text-blue-600" />
            Research Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our researchers, ongoing projects, and contribute to advancing knowledge accessibility worldwide
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search researchers or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
          <TabsTrigger value="researchers">Researchers</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="researchers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Our Researchers</h2>
            <Button asChild>
              <Link href="/research/submit">
                <Plus className="mr-2 h-4 w-4" />
                Join as Researcher
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResearchers.map((researcher) => (
              <motion.div
                key={researcher.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={researcher.photoUrl || "/placeholder.svg"} alt={researcher.name} />
                      <AvatarFallback>
                        {researcher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{researcher.name}</CardTitle>
                    <CardDescription className="text-sm">{researcher.bio}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {researcher.expertise.map((exp, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-semibold text-lg">{researcher.publications}</div>
                        <div className="text-xs text-muted-foreground">Publications</div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{researcher.citations}</div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-2">
                      {researcher.contact.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${researcher.contact.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {researcher.contact.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={researcher.contact.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {researcher.contact.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={researcher.contact.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Research Projects</h2>
            <Button asChild>
              <Link href="/research/submit-project">
                <Plus className="mr-2 h-4 w-4" />
                Submit Project
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.summary}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        project.status === "Active"
                          ? "default"
                          : project.status === "Completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Start Date:</span>
                      <div>{new Date(project.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Funding:</span>
                      <div>{project.funding}</div>
                    </div>
                    <div>
                      <span className="font-medium">Researchers:</span>
                      <div>{project.researcherIds.length} involved</div>
                    </div>
                  </div>

                  {project.publicationLinks && project.publicationLinks.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Publications:</h4>
                      <div className="space-y-1">
                        {project.publicationLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Publication {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
