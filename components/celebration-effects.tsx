"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Star, Trophy } from "lucide-react"
import confetti from "canvas-confetti"

interface CelebrationData {
  type: "levelUp" | "newBadge"
  data: any
}

export function CelebrationEffects() {
  const [celebration, setCelebration] = useState<CelebrationData | null>(null)

  useEffect(() => {
    const handleLevelUp = (event: CustomEvent) => {
      setCelebration({ type: "levelUp", data: event.detail })

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Play celebration sound (if available)
      try {
        const audio = new Audio("/sounds/level-up.mp3")
        audio.play().catch(() => {
          // Ignore audio errors in case file doesn't exist
        })
      } catch (error) {
        // Ignore audio errors
      }

      // Auto-hide after 5 seconds
      setTimeout(() => setCelebration(null), 5000)
    }

    const handleNewBadge = (event: CustomEvent) => {
      setCelebration({ type: "newBadge", data: event.detail })

      // Trigger confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#FFD700", "#FFA500", "#FF6347"],
      })

      // Auto-hide after 4 seconds
      setTimeout(() => setCelebration(null), 4000)
    }

    window.addEventListener("levelUp", handleLevelUp as EventListener)
    window.addEventListener("newBadge", handleNewBadge as EventListener)

    return () => {
      window.removeEventListener("levelUp", handleLevelUp as EventListener)
      window.removeEventListener("newBadge", handleNewBadge as EventListener)
    }
  }, [])

  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md mx-4 border-4 border-yellow-400">
            {celebration.type === "levelUp" && (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Trophy className="h-16 w-16 text-yellow-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-yellow-600 mb-2">Level Up!</h2>
                <p className="text-xl mb-4">Congratulations! You've reached Level {celebration.data.newLevel}</p>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: i * 0.1, repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    >
                      <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {celebration.type === "newBadge" && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block mb-4"
                >
                  <Award className="h-16 w-16 text-blue-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">New Badge!</h2>
                <p className="text-xl mb-4">You've earned the "{celebration.data.badge}" badge!</p>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-4xl"
                >
                  🎉
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
