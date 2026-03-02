"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Camera, Calendar, Users, ArrowRight, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Icon */}
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Camera className="h-12 w-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
              Gallery Coming Soon
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              We're curating an amazing collection of photos and memories from our events, workshops, and community
              activities. Stay tuned for an inspiring visual journey!
            </p>
          </div>

          {/* Preview Grid */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {/* Preview Card 1 */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Event Highlights</h3>
                <p className="text-gray-600">
                  Capture the energy and excitement from our workshops, bootcamps, and networking events.
                </p>
              </div>

              {/* Preview Card 2 */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Moments</h3>
                <p className="text-gray-600">
                  Behind-the-scenes moments with our amazing team and the community we're building together.
                </p>
              </div>

              {/* Preview Card 3 */}
              <div className="card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Success Stories</h3>
                <p className="text-gray-600">
                  Celebrating achievements, milestones, and the entrepreneurial journey of our community members.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          {/* <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Get Notified When We Launch</h2>
              <p className="text-gray-600 mb-6">
                Be the first to explore our gallery when it goes live. Subscribe to get updates about new photos and
                events.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 input-field"
                  required
                />
                <Button type="submit" className="btn-primary">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>*/}

          {/* Social Media Links */}
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us for Live Updates</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://instagram.com/xfounders_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/company/xfounders-diet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
              <p className="text-gray-600 mt-4">Check out our social media for the latest photos and event updates!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Want to Be Featured in Our Gallery?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our upcoming events and become part of the XFounders story. Every event is an opportunity to connect,
            learn, and create memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 text-lg rounded-lg transition-all duration-200 transform hover:scale-105">
                View Upcoming Events
              </Button>
            </Link>
            <Link href="/team">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 px-8 text-lg rounded-lg transition-all duration-200 transform hover:scale-105">
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
