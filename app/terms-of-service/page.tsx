"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, FileText, User, Heart, Shield, Calendar, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-slate-500 to-blue-500 p-4 rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to Oasis of Knowledge. By accessing or using our website, you agree to comply with and be bound by
            the following terms and conditions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  By accessing and using Oasis of Knowledge, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use of Website */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <span>Use of the Website</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Permitted Uses</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Educational and research purposes</li>
                    <li>Sharing knowledge and academic content</li>
                    <li>Participating in community discussions</li>
                    <li>Volunteering and contributing to the platform</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Prohibited Uses</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Harmful, harassing, or illegal activities</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Spreading misinformation or hate speech</li>
                    <li>Commercial use without permission</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content and Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Content and Intellectual Property</CardTitle>
              <CardDescription>Guidelines for content usage and submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Platform Content</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  All content on this site is for educational and informational purposes only. We strive for accuracy
                  but do not guarantee the completeness or reliability of all content.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">User-Generated Content</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  By submitting content, you grant us a non-exclusive license to use, modify, and distribute your
                  content for educational purposes while respecting your authorship.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <span>User Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you create an account, you are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Maintaining the confidentiality of your login information</li>
                  <li>All activity that occurs under your account</li>
                  <li>Providing accurate and up-to-date information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600" />
                <span>Donations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Donations made through the website are voluntary and non-refundable. We commit to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Using donations transparently for platform development and maintenance</li>
                  <li>Providing regular updates on how funds are used</li>
                  <li>Maintaining financial transparency through our transparency page</li>
                  <li>Reserving the right to update funding priorities as needed</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span>Limitation of Liability</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Oasis of Knowledge is provided "as is" without warranties of any kind, either express or implied.
                      We are not liable for:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Any damages arising from the use of the site</li>
                      <li>Interruptions in service or data loss</li>
                      <li>Third-party content or external links</li>
                      <li>Actions taken based on information found on the site</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
              <CardDescription>How we handle your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Please review our{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>Changes to Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We reserve the right to update these terms at any time. When we make changes, we will:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Post the updated terms on this page</li>
                  <li>Update the "Last updated" date</li>
                  <li>Notify users of significant changes via email</li>
                  <li>Provide a reasonable notice period for major changes</li>
                </ul>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-semibold">Last updated: December 2024</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    These terms are effective as of the date listed above
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20 border-slate-200 dark:border-slate-800">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <a
                href="mailto:saraskouri1@gmail.com"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <span>saraskouri1@gmail.com</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
