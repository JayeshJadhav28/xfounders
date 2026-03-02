"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { sendWelcomeEmail } from "@/lib/emailjs"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        email,
        role: "user",
        createdAt: new Date(),
      })

      toast({
        title: "Account created!",
        description: "Welcome to XFounders community.",
      })

      // Fire-and-forget welcome email (first-time auth)
      void sendWelcomeEmail(
        email,
        (userData && (userData.name || userData.fullName)) || user.displayName || undefined
      ).catch((err) => console.error("EmailJS welcome (signUp) failed:", err))
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))

      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || "",
          email: user.email || "",
          role: "user",
          createdAt: new Date(),
        })

        // First-time Google sign-in: send welcome email
        if (user.email) {
          void sendWelcomeEmail(user.email, user.displayName || undefined).catch((err) =>
            console.error("EmailJS welcome (Google) failed:", err)
          )
        }
      }

      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      })
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
