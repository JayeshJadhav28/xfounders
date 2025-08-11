"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, MapPin, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

interface EventRegistrationModalProps {
  event: any
  isOpen: boolean
  onClose: () => void
}

const departments = [
  "Computer & Science Engineering",
  "Electronics & Tele-Communication Engineering",
  "Mechanical & Mechatronics Engineering",
  "Civil & Environmental Engineering",
  "Electrical & Computer Engineering",
]

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

export default function EventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    experience: "",
    idea: "",
    organization: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  if (!isOpen || !event) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically save to Firebase
      // For now, we'll simulate the registration process

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      toast({
        title: "Registration Successful!",
        description: `You have been registered for ${event.title}.`,
      })

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        experience: "",
        idea: "",
        organization: "",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFormField = (field: string) => {
    switch (field) {
      case "name":
        return (
          <div key={field}>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="input-field"
              required
            />
          </div>
        )
      case "email":
        return (
          <div key={field}>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="input-field"
              required
            />
          </div>
        )
      case "phone":
        return (
          <div key={field}>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="input-field"
              required
            />
          </div>
        )
      case "department":
        return (
          <div key={field}>
            <Label htmlFor="department">Department *</Label>
            <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "year":
        return (
          <div key={field}>
            <Label htmlFor="year">Year of Study *</Label>
            <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "experience":
        return (
          <div key={field}>
            <Label htmlFor="experience">Previous Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              placeholder="Tell us about your entrepreneurial experience or relevant background..."
              className="input-field min-h-[100px]"
            />
          </div>
        )
      case "idea":
        return (
          <div key={field}>
            <Label htmlFor="idea">Your Startup Idea</Label>
            <Textarea
              id="idea"
              value={formData.idea}
              onChange={(e) => handleInputChange("idea", e.target.value)}
              placeholder="Briefly describe your startup idea or what you'd like to pitch..."
              className="input-field min-h-[100px]"
            />
          </div>
        )
      case "organization":
        return (
          <div key={field}>
            <Label htmlFor="organization">Organization/Company</Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
              placeholder="Your current organization or company"
              className="input-field"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-heading text-gray-900">Register for Event</h2>
            <p className="text-gray-600 mt-1">Fill out the form below to register</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Event Info */}
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{event.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-orange-500" />
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-orange-500" />
              {event.location}
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 text-orange-500" />
              {event.maxParticipants - event.currentRegistrations} spots left
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">{event.formFields?.map((field: string) => renderFormField(field))}</div>

          {/* Terms and Conditions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              By registering for this event, you agree to our terms and conditions. You will receive email confirmations
              and updates about the event.
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Registering...
                </div>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
