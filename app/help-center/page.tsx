"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  MessageSquare,
  Shield,
  BookOpen,
  Users,
  Settings,
  ChevronRight,
  ExternalLink,
  Mail,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HelpCenterPage() {
  const { t } = useLanguage()

  const quickActions = [
    {
      icon: MessageSquare,
      title: t("contact_support"),
      description: t("contact_support_desc"),
      href: "/contact",
      action: t("contact_us"),
    },
    {
      icon: Users,
      title: t("community_support"),
      description: t("community_support_desc"),
      href: "/community",
      action: t("join_community"),
    },
    {
      icon: Shield,
      title: t("privacy_security"),
      description: t("privacy_security_desc"),
      href: "/privacy-policy",
      action: t("privacy_policy"),
    },
  ]

  const faqItems = [
    {
      question: t("faq_language_switch"),
      answer: t("faq_language_switch_answer"),
    },
    {
      question: t("faq_contribute_content"),
      answer: t("faq_contribute_content_answer"),
    },
    {
      question: t("faq_report_problem"),
      answer: t("faq_report_problem_answer"),
    },
    {
      question: t("faq_data_safety"),
      answer: t("faq_data_safety_answer"),
    },
    {
      question: t("faq_free_platform"),
      answer: t("faq_free_platform_answer"),
    },
    {
      question: t("faq_offline_access"),
      answer: t("faq_offline_access_answer"),
    },
  ]

  const helpCategories = [
    {
      icon: BookOpen,
      title: t("getting_started"),
      description: t("getting_started_desc"),
      articles: [
        { title: t("how_to_create_account"), href: "#" },
        { title: t("platform_navigation"), href: "#" },
        { title: t("language_switching"), href: "#" },
      ],
    },
    {
      icon: Settings,
      title: t("research_learning"),
      description: t("research_learning_desc"),
      articles: [
        { title: t("searching_research"), href: "#" },
        { title: t("enrolling_courses"), href: "#" },
        { title: t("tracking_progress"), href: "#" },
      ],
    },
    {
      icon: Users,
      title: t("community_help"),
      description: t("community_help_desc"),
      articles: [
        { title: t("joining_discussions"), href: "#" },
        { title: t("contributing_content"), href: "#" },
        { title: t("volunteer_opportunities"), href: "#" },
      ],
    },
    {
      icon: Settings,
      title: t("technical_support"),
      description: t("technical_support_desc"),
      articles: [
        { title: t("troubleshooting"), href: "#" },
        { title: t("browser_compatibility"), href: "#" },
        { title: t("mobile_access"), href: "#" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("help_center_title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("help_center_subtitle")}
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <action.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{action.description}</CardDescription>
                <Button asChild className="w-full">
                  <Link href={action.href}>
                    {action.action}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t("frequently_asked_questions")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start space-x-2">
                    <HelpCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{t("help_categories")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href={article.href}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <span className="text-sm font-medium">{article.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {t("guide")}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">{t("need_more_help")}</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{t("need_more_help_desc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("contact_us")}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  asChild
                >
                  <Link href="https://linkedin.com/in/saraskouri" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    {t("connect_linkedin")}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
