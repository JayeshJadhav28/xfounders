"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login?redirect=/settings")
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
        <h1 className="text-3xl font-bold font-heading text-gray-900 mb-6">Settings</h1>
        <div className="card p-6 space-y-4">
          <p className="text-gray-600">Settings page is under construction.</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Profile preferences</li>
            <li>Notification settings</li>
            <li>Account management</li>
          </ul>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-12">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold">🚧</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">Settings Coming Soon</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re working on powerful settings to customize your experience. Check back soon!
          </p>
        </div>
      </section>
    </div>
  )
}
