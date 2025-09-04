"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BookOpen, Globe, Star, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const FloatingIcon = ({
  children,
  delay = 0,
  duration = 3,
}: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      delay,
    }}
    className="absolute opacity-20 text-white"
  >
    {children}
  </motion.div>
)

const SparkleEffect = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      delay,
    }}
    className="absolute"
  >
    <Sparkles className="h-4 w-4 text-yellow-300" />
  </motion.div>
)

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-400 via-purple-500 to-blue-600 overflow-hidden">
      {/* Floating Background Icons */}
      <FloatingIcon delay={0} duration={4}>
        <BookOpen className="h-16 w-16" style={{ top: "10%", left: "10%" }} />
      </FloatingIcon>
      <FloatingIcon delay={1} duration={5}>
        <Globe className="h-12 w-12" style={{ top: "20%", right: "15%" }} />
      </FloatingIcon>
      <FloatingIcon delay={2} duration={3.5}>
        <Star className="h-14 w-14" style={{ bottom: "30%", left: "20%" }} />
      </FloatingIcon>
      <FloatingIcon delay={1.5} duration={4.5}>
        <Heart className="h-10 w-10" style={{ bottom: "20%", right: "25%" }} />
      </FloatingIcon>

      {/* Sparkle Effects */}
      <SparkleEffect delay={0} />
      <SparkleEffect delay={1} />
      <SparkleEffect delay={2} />
      <SparkleEffect delay={3} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
              animation: "glow 2s ease-in-out infinite alternate",
            }}
          >
            Knowledge Belongs to Humanity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-8 font-light italic"
          >
            "And the charity of knowledge is the greatest charity"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Our Mission
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 text-white/80 text-sm"
          >
            <p>Join thousands of researchers, students, and knowledge seekers</p>
            <p>Building a better world through shared wisdom</p>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for glow effect */}
      <style jsx>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6);
          }
        }
      `}</style>
    </section>
  )
}
