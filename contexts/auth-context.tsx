"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  points: number
  badges: string[]
  joinDate: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  addPoints: (points: number) => void
  addBadge: (badge: string) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Check if we have user data in localStorage
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else {
          // Create new user data
          const newUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            avatar: firebaseUser.photoURL || undefined,
            level: 1,
            points: 0,
            badges: ["Welcome"],
            joinDate: new Date().toISOString().split("T")[0],
          }
          setUser(newUser)
          localStorage.setItem("user", JSON.stringify(newUser))
        }
      } else {
        setUser(null)
        localStorage.removeItem("user")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    // This is handled by Firebase auth state change
  }

  const register = async (name: string, email: string, password: string) => {
    // This is handled by Firebase auth state change
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const addPoints = (points: number) => {
    if (user) {
      const newPoints = user.points + points
      const newLevel = Math.floor(newPoints / 500) + 1
      const leveledUp = newLevel > user.level

      updateUser({ points: newPoints, level: newLevel })

      if (leveledUp) {
        // Trigger celebration animation
        const event = new CustomEvent("levelUp", { detail: { newLevel } })
        window.dispatchEvent(event)
      }
    }
  }

  const addBadge = (badge: string) => {
    if (user && !user.badges.includes(badge)) {
      const newBadges = [...user.badges, badge]
      updateUser({ badges: newBadges })

      // Trigger badge celebration
      const event = new CustomEvent("newBadge", { detail: { badge } })
      window.dispatchEvent(event)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        addPoints,
        addBadge,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
