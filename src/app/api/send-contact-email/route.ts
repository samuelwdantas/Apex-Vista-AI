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

    // Create email content for company
    const emailContent = `
      <h2>New Contact Form Submission from Website</h2>
      <p><strong>Contact Type:</strong> ${
        contactType === 'agency' ? 'Agency Partnership' : 
        contactType === 'consultation' ? 'FREE AI Strategy Session' :
        contactType === 'custom_quote' ? 'Custom Development Quote' :
        'General Contact'
      }</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    // Send email to Apex Vista AI (company email)
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = `New ${
      contactType === 'agency' ? 'Agency Partnership' : 
      contactType === 'consultation' ? 'FREE AI Strategy Session' :
      contactType === 'custom_quote' ? 'Custom Development Quote' :
      'Contact'
    } Request - ${name}`
    sendSmtpEmail.htmlContent = emailContent
    sendSmtpEmail.sender = { 
      name: 'Apex Vista AI Website', 
      email: 'noreply@apexvistaai.com' 
    }
    sendSmtpEmail.to = [{ 
      email: 'contact@apexvistaai.com',
      name: 'Apex Vista AI Team' 
    }]
    // Add reply-to with the contact's email
    sendSmtpEmail.replyTo = {
      email: email,
      name: name
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    // Create confirmation email content for the user
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Apex Vista AI</h1>
          <p style="color: #6b7280; margin: 5px 0;">Artificial Intelligence Solutions</p>
        </div>
        
        <h2 style="color: #1f2937;">Thank you for contacting us!</h2>
        
        <p>Dear ${name},</p>
        
        <p>We have successfully received your ${
          contactType === 'agency' ? 'agency partnership inquiry' : 
          contactType === 'consultation' ? 'FREE AI Strategy Session request' :
          contactType === 'custom_quote' ? 'custom development quote request' :
          'contact message'
        } and appreciate you reaching out to Apex Vista AI.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1f2937;">Your Message Summary:</h3>
          <p><strong>Contact Type:</strong> ${
            contactType === 'agency' ? 'Agency Partnership' : 
            contactType === 'consultation' ? 'FREE AI Strategy Session' :
            contactType === 'custom_quote' ? 'Custom Development Quote' :
            'General Contact'
          }</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Message:</strong> ${message}</p>
        </div>
        
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Our team will review your ${contactType === 'consultation' ? 'session request' : 'inquiry'} within 24 hours</li>
          <li>We'll respond to you directly at ${email}</li>
          <li>${contactType === 'consultation' ? 'We\'ll schedule your FREE AI Strategy Session at a time that works for you' : 'We\'ll provide you with detailed information tailored to your needs'}</li>
        </ul>
        
        <p>In the meantime, feel free to explore our website to learn more about our AI solutions and success stories.</p>
        
        <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
          <h3 style="margin: 0 0 10px 0;">Ready to Transform Your Business with AI?</h3>
          <p style="margin: 0;">Visit our website: <a href="https://apexvistaai.com" style="color: #93c5fd;">apexvistaai.com</a></p>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
          <p><strong>Apex Vista AI</strong></p>
          <p>Phone: +1 (850) 565-1031</p>
          <p>Email: contact@apexvistaai.com</p>
          <p>Facebook: <a href="https://www.facebook.com/profile.php?id=61583213563840" style="color: #2563eb;">Follow us on Facebook</a></p>
        </div>
      </div>
    `

    // Send confirmation email to the user
    const confirmationEmail = new brevo.SendSmtpEmail()
    confirmationEmail.subject = `Thank you for contacting Apex Vista AI - We've received your ${
      contactType === 'consultation' ? 'FREE AI Strategy Session request' : 'message'
    }`
    confirmationEmail.htmlContent = confirmationContent
    confirmationEmail.sender = { 
      name: 'Apex Vista AI', 
      email: 'contact@apexvistaai.com' 
    }
    confirmationEmail.to = [{ 
      email: email,
      name: name 
    }]

    await apiInstance.sendTransacEmail(confirmationEmail)

    return NextResponse.json({ 
      success: true, 
      message: 'Contact message sent successfully and confirmation email delivered' 
    })

  } catch (error) {
    console.error('Brevo contact email error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact email' },
      { status: 500 }
    )
  }
}