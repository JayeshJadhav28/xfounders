import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "XFounders - Entrepreneurship Cell | DIET Satara",
  description:
    "Building Tomorrow's Entrepreneurs at DIET Satara. Join our startup community and transform your ideas into reality.",
  keywords: "entrepreneurship, startup, DIET Satara, XFounders, innovation, business",
  authors: [{ name: "XFounders DIET" }],
  icons: {
    icon: "/XFounders.png",
    shortcut: "/XFounders.png",
    apple: "/XFounders.png",
  },
  openGraph: {
    title: "XFounders - Entrepreneurship Cell | DIET Satara",
    description: "Building Tomorrow's Entrepreneurs at DIET Satara",
    url: "https://xfounders-diet.vercel.app",
    siteName: "XFounders",
    images: [
      {
        url: "/xfounders-startup-community.png",
        width: 1200,
        height: 630,
        alt: "XFounders - Entrepreneurship Cell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XFounders - Entrepreneurship Cell | DIET Satara",
    description: "Building Tomorrow's Entrepreneurs at DIET Satara",
    images: ["/xfounders-startup-community.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
