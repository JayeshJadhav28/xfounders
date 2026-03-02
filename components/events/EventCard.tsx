"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    deadline: string
    location: string
    maxParticipants: number
    currentRegistrations: number
    category: string
    image: string
    featured?: boolean
    isActive: boolean
    googleFormUrl?: string
  }
  featured?: boolean
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const { user } = useAuth()
  const router = useRouter()

  const isDeadlinePassed = new Date(event.deadline) < new Date()
  const isFull = event.currentRegistrations >= event.maxParticipants
  const canRegister = event.isActive && !isDeadlinePassed && !isFull

  const spotsLeft = event.maxParticipants - event.currentRegistrations
  const fillPercentage = (event.currentRegistrations / event.maxParticipants) * 100

  const onRegisterClick = () => {
    if (!canRegister || !event.googleFormUrl) return
    if (!user) {
      router.push(`/auth/login?redirect=/events`)
      return
    }
    window.open(event.googleFormUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className={`card group hover:scale-105 transition-all duration-300 ${featured ? "ring-2 ring-orange-500" : ""}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-orange-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {event.category}
          </Badge>
        </div>

        {/* Status Overlay */}
        {!canRegister && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {isFull ? "Full" : isDeadlinePassed ? "Registration Closed" : "Inactive"}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 line-clamp-2">{event.title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-orange-500" />
            {event.time}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
            {event.location}
          </div>
        </div>

        {/* Registration Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              <Users className="h-4 w-4 inline mr-1" />
              {event.currentRegistrations}/{event.maxParticipants} registered
            </span>
            <span className="text-sm font-medium text-orange-600">{spotsLeft} spots left</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                fillPercentage > 80 ? "bg-red-500" : fillPercentage > 60 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="text-xs text-gray-500 mb-4">
          Registration deadline: {new Date(event.deadline).toLocaleDateString()}
        </div>

        {/* Register CTA: requires authentication before opening Google Form */}
        {canRegister && event.googleFormUrl ? (
          <Button onClick={onRegisterClick} className="w-full btn-primary">
            {user ? "Register Now" : "Login to Register"}
          </Button>
        ) : (
          <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
            {isFull ? "Event Full" : isDeadlinePassed ? "Registration Closed" : "Unavailable"}
          </Button>
        )}
      </div>
    </div>
  )
}
