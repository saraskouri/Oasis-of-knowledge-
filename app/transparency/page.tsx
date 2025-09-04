"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, DollarSign, Users, Target, TrendingUp, Heart, Server, Code, Megaphone } from "lucide-react"

export default function TransparencyPage() {
  const fundingBreakdown = [
    { category: "Hosting & Infrastructure", percentage: 35, amount: 1750, color: "bg-blue-500" },
    { category: "Content & Translation", percentage: 25, amount: 1250, color: "bg-green-500" },
    { category: "Development", percentage: 20, amount: 1000, color: "bg-purple-500" },
    { category: "Outreach & Marketing", percentage: 15, amount: 750, color: "bg-orange-500" },
    { category: "Administrative", percentage: 5, amount: 250, color: "bg-gray-500" },
  ]

  const monthlyGoal = 5000
  const currentRaised = 3250

  const impactMetrics = [
    { icon: Users, label: "Active Users", value: "8,920", growth: "+12%" },
    { icon: Target, label: "Articles Translated", value: "234", growth: "+45%" },
    { icon: Heart, label: "Volunteer Hours", value: "1,240", growth: "+28%" },
    { icon: TrendingUp, label: "Monthly Visitors", value: "15,600", growth: "+35%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-emerald-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-4 rounded-full">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Transparency Report
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Oasis of Knowledge, we believe in full transparency with our supporters. Here's exactly how your
            donations are used to keep the platform running and growing.
          </p>
        </div>

        {/* Current Funding Status */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                <DollarSign className="h-6 w-6" />
                <span>Monthly Funding Status</span>
              </CardTitle>
              <CardDescription>Our current progress toward this month's operational goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Raised: ${currentRaised.toLocaleString()}</span>
                  <span>Goal: ${monthlyGoal.toLocaleString()}</span>
                </div>
                <Progress value={(currentRaised / monthlyGoal) * 100} className="h-4" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round((currentRaised / monthlyGoal) * 100)}% of monthly goal reached
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funding Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Where Your Donations Go</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Funding Breakdown</CardTitle>
                <CardDescription>How we allocate every dollar donated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fundingBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">${item.amount}</span>
                        <Badge variant="secondary">{item.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                    <Server className="h-5 w-5" />
                    <span>Infrastructure (35%)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Website hosting and domain costs</li>
                    <li>Database and storage services</li>
                    <li>Security and backup systems</li>
                    <li>CDN and performance optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <Users className="h-5 w-5" />
                    <span>Content & Translation (25%)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Supporting volunteer translators</li>
                    <li>Content curation and editing</li>
                    <li>Quality assurance and review</li>
                    <li>Educational material development</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
                    <Code className="h-5 w-5" />
                    <span>Development (20%)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>New feature development</li>
                    <li>Bug fixes and improvements</li>
                    <li>Mobile app development</li>
                    <li>Accessibility enhancements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <metric.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{metric.label}</p>
                  <Badge variant="secondary" className="text-green-600">
                    {metric.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Financial Reports */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Regular updates on our financial status and spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Reports</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>Q4 2024 Report</span>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>Q3 2024 Report</span>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Commitment to Transparency</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We aim to publish quarterly financial reports showing exactly how donations are used. Currently,
                    Oasis of Knowledge is a community-supported project with all funds directly reinvested into the
                    platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Non-Monetary Support */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
              <Heart className="h-6 w-6" />
              <span>Beyond Financial Support</span>
            </CardTitle>
            <CardDescription>Other ways you can help us grow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Volunteer Your Time</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help with translation, content creation, or technical development
                </p>
              </div>
              <div className="text-center">
                <Megaphone className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Spread the Word</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share our platform with friends, researchers, and students
                </p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Become an Ambassador</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Represent Oasis of Knowledge in your community or institution
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
