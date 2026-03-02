"use client"

import emailjs from "@emailjs/browser"

// Read configuration from environment variables
// Provide safe fallbacks from user's message if env is not set
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_fz7bvsw"
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "template_kxqg59f"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "ypiwYFrT6Xk8pPndO"
const WELCOME_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID || "template_chs1sib"

function ensureConfigured() {
  if (!PUBLIC_KEY) {
    throw new Error(
      "EmailJS public key missing. Set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY or provide a valid key."
    )
  }
  if (!SERVICE_ID) {
    throw new Error(
      "EmailJS service ID missing. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID."
    )
  }
  if (!CONTACT_TEMPLATE_ID) {
    throw new Error(
      "EmailJS contact template ID missing. Set NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID."
    )
  }
}

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

// Sends the contact form details to the configured EmailJS template
export async function sendContactEmail(data: ContactPayload) {
  ensureConfigured()
  // Pass variables expected by your EmailJS template
  // Make sure your template uses: to_email, from_name, from_email, subject, message
  return emailjs.send(
    SERVICE_ID!,
    CONTACT_TEMPLATE_ID!,
    {
      to_email: "xfounders.ecell@gmail.com",
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    { publicKey: PUBLIC_KEY! }
  )
}

// Sends a welcome email to a newly registered user (first-time authentication)
export async function sendWelcomeEmail(toEmail: string, toName?: string, websiteLink?: string) {
  ensureConfigured()
  const link = websiteLink ?? (typeof window !== "undefined" ? window.location.origin : "")
  return emailjs.send(
    SERVICE_ID!,
    WELCOME_TEMPLATE_ID!,
    {
      to_email: toEmail,
      to_name: toName ?? "",
      from_name: "XFounders",
      subject: "Welcome to XFounders",
      website_link: link,
    },
    { publicKey: PUBLIC_KEY! }
  )
}
