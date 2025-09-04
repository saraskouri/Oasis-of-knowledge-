"use client"

import { useLanguage } from "@/contexts/language-context"

/**
 * Enhanced translation hook with better fallback handling
 * Provides additional safety and debugging capabilities
 */
export function useTranslationFallback() {
  const { t, currentLanguage } = useLanguage()

  /**
   * Safe translation function with custom fallback
   * @param key - Translation key
   * @param fallback - Custom fallback text (optional)
   * @returns Translated text or fallback
   */
  const tSafe = (key: string, fallback?: string): string => {
    const translation = t(key)

    // If translation is missing (starts with [), use fallback
    if (translation.startsWith("[") && translation.endsWith("]")) {
      return fallback || `Missing: ${key}`
    }

    return translation
  }

  /**
   * Check if a translation key exists
   * @param key - Translation key to check
   * @returns boolean indicating if translation exists
   */
  const hasTranslation = (key: string): boolean => {
    const translation = t(key)
    return !translation.startsWith("[") || !translation.endsWith("]")
  }

  /**
   * Get translation with metadata
   * @param key - Translation key
   * @returns Object with translation and metadata
   */
  const tWithMeta = (key: string) => {
    const translation = t(key)
    const isMissing = translation.startsWith("[") && translation.endsWith("]")

    return {
      text: translation,
      isMissing,
      key,
      language: currentLanguage,
    }
  }

  return {
    t,
    tSafe,
    hasTranslation,
    tWithMeta,
    currentLanguage,
  }
}
