"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-2 border-amber-200 dark:border-amber-800">
            <CardContent className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800 dark:text-amber-200">
                  {t("about_website")}
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  {t("welcome_to_oasis")}
                </h3>
              </div>

              {/* Sara's Story */}
              <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200">{t("founder_intro")}</p>

                <p>{t("why_built_platform")}</p>

                <p>{t("exclusion_problem")}</p>

                <p className="text-xl font-semibold text-blue-700 dark:text-blue-300">{t("knowledge_belongs")}</p>

                <p>{t("platform_purpose")}</p>

                <div className="text-center py-4">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-pre-line">
                    {t("lets_build_together")}
                  </p>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Note Section */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">{t("note_title")}</h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>{t("work_in_progress")}</p>
                  <p>{t("explore_and_grow")}</p>
                </div>
              </div>

              {/* Signature */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {t("with_love")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
