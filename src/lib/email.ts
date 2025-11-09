import { supabase, emailConfig } from './supabase'

export interface EmailReceiptData {
  userEmail: string
  userName: string
  formType: string
  formData: Record<string, any>
  submissionId: string
  timestamp: Date
}

export async function sendEmailReceipt(data: EmailReceiptData) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { userEmail, userName, formType, formData, submissionId, timestamp } = data

    // Format form data for display
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        return `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">${label}:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value}</td>
        </tr>`
      })
      .join('')

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Form Submission Receipt</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Form Submission Receipt</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0;">Thank you for your submission!</p>
          </div>

          <!-- Greeting -->
          <div style="margin-bottom: 25px;">
            <p style="font-size: 16px; margin: 0;">Hi ${userName},</p>
            <p style="margin: 10px 0 0 0; color: #6b7280;">We've successfully received your ${formType.replace('-', ' ')} submission. Here's a copy of your information for your records:</p>
          </div>

          <!-- Submission Details -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Submission Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Submission ID:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-family: monospace;">${submissionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Date & Time:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${timestamp.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Form Type:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${formType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
              </tr>
            </table>
          </div>

          <!-- Form Data -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Your Information</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${formDataHtml}
            </table>
          </div>

          <!-- Next Steps -->
          <div style="background: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              <li>We'll review your submission within 24 hours</li>
              <li>You'll receive a follow-up email with next steps</li>
              <li>Keep this receipt for your records</li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">Need help? Contact us:</p>
            <p style="margin: 0;">
              <a href="mailto:contact@apexvistaai.com" style="color: #10b981; text-decoration: none;">contact@apexvistaai.com</a> | 
              <a href="tel:850-565-1031" style="color: #10b981; text-decoration: none;">850-565-1031</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2024 Apex Vista AI. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This is an automated message. Please do not reply to this email.</p>
          </div>

        </body>
      </html>
    `

    // Use Supabase Edge Function to send email
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: userEmail,
        subject: `Receipt: Your ${formType.replace('-', ' ')} submission`,
        html: emailHtml,
        from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`
      }
    })

    if (error) {
      console.error('Supabase email function error:', error)
      throw error
    }

    return { success: true, messageId: data?.messageId }
  } catch (error) {
    console.error('Failed to send email receipt via Supabase:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Alternative function for sending notification emails to admin
export async function sendAdminNotification(data: EmailReceiptData) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { userEmail, userName, formType, formData, submissionId, timestamp } = data

    // Format form data for admin view
    const formDataHtml = Object.entries(formData)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        return `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">${label}:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${value}</td>
        </tr>`
      })
      .join('')

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 12px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Form Submission</h1>
            <p style="color: #dbeafe; margin: 10px 0 0 0;">You have received a new ${formType.replace('-', ' ')} submission</p>
          </div>

          <!-- User Info -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Submission Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">User Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${userName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">User Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Submission ID:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-family: monospace;">${submissionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Date & Time:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${timestamp.toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Form Type:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${formType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
              </tr>
            </table>
          </div>

          <!-- Form Data -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px;">Submitted Information</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${formDataHtml}
            </table>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2024 Apex Vista AI Admin Notification</p>
            <p style="margin: 5px 0 0 0;">This is an automated admin notification.</p>
          </div>

        </body>
      </html>
    `

    // Send admin notification via Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: 'admin@apexvistaai.com', // Admin email
        subject: `New ${formType.replace('-', ' ')} submission from ${userName}`,
        html: adminEmailHtml,
        from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`
      }
    })

    if (error) {
      console.error('Supabase admin notification error:', error)
      throw error
    }

    return { success: true, messageId: data?.messageId }
  } catch (error) {
    console.error('Failed to send admin notification via Supabase:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Helper function to generate unique submission ID
export function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `SUB-${timestamp}-${randomStr}`.toUpperCase()
}