import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'

export async function POST(request: NextRequest) {
  try {
    const { email, businessName, phone, leadType } = await request.json()

    // Validate required fields
    if (!email || !businessName) {
      return NextResponse.json(
        { error: 'Email and business name are required' },
        { status: 400 }
      )
    }

    // Initialize Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)

    // Create email content
    const emailContent = `
      <h2>New Lead from Apex Vista AI</h2>
      <p><strong>Lead Type:</strong> ${leadType === 'smb' ? 'Small/Medium Business' : 'Agency'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Business Name:</strong> ${businessName}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    // Send email
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = `New ${leadType === 'smb' ? 'SMB' : 'Agency'} Lead - ${businessName}`
    sendSmtpEmail.htmlContent = emailContent
    sendSmtpEmail.sender = { 
      name: 'Apex Vista AI', 
      email: 'apexvistaai@gmail.com' 
    }
    sendSmtpEmail.to = [{ 
      email: email,
      name: businessName 
    }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (error) {
    console.error('Brevo email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}