"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Send, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { sendContactEmail } from "@/lib/emailjs"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send the contact form via EmailJS
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Have questions about XFounders or want to collaborate? We'd love to hear from you. Reach out and let's
              build something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="input-field"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="input-field"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="input-field"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="input-field min-h-[120px]"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2"></p>
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=xfounders.ecell@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        xfounders.ecell@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600 mb-2"></p>
                      <a
                        href="https://maps.app.goo.gl/oFbQCxu9M9jTJsJX8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange-500 transition-colors"
                      >
                        <address className="not-italic">
                          Dnyanshree Institute of Engineering & Technology
                          <br />
                          A/P- Sonwadi-Gajawadi, Sajjangad Road.
                          <br />
                          Satara - 415013
                        </address>
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  {/* <div className="flex items-start space-x-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                      <p className="text-gray-600 mb-2">When you can find us</p>
                      <div className="text-gray-700">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Quick Links */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Quick Links</h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-orange-500" />
                    <a href="/events" className="text-gray-700 hover:text-orange-500 transition-colors">
                      Upcoming Events
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-orange-500" />
                    <a href="/team" className="text-gray-700 hover:text-orange-500 transition-colors">
                      Meet Our Team
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <a
                      href="https://linkedin.com/company/xfounders-diet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <a
                      href="https://www.instagram.com/xfounders_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      Instagram Profile
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How can I join XFounders?</h3>
                    <p className="text-gray-600 text-sm">
                      Simply register for our events or reach out to us directly. We welcome all DIET students
                      interested in entrepreneurship.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Do you offer mentorship programs?</h3>
                    <p className="text-gray-600 text-sm">
                      Yes! We connect students with experienced entrepreneurs and industry experts for guidance and
                      support.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Are events free for students?</h3>
                    <p className="text-gray-600 text-sm">
                      Most of our events are free for DIET students. Some specialized workshops may have a nominal fee
                      to cover materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
