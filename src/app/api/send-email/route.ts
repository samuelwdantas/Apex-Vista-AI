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
      <h2>New Lead from Apex Vista AI Website</h2>
      <p><strong>Lead Type:</strong> ${leadType === 'smb' ? 'Small/Medium Business' : 'Agency'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Business Name:</strong> ${businessName}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    // Send email to Apex Vista AI (company email)
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = `New ${leadType === 'smb' ? 'SMB' : 'Agency'} Lead - ${businessName}`
    sendSmtpEmail.htmlContent = emailContent
    sendSmtpEmail.sender = { 
      name: 'Apex Vista AI Website', 
      email: 'noreply@apexvistaai.com' 
    }
    sendSmtpEmail.to = [{ 
      email: 'contact@apexvistaai.com',
      name: 'Apex Vista AI Team' 
    }]
    // Add reply-to with the lead's email
    sendSmtpEmail.replyTo = {
      email: email,
      name: businessName
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully' 
    })

  } catch (error) {
    console.error('Brevo email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}