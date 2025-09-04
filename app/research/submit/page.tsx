"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Plus, X } from "lucide-react"
import Link from "next/link"

export default function SubmitResearcherPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoUrl: "",
    bio: "",
    expertise: [] as string[],
    email: user?.email || "",
    linkedin: "",
    website: "",
    institution: "",
    position: "",
  })

  const [newExpertise, setNewExpertise] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">You need to be logged in to submit a researcher profile.</p>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()],
      }))
      setNewExpertise("")
    }
  }

  const removeExpertise = (expertiseToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((exp) => exp !== expertiseToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      if (!formData.name || !formData.bio) {
        throw new Error("Please fill in all required fields")
      }

      const researcherData = {
        ...formData,
        contact: {
          email: formData.email,
          linkedin: formData.linkedin,
          website: formData.website,
        },
        submittedBy: user.uid,
        submittedAt: serverTimestamp(),
        approved: false, // Requires admin approval
      }

      await addDoc(collection(db, "researchers"), researcherData)

      router.push("/research?submitted=true")
    } catch (err: any) {
      setError(err.message || "Failed to submit researcher profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/research">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <User className="mr-3 h-8 w-8 text-blue-600" />
            Join as Researcher
          </h1>
          <p className="text-muted-foreground">Submit your profile to be featured in our research community</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Researcher Profile</CardTitle>
            <CardDescription>
              Fill in your information to join our research community. Your profile will be reviewed before publication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Dr. Jane Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Professor, Research Scientist, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution/Organization</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleInputChange("institution", e.target.value)}
                  placeholder="University, Research Institute, Company"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">
                  Bio/Research Summary <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Brief description of your research interests and background"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Areas of Expertise</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add expertise area"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
                  />
                  <Button type="button" onClick={addExpertise} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="flex items-center gap-1">
                      {exp}
                      <button type="button" onClick={() => removeExpertise(exp)} className="ml-1 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">Profile Photo URL (Optional)</Label>
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  type="url"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    type="url"
                  />
                </div>
              </div>

              {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">{error}</div>}

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Review Process</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your researcher profile will be reviewed by our team before being published. This helps maintain the
                  quality and authenticity of our research community. You'll be notified once your profile is approved.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit Profile"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/research">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
