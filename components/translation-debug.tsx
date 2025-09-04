"use client"

import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export function TranslationDebug() {
  const { currentLanguage, t } = useLanguage()
  const [showDebug, setShowDebug] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-lg transition-colors"
      >
        🌍 i18n Debug
      </button>

      {showDebug && (
        <div className="absolute bottom-10 right-0 bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-xl max-w-sm min-w-[250px]">
          <h3 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Translation Debug</h3>

          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Current Language:</strong>
              <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200">
                {currentLanguage.toUpperCase()}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">Test Translation:</strong>
              <span className="ml-2 text-green-600 dark:text-green-400">"{t("profile")}"</span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">Missing Key Test:</strong>
              <span className="ml-2 text-red-600 dark:text-red-400">"{t("nonexistent_key")}"</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-700 dark:text-yellow-300">
            💡 Keys with [brackets] indicate missing translations
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() =>
                console.log("Current translations:", {
                  currentLanguage,
                  sampleKeys: ["home", "profile", "settings"].map((key) => ({ key, value: t(key) })),
                })
              }
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Log to Console
            </button>
            <button
              onClick={() => setShowDebug(false)}
              className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
