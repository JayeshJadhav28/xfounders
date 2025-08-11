import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export async function sendEventConfirmation(userEmail: string, eventTitle: string, eventDate: string) {
  const mailOptions = {
    from: "XFounders.ecell@gmail.com",
    to: userEmail,
    subject: `Event Registration Confirmed: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ff6b35; color: white; padding: 20px; text-align: center;">
          <h1>XFounders DIET</h1>
          <h2>Registration Confirmed!</h2>
        </div>
        
        <div style="padding: 30px;">
          <h3>Event Details:</h3>
          <p><strong>Event:</strong> ${eventTitle}</p>
          <p><strong>Date:</strong> ${eventDate}</p>
          
          <p>Thank you for registering! We're excited to see you at the event.</p>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://xfounders-diet.vercel.app/events" 
               style="background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">
              View All Events
            </a>
          </div>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px;">
          <p>XFounders - Entrepreneurship Cell, DIET Delhi</p>
          <p>Contact: XFounders.ecell@gmail.com</p>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendContactFormEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const mailOptions = {
    from: formData.email,
    to: "xfounders.ecell@gmail.com",
    subject: `Contact Form: ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ff6b35; color: white; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          
          <h3>Message:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p>${formData.message}</p>
          </div>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}
