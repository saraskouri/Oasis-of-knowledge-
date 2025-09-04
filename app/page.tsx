"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, MessageSquare, FileText, GraduationCap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AboutSection } from "@/components/about-section"
import { GetStartedModal } from "@/components/get-started-modal"
import { SupportPlatformButton } from "@/components/support-platform-button"

export default function HomePage() {
  const { t, currentLanguage } = useLanguage()
  const { user } = useAuth()
  const [celebrationVisible, setCelebrationVisible] = useState(false)

  const stats = [
    { icon: BookOpen, label: t("research_papers"), value: "12,450" },
    { icon: Users, label: t("active_users"), value: "8,920" },
    { icon: GraduationCap, label: t("courses"), value: "340" },
    { icon: Award, label: t("certificates_issued"), value: "5,670" },
  ]

  const categories = [
    { icon: "🔬", name: t("stem"), count: "2,340", color: "bg-blue-100 text-blue-800" },
    { icon: "🏥", name: t("medicine_biology"), count: "1,890", color: "bg-green-100 text-green-800" },
    { icon: "🧠", name: t("psychology"), count: "1,230", color: "bg-purple-100 text-purple-800" },
    { icon: "🏛️", name: t("philosophy"), count: "890", color: "bg-amber-100 text-amber-800" },
    { icon: "🌍", name: t("politics"), count: "1,560", color: "bg-red-100 text-red-800" },
    { icon: "📚", name: t("history"), count: "2,100", color: "bg-indigo-100 text-indigo-800" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("oasis_of_knowledge")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("platform_description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetStartedModal />
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link href="/research">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {t("browse_research")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t("explore_categories")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t("categories_description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                      <Badge className={category.color}>{category.count}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t("platform_features")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{t("structured_courses")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("courses_description")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>{t("research_papers")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("research_description")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>{t("community")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("community_description")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>{t("gamification")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t("gamification_description")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-6">{t("join_community")}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t("join_description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetStartedModal />
              <SupportPlatformButton />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
