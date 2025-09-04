"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, CreditCard, Banknote, Gift } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function DonatePage() {
  const { t } = useLanguage()
  const [donationType, setDonationType] = useState("one-time")
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const predefinedAmounts = [10, 25, 50, 100, 250, 500]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle donation submission
    console.log("Donation submitted:", {
      type: donationType,
      amount: customAmount || amount,
      paymentMethod,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Oasis of Knowledge</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us democratize knowledge and make education accessible to everyone, everywhere. Your contribution
            directly supports our mission to break down language barriers in learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Make a Donation
              </CardTitle>
              <CardDescription>Choose your donation amount and frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Donation Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={donationType === "one-time" ? "default" : "outline"}
                      onClick={() => setDonationType("one-time")}
                      className="h-12"
                    >
                      One-time
                    </Button>
                    <Button
                      type="button"
                      variant={donationType === "monthly" ? "default" : "outline"}
                      onClick={() => setDonationType("monthly")}
                      className="h-12"
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Amount (USD)</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {predefinedAmounts.map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={amount === value.toString() ? "default" : "outline"}
                        onClick={() => {
                          setAmount(value.toString())
                          setCustomAmount("")
                        }}
                        className="h-12"
                      >
                        ${value}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="custom-amount">Custom Amount</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setAmount("")
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Credit/Debit Card
                        </div>
                      </SelectItem>
                      <SelectItem value="paypal">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          PayPal
                        </div>
                      </SelectItem>
                      <SelectItem value="bank-transfer">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          Bank Transfer
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Personal Information</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" placeholder="Leave a message of support..." rows={3} />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full h-12 text-lg">
                  Donate ${customAmount || amount || "0"}
                  {donationType === "monthly" && "/month"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Impact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
                <CardDescription>See how your donation makes a difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-900">$10/month</h4>
                  <p className="text-sm text-gray-600">Helps translate 5 research papers into multiple languages</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-900">$25/month</h4>
                  <p className="text-sm text-gray-600">Supports server costs for 100 active users</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-900">$50/month</h4>
                  <p className="text-sm text-gray-600">Funds development of new accessibility features</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-900">$100/month</h4>
                  <p className="text-sm text-gray-600">Sponsors a scholarship for students in developing countries</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Why Donate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <Heart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Break Language Barriers</h4>
                    <p className="text-sm text-gray-600">Help make knowledge accessible in multiple languages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Heart className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Support Global Education</h4>
                    <p className="text-sm text-gray-600">
                      Enable students worldwide to access quality educational content
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full mt-1">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Empower Researchers</h4>
                    <p className="text-sm text-gray-600">Help researchers share their work with a global audience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">100% of your donation goes to the platform</h3>
                  <p className="text-sm text-gray-600">
                    We're committed to transparency. Every dollar you donate directly supports our mission to
                    democratize knowledge and education.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Oasis of Knowledge is a non-profit initiative. All donations are used to maintain and improve the platform
            for learners worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}
