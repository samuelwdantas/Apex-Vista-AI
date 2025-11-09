import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message, contactType } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Initialize Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Contact Type:</strong> ${contactType === 'agency' ? 'Agency Partnership' : 'General Contact'}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    // Send email
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = `New ${contactType === 'agency' ? 'Agency Partnership' : 'Contact'} Request - ${name}`
    sendSmtpEmail.htmlContent = emailContent
    sendSmtpEmail.sender = { 
      name: 'Apex Vista AI', 
      email: 'apexvistaai@gmail.com' 
    }
    sendSmtpEmail.to = [{ 
      email: email,
      name: name 
    }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json({ 
      success: true, 
      message: 'Contact email sent successfully' 
    })

  } catch (error) {
    console.error('Brevo contact email error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact email' },
      { status: 500 }
    )
  }
}