"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"

interface TeamMemberCardProps {
  member: {
    id: string
    name: string
    role: string
    department?: string
    team?: string
    photo: string
    linkedinUrl: string
    bio: string
    email?: string
  }
  index: number
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Fix: Use useEffect instead of useState for triggering animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={`card p-6 text-center group hover:scale-105 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Photo */}
      <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
        <Image
          src={member.photo || "/placeholder.svg"}
          alt={member.name}
          fill
          className={`object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>

      {/* Role */}
      <p className="text-orange-500 font-medium mb-2">{member.role}</p>

      {/* Team */}
      <p className="text-gray-600 text-sm mb-4">{member.team || member.department}</p>

      {/* Bio */}
      <p className="text-gray-600 text-sm mb-6 line-clamp-3">{member.bio}</p>

      {/* Social Links */}
      <div className="flex justify-center space-x-3">
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            (member.email || `${member.name.toLowerCase().replace(/\s+/g, ".")}@diet.ac.in`)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          aria-label="Compose email in Gmail"
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </div>
  )
}
