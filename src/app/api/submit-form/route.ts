import { NextRequest, NextResponse } from 'next/server'
import { sendEmailReceipt, sendAdminNotification, generateSubmissionId, type EmailReceiptData } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { userEmail, userName, formType, formData } = body

    // Validate required fields
    if (!userEmail || !userName || !formType || !formData) {
      return NextResponse.json(
        { error: 'Missing required fields: userEmail, userName, formType, formData' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Generate submission ID and timestamp
    const submissionId = generateSubmissionId()
    const timestamp = new Date()

    // Prepare email data
    const emailData: EmailReceiptData = {
      userEmail,
      userName,
      formType,
      formData,
      submissionId,
      timestamp
    }

    // Send email receipt to user via Supabase
    const emailResult = await sendEmailReceipt(emailData)

    // Send admin notification via Supabase (don't fail if this fails)
    const adminResult = await sendAdminNotification(emailData)
    if (!adminResult.success) {
      console.warn('Admin notification failed:', adminResult.error)
    }

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send email receipt via Supabase', details: emailResult.error },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully and receipt sent via Supabase',
      submissionId,
      timestamp: timestamp.toISOString(),
      emailSent: true,
      adminNotified: adminResult.success,
      messageId: emailResult.messageId,
      service: 'supabase-edge-function'
    })

  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}