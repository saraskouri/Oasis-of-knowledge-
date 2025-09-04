"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore"
import { updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { db } from "@/lib/firebase"
import { getStorage } from "firebase/storage"
import {
  User,
  Camera,
  Settings,
  Bell,
  Activity,
  Save,
  Edit3,
  Award,
  MapPin,
  FileText,
  Eye,
  Heart,
  BookOpen,
  Video,
  MessageSquare,
  Shield,
  Lock,
  Trash2,
  Mail,
  Globe,
  Sun,
  Moon,
  Upload,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Initialize Firebase Storage
const storage = getStorage()

interface UserProfile {
  name: string
  email: string
  role: string
  bio: string
  interests: string[]
  country: string
  languages: string[]
  institution: string
  position: string
  profilePhoto: string
  joinDate: string
  badges: string[]
  level: number
  points: number
  theme: string
  language: string
  privacy: {
    showProfile: boolean
    showEmail: boolean
    showActivity: boolean
  }
  notifications: {
    email: boolean
    newPosts: boolean
    courseUpdates: boolean
    messages: boolean
    newsletter: boolean
    announcements: boolean
  }
}

interface UserActivity {
  posts: number
  courses: number
  videos: number
  comments: number
  likes: number
  views: number
}

interface ProfilePageProps {
  user: any
}

const roles = [
  { value: "high-school", label: "High School Student", icon: "🎓" },
  { value: "undergraduate", label: "Undergraduate", icon: "📚" },
  { value: "masters", label: "Master's Student", icon: "🎯" },
  { value: "phd", label: "PhD Candidate", icon: "🔬" },
  { value: "postdoc", label: "Postdoc", icon: "🧪" },
  { value: "researcher", label: "Researcher", icon: "🔍" },
  { value: "educator", label: "Educator", icon: "👨‍🏫" },
  { value: "volunteer", label: "Volunteer", icon: "❤️" },
  { value: "other", label: "Other", icon: "✨" },
]

const interests = [
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Computer Science",
  "Psychology",
  "Philosophy",
  "History",
  "Literature",
  "Economics",
  "Political Science",
  "Sociology",
  "Anthropology",
  "Linguistics",
  "Environmental Science",
  "Medicine",
  "Engineering",
  "Art",
  "Music",
  "Neuroscience",
  "AI & Machine Learning",
  "Data Science",
  "Astronomy",
]

const countries = [
  "Morocco",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Canada",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "Turkey",
  "Pakistan",
  "Bangladesh",
  "Other",
]

const languages = [
  "Arabic",
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Hindi",
  "Urdu",
  "Turkish",
  "Russian",
  "Dutch",
  "Korean",
  "Other",
]

export function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    role: "",
    bio: "",
    interests: [],
    country: "",
    languages: [],
    institution: "",
    position: "",
    profilePhoto: "/placeholder.svg?height=120&width=120",
    joinDate: "",
    badges: ["New Member"],
    level: 1,
    points: 0,
    theme: "light",
    language: "en",
    privacy: {
      showProfile: true,
      showEmail: false,
      showActivity: true,
    },
    notifications: {
      email: true,
      newPosts: true,
      courseUpdates: true,
      messages: true,
      newsletter: false,
      announcements: true,
    },
  })
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile)
  const [activity, setActivity] = useState<UserActivity>({
    posts: 0,
    courses: 0,
    videos: 0,
    comments: 0,
    likes: 0,
    views: 0,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const { toast } = useToast()

  // Calculate profile completion
  const calculateCompletion = (prof: UserProfile) => {
    let completed = 0
    const total = 10

    if (prof.name) completed++
    if (prof.bio) completed++
    if (prof.role) completed++
    if (prof.interests.length > 0) completed++
    if (prof.country) completed++
    if (prof.languages.length > 0) completed++
    if (prof.institution) completed++
    if (prof.position) completed++
    if (prof.profilePhoto !== "/placeholder.svg?height=120&width=120") completed++
    if (prof.privacy.showProfile !== undefined) completed++

    return Math.round((completed / total) * 100)
  }

  const completionPercentage = calculateCompletion(profile)

  useEffect(() => {
    loadProfile()
    loadActivity()
  }, [user?.uid])

  const loadProfile = async () => {
    if (!user?.uid) return

    try {
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        const loadedProfile: UserProfile = {
          name: data.name || user.displayName || "",
          email: data.email || user.email || "",
          role: data.role || "",
          bio: data.bio || "",
          interests: data.interests || [],
          country: data.country || "",
          languages: data.languages || [],
          institution: data.institution || "",
          position: data.position || "",
          profilePhoto: data.profilePhoto || "/placeholder.svg?height=120&width=120",
          joinDate: data.joinDate || new Date().toISOString().split("T")[0],
          badges: data.badges || ["New Member"],
          level: data.level || 1,
          points: data.points || 0,
          theme: data.theme || "light",
          language: data.language || "en",
          privacy: data.privacy || {
            showProfile: true,
            showEmail: false,
            showActivity: true,
          },
          notifications: data.notifications || {
            email: true,
            newPosts: true,
            courseUpdates: true,
            messages: true,
            newsletter: false,
            announcements: true,
          },
        }
        setProfile(loadedProfile)
        setTempProfile(loadedProfile)
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const loadActivity = async () => {
    if (!user?.uid) return

    try {
      // This would normally query your posts, courses, etc. collections
      // For now, we'll use mock data
      setActivity({
        posts: 12,
        courses: 3,
        videos: 8,
        comments: 45,
        likes: 234,
        views: 1847,
      })
    } catch (error) {
      console.error("Error loading activity:", error)
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user?.uid) return

    setUploadingPhoto(true)
    try {
      const fileRef = ref(storage, `profilePictures/${user.uid}/${Date.now()}_${file.name}`)
      await uploadBytes(fileRef, file)
      const photoURL = await getDownloadURL(fileRef)

      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, { profilePhoto: photoURL })

      const updatedProfile = { ...profile, profilePhoto: photoURL }
      setProfile(updatedProfile)
      setTempProfile(updatedProfile)

      toast({
        title: "Photo Updated! 📸",
        description: "Your profile photo has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Error uploading photo:", error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your photo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!user?.uid) return

    try {
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        name: tempProfile.name,
        role: tempProfile.role,
        bio: tempProfile.bio,
        interests: tempProfile.interests,
        country: tempProfile.country,
        languages: tempProfile.languages,
        institution: tempProfile.institution,
        position: tempProfile.position,
        theme: tempProfile.theme,
        language: tempProfile.language,
        privacy: tempProfile.privacy,
        notifications: tempProfile.notifications,
      })

      setProfile(tempProfile)
      setIsEditing(false)

      toast({
        title: "Profile Updated! 🎉",
        description: "Your profile has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Save Failed",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePasswordChange = async () => {
    if (!user || !passwordData.currentPassword || !passwordData.newPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      })
      return
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, passwordData.newPassword)

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast({
        title: "Password Updated! 🔒",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      toast({
        title: "Password Update Failed",
        description: "Please check your current password and try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAccount = async () => {
    if (!user?.uid) return

    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", user.uid))

      // Delete user account
      await deleteUser(user)

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      })
    } catch (error) {
      console.error("Error deleting account:", error)
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting your account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addInterest = (interest: string) => {
    if (!tempProfile.interests.includes(interest)) {
      setTempProfile({
        ...tempProfile,
        interests: [...tempProfile.interests, interest],
      })
    }
  }

  const removeInterest = (interest: string) => {
    setTempProfile({
      ...tempProfile,
      interests: tempProfile.interests.filter((i) => i !== interest),
    })
  }

  const addLanguage = (language: string) => {
    if (!tempProfile.languages.includes(language)) {
      setTempProfile({
        ...tempProfile,
        languages: [...tempProfile.languages, language],
      })
    }
  }

  const removeLanguage = (language: string) => {
    setTempProfile({
      ...tempProfile,
      languages: tempProfile.languages.filter((l) => l !== language),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mx-auto mb-6"
          >
            <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-2xl">
              <AvatarImage src={profile.profilePhoto || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {(profile.name || user?.email || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="absolute -bottom-2 -right-2">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="hero-photo-upload"
              />
              <label htmlFor="hero-photo-upload">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 rounded-full p-0 bg-white shadow-lg border-2"
                    disabled={uploadingPhoto}
                    asChild
                  >
                    <div>
                      {uploadingPhoto ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Upload className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                    </div>
                  </Button>
                </motion.div>
              </label>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            {profile.name || "Anonymous Researcher"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-700 dark:text-gray-300 mb-2"
          >
            {profile.position && profile.institution ? `${profile.position} at ${profile.institution}` : profile.email}
          </motion.p>

          {profile.role && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                {roles.find((r) => r.value === profile.role)?.icon} {roles.find((r) => r.value === profile.role)?.label}
              </Badge>
            </motion.div>
          )}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{profile.level}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{profile.points}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{profile.badges.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Completion Progress */}
        {completionPercentage < 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Complete Your Profile</h3>
                  <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3 mb-2" />
                <p className="text-sm text-green-700 dark:text-green-300">
                  Complete your profile to unlock all features and connect with the community!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="flex items-center space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {/* Basic Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>Basic Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={tempProfile.name}
                            onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={tempProfile.role}
                            onValueChange={(value) => setTempProfile({ ...tempProfile, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  <span className="flex items-center space-x-2">
                                    <span>{role.icon}</span>
                                    <span>{role.label}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="institution">Institution</Label>
                            <Input
                              id="institution"
                              value={tempProfile.institution}
                              onChange={(e) => setTempProfile({ ...tempProfile, institution: e.target.value })}
                              placeholder="University or organization"
                            />
                          </div>
                          <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                              id="position"
                              value={tempProfile.position}
                              onChange={(e) => setTempProfile({ ...tempProfile, position: e.target.value })}
                              placeholder="Your position or title"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={tempProfile.bio}
                            onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interests & Location */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Globe className="h-5 w-5" />
                          <span>Interests & Location</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Country</Label>
                          <Select
                            value={tempProfile.country}
                            onValueChange={(value) => setTempProfile({ ...tempProfile, country: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Interests</Label>
                          <Select onValueChange={addInterest}>
                            <SelectTrigger>
                              <SelectValue placeholder="Add an interest" />
                            </SelectTrigger>
                            <SelectContent>
                              {interests
                                .filter((interest) => !tempProfile.interests.includes(interest))
                                .map((interest) => (
                                  <SelectItem key={interest} value={interest}>
                                    {interest}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tempProfile.interests.map((interest) => (
                              <Badge
                                key={interest}
                                variant="outline"
                                className="cursor-pointer hover:bg-red-50 hover:border-red-300"
                                onClick={() => removeInterest(interest)}
                              >
                                {interest} ×
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>Languages</Label>
                          <Select onValueChange={addLanguage}>
                            <SelectTrigger>
                              <SelectValue placeholder="Add a language" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages
                                .filter((language) => !tempProfile.languages.includes(language))
                                .map((language) => (
                                  <SelectItem key={language} value={language}>
                                    {language}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tempProfile.languages.map((language) => (
                              <Badge
                                key={language}
                                variant="outline"
                                className="cursor-pointer hover:bg-red-50 hover:border-red-300"
                                onClick={() => removeLanguage(language)}
                              >
                                {language} ×
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="lg:col-span-2 flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {/* Profile Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <User className="h-5 w-5" />
                          <span>Profile Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {profile.bio && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Bio</Label>
                            <p className="text-gray-800 dark:text-gray-200 mt-1 italic">"{profile.bio}"</p>
                          </div>
                        )}

                        {profile.role && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Role</Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-lg">{roles.find((r) => r.value === profile.role)?.icon}</span>
                              <span>{roles.find((r) => r.value === profile.role)?.label}</span>
                            </div>
                          </div>
                        )}

                        {(profile.institution || profile.position) && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Affiliation</Label>
                            <p className="text-gray-800 dark:text-gray-200 mt-1">
                              {profile.position && profile.institution
                                ? `${profile.position} at ${profile.institution}`
                                : profile.position || profile.institution}
                            </p>
                          </div>
                        )}

                        {profile.country && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Location</Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{profile.country}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Interests & Languages */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Heart className="h-5 w-5" />
                          <span>Interests & Languages</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {profile.interests.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Interests</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile.interests.map((interest) => (
                                <Badge key={interest} variant="secondary">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile.languages.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Languages</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile.languages.map((language) => (
                                <Badge key={language} variant="outline" className="bg-green-50 border-green-300">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile.badges.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Badges</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {profile.badges.map((badge) => (
                                <Badge
                                  key={badge}
                                  variant="outline"
                                  className="bg-yellow-50 border-yellow-300 text-yellow-800"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Account Security</span>
                    </CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button onClick={handlePasswordChange} className="w-full">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy Settings</span>
                    </CardTitle>
                    <CardDescription>Control who can see your information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Public Profile</Label>
                        <p className="text-sm text-gray-600">Allow others to view your profile</p>
                      </div>
                      <Switch
                        checked={tempProfile.privacy.showProfile}
                        onCheckedChange={(checked) =>
                          setTempProfile({
                            ...tempProfile,
                            privacy: { ...tempProfile.privacy, showProfile: checked },
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email</Label>
                        <p className="text-sm text-gray-600">Display your email on your profile</p>
                      </div>
                      <Switch
                        checked={tempProfile.privacy.showEmail}
                        onCheckedChange={(checked) =>
                          setTempProfile({
                            ...tempProfile,
                            privacy: { ...tempProfile.privacy, showEmail: checked },
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Activity</Label>
                        <p className="text-sm text-gray-600">Display your activity and contributions</p>
                      </div>
                      <Switch
                        checked={tempProfile.privacy.showActivity}
                        onCheckedChange={(checked) =>
                          setTempProfile({
                            ...tempProfile,
                            privacy: { ...tempProfile.privacy, showActivity: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Preferences</span>
                    </CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Language</Label>
                      <Select
                        value={tempProfile.language}
                        onValueChange={(value) => setTempProfile({ ...tempProfile, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                          <SelectItem value="fr">🇫🇷 Français</SelectItem>
                          <SelectItem value="es">🇪🇸 Español</SelectItem>
                          <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                          <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
                          <SelectItem value="ur">🇵🇰 اردو</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Theme</Label>
                      <Select
                        value={tempProfile.theme}
                        onValueChange={(value) => setTempProfile({ ...tempProfile, theme: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center space-x-2">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center space-x-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <Trash2 className="h-5 w-5" />
                      <span>Danger Zone</span>
                    </CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2 flex justify-end">
                  <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Settings</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Notifications</span>
                      </Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.email}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, email: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>New Posts</span>
                      </Label>
                      <p className="text-sm text-gray-600">Get notified about new blog posts and articles</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.newPosts}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, newPosts: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Course Updates</span>
                      </Label>
                      <p className="text-sm text-gray-600">Updates about courses you're enrolled in</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.courseUpdates}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, courseUpdates: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                      </Label>
                      <p className="text-sm text-gray-600">Direct messages and mentions</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.messages}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, messages: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Newsletter</span>
                      </Label>
                      <p className="text-sm text-gray-600">Weekly newsletter with platform updates</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, newsletter: checked },
                        })
                      }
                    />
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Announcements</span>
                      </Label>
                      <p className="text-sm text-gray-600">Important platform announcements</p>
                    </div>
                    <Switch
                      checked={tempProfile.notifications.announcements}
                      onCheckedChange={(checked) =>
                        setTempProfile({
                          ...tempProfile,
                          notifications: { ...tempProfile.notifications, announcements: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Preferences</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Activity Stats */}
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Posts</CardTitle>
                      <FileText className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.posts}</div>
                    <p className="text-blue-100">Articles published</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Courses</CardTitle>
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.courses}</div>
                    <p className="text-green-100">Courses enrolled</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Videos</CardTitle>
                      <Video className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.videos}</div>
                    <p className="text-purple-100">Videos watched</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Comments</CardTitle>
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.comments}</div>
                    <p className="text-orange-100">Comments made</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Likes</CardTitle>
                      <Heart className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.likes}</div>
                    <p className="text-pink-100">Likes received</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Views</CardTitle>
                      <Eye className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{activity.views}</div>
                    <p className="text-indigo-100">Profile views</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Published a new article</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Enrolled in "Advanced Biology"</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Earned "Contributor" badge</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Commented on "Climate Change Research"</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
