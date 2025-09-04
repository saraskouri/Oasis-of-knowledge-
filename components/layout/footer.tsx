"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Heart, BookOpen, Globe, Twitter, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    platform: [
      { name: t("courses"), href: "/courses" },
      { name: t("videos_webinars"), href: "/videos" },
      { name: t("blog"), href: "/blog" },
      { name: t("discussions"), href: "/discussions" },
      { name: t("community"), href: "/community" },
    ],
    support: [
      { name: t("help_center"), href: "/help" },
      { name: t("contact_us"), href: "/contact" },
      { name: t("privacy_policy"), href: "/privacy-policy" },
      { name: t("terms_of_service"), href: "/terms-of-service" },
    ],
    connect: [
      { name: t("newsletter"), href: "/newsletter" },
      { name: t("volunteer"), href: "/volunteer" },
      { name: t("donate"), href: "/donate" },
      { name: t("transparency"), href: "/transparency" },
    ],
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("oasis_of_knowledge")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t("accessible_learning_platforms")}</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://www.linkedin.com/in/sara-skouri-415774342" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("platform")}</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("connect")}</h3>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sara's Contact Information Section */}
        <div className="border-t mt-8 pt-8">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t("made_with_love")} <Heart className="inline h-5 w-5 text-red-500 mx-1" /> {t("by_sara")}
              </p>
              <p className="text-sm text-muted-foreground mb-4">{t("founder_of")}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a
                  href="mailto:saraskouri1@gmail.com"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>saraskouri1@gmail.com</span>
                </a>

                <div className="hidden sm:block text-gray-300">|</div>

                <a
                  href="https://www.linkedin.com/in/sara-skouri-415774342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Sara Skouri</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>
              © 2024 {t("oasis_of_knowledge")}. {t("all_rights_reserved")}
            </span>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>7 {t("languages_supported")}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">{t("made_for_global_education")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
