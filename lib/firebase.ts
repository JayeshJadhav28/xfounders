import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBeS-3BZ8kv8-JDCeda3eoDLEs5RHPC7AM",
  authDomain: "xfounders-ecelldiet.firebaseapp.com",
  projectId: "xfounders-ecelldiet",
  storageBucket: "xfounders-ecelldiet.firebasestorage.app",
  messagingSenderId: "976500840296",
  appId: "1:976500840296:web:73bab96b77d6b8712568dd",
  measurementId: "G-L7CJ8ZBFEY",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Analytics only on client side
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

export default app
