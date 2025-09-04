"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Star, Clock, Users, Play, BookOpen, Award, Plus, GraduationCap } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Johnson",
    description: "Learn the fundamentals of machine learning with hands-on projects and real-world applications.",
    category: "STEM",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    price: "Free",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 0,
    enrolled: false,
  },
  {
    id: 2,
    title: "Advanced Research Methodology",
    instructor: "Prof. Ahmed Hassan",
    description: "Master advanced research techniques and methodologies for academic and professional research.",
    category: "Education",
    level: "Advanced",
    duration: "12 weeks",
    lessons: 36,
    students: 890,
    rating: 4.9,
    price: "Free",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 65,
    enrolled: true,
  },
  {
    id: 3,
    title: "Digital Marketing Fundamentals",
    instructor: "Maria Rodriguez",
    description: "Comprehensive guide to digital marketing strategies and tools for modern businesses.",
    category: "Business",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 18,
    students: 2100,
    rating: 4.7,
    price: "Free",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 0,
    enrolled: false,
  },
  {
    id: 4,
    title: "Philosophy of Science",
    instructor: "Dr. James Wilson",
    description: "Explore the philosophical foundations of scientific inquiry and knowledge.",
    category: "Philosophy",
    level: "Intermediate",
    duration: "10 weeks",
    lessons: 30,
    students: 650,
    rating: 4.6,
    price: "Free",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 25,
    enrolled: true,
  },
]

export default function CoursesPage() {
  const { t } = useLanguage()
  const { user, addPoints } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("browse")

  const categories = ["all", "STEM", "Medicine", "Philosophy", "Education", "Business", "Art"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const enrolledCourses = courses.filter((course) => course.enrolled)

  const handleEnroll = (courseId: number) => {
    // Simulate enrollment
    console.log(`Enrolled in course ${courseId}`)
    if (user) {
      addPoints(50) // Award points for enrollment
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-blue-600" />
            {t("courses")}
          </h1>
          <p className="text-xl text-muted-foreground">Discover and learn with our comprehensive course library</p>
        </div>
        <Button className="mt-4 lg:mt-0" asChild>
          <Link href="/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            {t("create_course")}
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="browse">{t("browse_courses")}</TabsTrigger>
          <TabsTrigger value="my-courses">
            {t("my_courses")} ({enrolledCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("search")}
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
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {course.category}
                    </Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm">by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">{course.price}</span>
                    <Button size="sm" onClick={() => handleEnroll(course.id)} disabled={course.enrolled}>
                      {course.enrolled ? "Enrolled" : t("enroll_now")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-courses" className="space-y-6">
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses enrolled yet</h3>
              <p className="text-muted-foreground mb-4">Start learning by enrolling in your first course</p>
              <Button onClick={() => setActiveTab("browse")}>Browse Courses</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{t("course_progress")}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        Certificate
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/courses/${course.id}`}>
                        {course.progress > 0 ? t("continue_course") : t("start_course")}
                      </Link>
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
