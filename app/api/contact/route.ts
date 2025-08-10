import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email environment variables')
      return NextResponse.json(
        { error: 'Email configuration is missing. Please check environment variables.' },
        { status: 500 }
      )
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
      }
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'saishashank1006@gmail.com', // The email from contact information
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #00ffff 0%, #8a2be2 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Name:</strong>
              <span style="color: #333; margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Email:</strong>
              <span style="color: #333; margin-left: 10px;">${email}</span>
            </div>
            
            ${company ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Company:</strong>
              <span style="color: #333; margin-left: 10px;">${company}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #666;">Message:</strong>
              <div style="color: #333; margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; border-left: 4px solid #00ffff;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                This message was sent from the S-HATCH contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>S-HATCH AI Solutions</p>
            <p>Transform your business with cutting-edge AI technology</p>
          </div>
        </div>
      `
    }

    // Send email
    console.log('Attempting to send email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email authentication failed. Please check your Gmail credentials.'
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Network error. Please check your internet connection.'
      } else {
        errorMessage = `Email error: ${error.message}`
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
