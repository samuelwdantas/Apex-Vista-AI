import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      email,
      business_name,
      full_name,
      industry,
      phone_number,
      plan_type,
      plan_price,
      status,
      created_at
    } = body

    // Insert subscription into Supabase
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          email,
          business_name,
          full_name,
          industry,
          phone_number,
          plan_type,
          plan_price,
          status,
          created_at
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      )
    }

    // Send welcome email via Brevo
    try {
      const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY!
        },
        body: JSON.stringify({
          sender: {
            name: 'Apex Vista AI',
            email: 'apexvistaai@gmail.com'
          },
          to: [
            {
              email: email,
              name: full_name || business_name
            }
          ],
          subject: 'Welcome to Apex Vista AI - Your Subscription is Active!',
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; border-radius: 16px; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #10b981 0%, #22c55e 50%, #84cc16 100%); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1f2937;">Welcome to Apex Vista AI!</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px; color: #1f2937; opacity: 0.9;">Your ${plan_type} subscription is now active</p>
              </div>
              
              <div style="padding: 40px 20px;">
                <h2 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">Hi ${full_name || business_name}!</h2>
                
                <p style="font-size: 16px; line-height: 1.6; color: #d1d5db; margin-bottom: 20px;">
                  Thank you for subscribing to Apex Vista AI! Your account is now set up and ready to go.
                </p>
                
                <div style="background: #374151; border-radius: 12px; padding: 20px; margin: 30px 0;">
                  <h3 style="color: #22c55e; margin-top: 0;">Your Subscription Details:</h3>
                  <ul style="color: #d1d5db; line-height: 1.8;">
                    <li><strong>Plan:</strong> Reach Booster (${plan_type})</li>
                    <li><strong>Price:</strong> $${plan_price}/${plan_type === 'annual' ? 'year' : 'month'}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Business:</strong> ${business_name}</li>
                    ${industry ? `<li><strong>Industry:</strong> ${industry}</li>` : ''}
                  </ul>
                </div>
                
                <h3 style="color: #22c55e; margin-bottom: 15px;">What's Next?</h3>
                <ul style="color: #d1d5db; line-height: 1.8; margin-bottom: 30px;">
                  <li>Access your dashboard with your login credentials</li>
                  <li>Start generating up to 50 content assets per month</li>
                  <li>Explore our AI-powered Content Generator and Trend Analyzer</li>
                  <li>Set up your workflow automation tools</li>
                  <li>Take advantage of your 10% discount on custom development services</li>
                </ul>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="display: inline-block; background: linear-gradient(90deg, #10b981 0%, #22c55e 50%, #84cc16 100%); color: #1f2937; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Access Your Dashboard →
                  </a>
                </div>
                
                <div style="border-top: 1px solid #374151; padding-top: 30px; margin-top: 40px;">
                  <h3 style="color: #22c55e; margin-bottom: 15px;">Need Help?</h3>
                  <p style="color: #d1d5db; margin-bottom: 15px;">
                    Our support team is here to help you get the most out of Apex Vista AI:
                  </p>
                  <ul style="color: #d1d5db; line-height: 1.6;">
                    <li>📧 Email: <a href="mailto:apexvistaai@gmail.com" style="color: #10b981;">apexvistaai@gmail.com</a></li>
                    <li>📞 Phone: 850-565-1031</li>
                    <li>📚 Knowledge Base: Access help articles in your dashboard</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #374151;">
                  <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                    Thank you for choosing Apex Vista AI to power your business automation!
                  </p>
                  <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
                    © 2024 Apex Vista AI. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          `
        })
      })

      if (!brevoResponse.ok) {
        console.error('Failed to send welcome email:', await brevoResponse.text())
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { 
        message: 'Subscription created successfully',
        subscription: data[0]
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}