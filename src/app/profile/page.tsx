"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login?redirect=/profile")
    }
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container-custom py-12">
        <h1 className="text-3xl font-bold font-heading text-gray-900 mb-6">Your Profile</h1>
        <div className="card p-6 space-y-2">
          <p><span className="font-semibold">Name:</span> {user.displayName || "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-12">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold">⏳</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Profile Coming Soon</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re building a personalized profile experience for you. Stay tuned!
          </p>
        </div>
      </section>
    </div>
  )
}
