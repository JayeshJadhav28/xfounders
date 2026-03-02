"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import UserMenu from "@/components/auth/UserMenu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  return (
    <header className="bg-gray-900 shadow-none border-b border-gray-800 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/headerx.png"
            alt="XFounders logo"
            width={200}
            height={48}
            className="h-12 w-auto object-contain drop-shadow-[0_0_0px_rgba(255,140,0,0.8)]"
            priority
          />
          <div>
            <span className="text-xl font-bold font-heading text-gray-900"></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                pathname === item.href ? "text-orange-400 border-b-2 border-orange-400 pb-1" : "text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          ) : user ? (
            <UserMenu />
          ) : (
            <Link href="/auth/login">
              <Button className="btn-primary">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="p-2 rounded-md text-gray-200 hover:text-orange-400 hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-base font-medium transition-colors hover:text-orange-400 ${
                  pathname === item.href ? "text-orange-400" : "text-gray-200"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              {loading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              ) : user ? (
                <UserMenu />
              ) : (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="btn-primary w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
