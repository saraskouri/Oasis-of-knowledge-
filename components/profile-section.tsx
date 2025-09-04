"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getStorage } from "firebase/storage"
import {
  User,
  Camera,
  Globe,
  GraduationCap,
  Microscope,
  Heart,
  Save,
  Edit3,
  Award,
  MapPin,
  Languages,
  FileText,
  ImportIcon as Translate,
  Eye,
  UserCheck,
  Compass,
  Upload,
  BookOpen,
  Feather,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Initialize Firebase Storage
const storage = getStorage()

interface UserProfile {
  academicLevel: string
  fieldOfInterest: string[]
  country: string
  languages: string[]
  contributions: string[]
  bio: string
  avatarUrl: string
  institution: string
  position: string
  badges: string[]
}

interface ProfileSectionProps {
  user: any
}

const academicLevels = [
  { value: "high-school", label: "High School Student", icon: "🎓" },
  { value: "undergraduate", label: "Undergraduate", icon: "📚" },
  { value: "masters", label: "Master's Student", icon: "🎯" },
  { value: "phd", label: "PhD Candidate", icon: "🔬" },
  { value: "postdoc", label: "Postdoc", icon: "🧪" },
  { value: "independent", label: "Independent Researcher", icon: "🔍" },
  { value: "educator", label: "Educator", icon: "👨‍🏫" },
  { value: "other", label: "Other", icon: "✨" },
]

const fieldsOfInterest = [
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

const contributionTypes = [
  { id: "research", label: "Submit Research", icon: FileText, color: "bg-blue-500" },
  { id: "translate", label: "Translate Content", icon: Translate, color: "bg-green-500" },
  { id: "review", label: "Review Articles", icon: Eye, color: "bg-purple-500" },
  { id: "mentor", label: "Mentor Others", icon: UserCheck, color: "bg-orange-500" },
  { id: "explore", label: "Just Explore", icon: Compass, color: "bg-pink-500" },
]

const inspirationalQuotes = [
  "Knowledge is a light to be shared, not hidden.",
  "The charity of knowledge is the greatest charity.",
  "Knowledge belongs to humanity.",
  "Every expert was once a beginner.",
]

export function ProfileSection({ user }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    academicLevel: "",
    fieldOfInterest: [],
    country: "",
    languages: [],
    contributions: [],
    bio: "",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    institution: "",
    position: "",
    badges: ["New Member"],
  })
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile)
  const { toast } = useToast()

  // Calculate profile completion percentage
  const calculateCompletion = (prof: UserProfile) => {
    let completed = 0
    const total = 8

    if (prof.bio) completed++
    if (prof.academicLevel) completed++
    if (prof.fieldOfInterest.length > 0) completed++
    if (prof.country) completed++
    if (prof.languages.length > 0) completed++
    if (prof.contributions.length > 0) completed++
    if (prof.institution) completed++
    if (prof.position) completed++

    return Math.round((completed / total) * 100)
  }

  const completionPercentage = calculateCompletion(profile)
  const todayQuote = inspirationalQuotes[new Date().getDate() % inspirationalQuotes.length]

  useEffect(() => {
    // Load profile from Firestore
    const loadProfile = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            const loadedProfile = {
              academicLevel: data.academicLevel || "",
              fieldOfInterest: data.fieldOfInterest || [],
              country: data.country || "",
              languages: data.languages || [],
              contributions: data.contributions || [],
              bio: data.bio || "",
              avatarUrl: data.photoURL || "/placeholder.svg?height=100&width=100",
              institution: data.institution || "",
              position: data.position || "",
              badges: data.badges || ["New Member"],
            }
            setProfile(loadedProfile)
            setTempProfile(loadedProfile)
          }
        } catch (error) {
          console.error("Error loading profile:", error)
        }
      }
    }

    loadProfile()
  }, [user?.uid])

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user?.uid) return

    setUploadingPhoto(true)
    try {
      const fileRef = ref(storage, `profilePictures/${user.uid}`)
      await uploadBytes(fileRef, file)
      const photoURL = await getDownloadURL(fileRef)

      // Update Firestore
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, { photoURL })

      // Update local state
      const updatedProfile = { ...profile, avatarUrl: photoURL }
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

  const handleSave = async () => {
    if (!user?.uid) return

    try {
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        academicLevel: tempProfile.academicLevel,
        fieldOfInterest: tempProfile.fieldOfInterest,
        country: tempProfile.country,
        languages: tempProfile.languages,
        contributions: tempProfile.contributions,
        bio: tempProfile.bio,
        institution: tempProfile.institution,
        position: tempProfile.position,
        badges: tempProfile.badges,
      })

      setProfile(tempProfile)
      setIsEditing(false)

      toast({
        title: "Profile Updated! 🎉",
        description: "Your profile has been saved successfully.",
      })

      // Add celebration effect
      const event = new CustomEvent("profileUpdated", {
        detail: { profile: tempProfile },
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Save Failed",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const addFieldOfInterest = (field: string) => {
    if (!tempProfile.fieldOfInterest.includes(field)) {
      setTempProfile({
        ...tempProfile,
        fieldOfInterest: [...tempProfile.fieldOfInterest, field],
      })
    }
  }

  const removeFieldOfInterest = (field: string) => {
    setTempProfile({
      ...tempProfile,
      fieldOfInterest: tempProfile.fieldOfInterest.filter((f) => f !== field),
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

  const toggleContribution = (contributionId: string) => {
    const contributions = tempProfile.contributions.includes(contributionId)
      ? tempProfile.contributions.filter((c) => c !== contributionId)
      : [...tempProfile.contributions, contributionId]

    setTempProfile({ ...tempProfile, contributions })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-orange-100 via-purple-100 to-blue-100 dark:from-orange-900/20 dark:via-purple-900/20 dark:to-blue-900/20 py-16 px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
        >
          Welcome back, {user?.displayName || "Researcher"} 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-700 dark:text-gray-300 mb-2"
        >
          Let's build your presence in the Oasis of Knowledge
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg italic text-gray-600 dark:text-gray-400 font-serif"
        >
          "{todayQuote}"
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Completion Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Profile Completion</h3>
                <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3 mb-2" />
              <p className="text-sm text-green-700 dark:text-green-300">
                {completionPercentage === 100
                  ? "🎉 Your profile is complete!"
                  : `Complete your profile to unlock all features!`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-6 overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="relative mx-auto">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-xl">
                      <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={user?.displayName} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div className="absolute -bottom-2 -right-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
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
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {user?.displayName || "Anonymous Researcher"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                  {profile.position && profile.institution && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 mt-2 font-medium"
                    >
                      {profile.position} at {profile.institution}
                    </motion.p>
                  )}
                </div>

                {/* Academic Level Badge */}
                {profile.academicLevel && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4"
                  >
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {academicLevels.find((l) => l.value === profile.academicLevel)?.icon}{" "}
                      {academicLevels.find((l) => l.value === profile.academicLevel)?.label}
                    </Badge>
                  </motion.div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {profile.badges.map((badge, index) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="outline"
                        className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300"
                      >
                        <Award className="h-3 w-3" />
                        <span>{badge}</span>
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.fieldOfInterest.length}</div>
                    <div className="text-xs text-gray-600">Interests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profile.languages.length}</div>
                    <div className="text-xs text-gray-600">Languages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.contributions.length}</div>
                    <div className="text-xs text-gray-600">Roles</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Right Column - Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Edit Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className="flex items-center space-x-2"
                size="lg"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? "Cancel Editing" : "Edit Profile"}</span>
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="institution">Institution</Label>
                          <Input
                            id="institution"
                            value={tempProfile.institution}
                            onChange={(e) => setTempProfile({ ...tempProfile, institution: e.target.value })}
                            placeholder="University of Morocco"
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={tempProfile.position}
                            onChange={(e) => setTempProfile({ ...tempProfile, position: e.target.value })}
                            placeholder="Research Assistant"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="flex items-center space-x-2">
                          <Feather className="h-4 w-4" />
                          <span>Bio</span>
                        </Label>
                        <Textarea
                          id="bio"
                          value={tempProfile.bio}
                          onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                          placeholder="Tell us about yourself, your research interests, and what drives your passion for knowledge..."
                          className="min-h-[120px] font-serif"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Academic Level */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5" />
                        <span>Academic Level</span>
                      </CardTitle>
                      <CardDescription>Who are you in the world of knowledge?</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={tempProfile.academicLevel}
                        onValueChange={(value) => setTempProfile({ ...tempProfile, academicLevel: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your academic level" />
                        </SelectTrigger>
                        <SelectContent>
                          {academicLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <span className="flex items-center space-x-3">
                                <span className="text-lg">{level.icon}</span>
                                <span>{level.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Fields of Interest */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Microscope className="h-5 w-5" />
                        <span>Fields of Interest</span>
                      </CardTitle>
                      <CardDescription>Select the areas you're passionate about</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Select onValueChange={addFieldOfInterest}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a field of interest" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldsOfInterest
                              .filter((field) => !tempProfile.fieldOfInterest.includes(field))
                              .map((field) => (
                                <SelectItem key={field} value={field}>
                                  {field}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2">
                          {tempProfile.fieldOfInterest.map((field, index) => (
                            <motion.div
                              key={field}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-red-50 hover:border-red-300 transition-colors text-sm px-3 py-1"
                                onClick={() => removeFieldOfInterest(field)}
                              >
                                {field} ×
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location & Languages */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Location & Languages</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>Country</span>
                        </Label>
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
                        <Label className="flex items-center space-x-2">
                          <Languages className="h-4 w-4" />
                          <span>Languages</span>
                        </Label>
                        <Select onValueChange={addLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages
                              .filter((lang) => !tempProfile.languages.includes(lang))
                              .map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {tempProfile.languages.map((language, index) => (
                            <motion.div
                              key={language}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="outline"
                                className="cursor-pointer hover:bg-red-50 hover:border-red-300 transition-colors"
                                onClick={() => removeLanguage(language)}
                              >
                                {language} ×
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contributions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="h-5 w-5" />
                        <span>How You Want to Contribute</span>
                      </CardTitle>
                      <CardDescription>Select all the ways you'd like to help the community</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contributionTypes.map((contribution, index) => (
                          <motion.div
                            key={contribution.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              tempProfile.contributions.includes(contribution.id)
                                ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => toggleContribution(contribution.id)}
                          >
                            <Checkbox
                              checked={tempProfile.contributions.includes(contribution.id)}
                              onChange={() => toggleContribution(contribution.id)}
                            />
                            <div className={`p-2 rounded-lg ${contribution.color} text-white`}>
                              <contribution.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium">{contribution.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Save/Cancel Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end space-x-4 pt-6"
                  >
                    <Button variant="outline" onClick={handleCancel} size="lg">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex items-center space-x-2" size="lg">
                      <Save className="h-4 w-4" />
                      <span>Save Profile</span>
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="viewing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Bio Section */}
                  {profile.bio && (
                    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
                          <BookOpen className="h-5 w-5" />
                          <span>About Me</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-serif text-lg italic">
                          "{profile.bio}"
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Academic Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5" />
                        <span>Academic Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profile.academicLevel && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
                        >
                          <span className="text-3xl">
                            {academicLevels.find((l) => l.value === profile.academicLevel)?.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold text-lg">
                              {academicLevels.find((l) => l.value === profile.academicLevel)?.label}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">Academic Level</p>
                          </div>
                        </motion.div>
                      )}

                      {profile.fieldOfInterest.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center space-x-2">
                            <Microscope className="h-4 w-4" />
                            <span>Fields of Interest</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.fieldOfInterest.map((field, index) => (
                              <motion.div
                                key={field}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-sm px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
                                >
                                  {field}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Location & Languages */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Location & Languages</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {profile.country && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <MapPin className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{profile.country}</span>
                        </div>
                      )}

                      {profile.languages.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center space-x-2">
                            <Languages className="h-4 w-4" />
                            <span>Languages</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.languages.map((language, index) => (
                              <motion.div
                                key={language}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge variant="outline" className="bg-green-50 border-green-300 text-green-800">
                                  {language}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contributions */}
                  {profile.contributions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Heart className="h-5 w-5" />
                          <span>How I Contribute</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {profile.contributions.map((contributionId, index) => {
                            const contribution = contributionTypes.find((c) => c.id === contributionId)
                            return contribution ? (
                              <motion.div
                                key={contributionId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                              >
                                <div className={`p-2 rounded-lg ${contribution.color} text-white`}>
                                  <contribution.icon className="h-5 w-5" />
                                </div>
                                <span className="font-medium">{contribution.label}</span>
                              </motion.div>
                            ) : null
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Empty State */}
                  {!profile.bio && !profile.academicLevel && profile.fieldOfInterest.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        <CardContent>
                          <motion.div
                            animate={{
                              y: [0, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                          </motion.div>
                          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Complete Your Profile
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Tell the community about yourself and your academic journey. Share your story and connect
                            with fellow researchers!
                          </p>
                          <Button
                            onClick={() => setIsEditing(true)}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600"
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Get Started
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
