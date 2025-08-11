import { type NextRequest, NextResponse } from "next/server"

// Ensure this route runs on the Node.js runtime (not Edge) and is treated as dynamic
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import { sendContactFormEmail } from "@/lib/emailService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send email
    await sendContactFormEmail({ name, email, subject, message })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
