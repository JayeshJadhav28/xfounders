"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Users, Calendar, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff6b35' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-gray-900 mb-6 leading-tight">
              Building Tomorrow's{" "}
              <span className="text-orange-500 relative">
                Entrepreneurs
                <div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 rounded-full transform scale-x-0 animate-pulse"
                  style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join XFounders at DIET Satara and transform your innovative ideas into successful startups. We're fostering
              the next generation of entrepreneurs through mentorship, events, and community.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/events">
                <Button className="btn-primary text-lg px-8 py-4 group">
                  Join an Event
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/team">
                <Button className="btn-secondary text-lg px-8 py-4">Meet Our Team</Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          {/**
           * <div
           *   className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
           * >
           *   <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
           *     <div className="text-center">
           *       <div className="flex items-center justify-center mb-2">
           *         <Calendar className="h-8 w-8 text-orange-500" />
           *       </div>
           *       <div className="text-3xl font-bold text-gray-900">50+</div>
           *       <div className="text-gray-600">Events Hosted</div>
           *     </div>
           *     <div className="text-center">
           *       <div className="flex items-center justify-center mb-2">
           *         <Users className="h-8 w-8 text-orange-500" />
           *       </div>
           *       <div className="text-3xl font-bold text-gray-900">500+</div>
           *       <div className="text-gray-600">Active Members</div>
           *     </div>
           *     <div className="text-center">
           *       <div className="flex items-center justify-center mb-2">
           *         <Trophy className="h-8 w-8 text-orange-500" />
           *       </div>
           *       <div className="text-3xl font-bold text-gray-900">25+</div>
           *       <div className="text-gray-600">Success Stories</div>
           *     </div>
           *   </div>
           * </div>
           */}
        </div>
      </div>
    
      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-orange-500 rounded-full opacity-10 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-orange-500 rounded-full opacity-10 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-orange-500 rounded-full opacity-10 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
    </section>
  )
}
