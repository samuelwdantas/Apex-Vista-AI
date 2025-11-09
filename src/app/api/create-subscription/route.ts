import { NextRequest, NextResponse } from 'next/server'
import { stripeWrapper } from '@/lib/stripe-wrapper'
import { createSupabaseClient } from '@/lib/supabase'

// Create Supabase admin client for user creation
const createSupabaseAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }
  
  const { createClient } = require('@supabase/supabase-js')
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      password, 
      full_name, 
      business_name, 
      industry, 
      phone_number, 
      plan_type, 
      plan_price,
      billing_address 
    } = await request.json()

    // Validate required fields
    if (!email || !password || !full_name || !plan_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createSupabaseAdminClient()
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        business_name,
        industry,
        phone_number,
      }
    })

    if (authError || !authData.user) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 400 }
      )
    }

    const userId = authData.user.id

    // Create Stripe customer using Stripe Wrapper
    const customer = await stripeWrapper.createCustomer({
      email,
      name: full_name,
      phone: phone_number,
      address: billing_address ? {
        line1: billing_address,
      } : undefined,
      metadata: {
        userId,
        business_name: business_name || '',
        industry: industry || '',
      }
    })

    // Determine price ID based on plan
    const priceId = plan_type === 'annual' ? 'price_annual_290' : 'price_monthly_29'

    // Create Stripe subscription using Stripe Wrapper
    const subscription = await stripeWrapper.createSubscription({
      customerId: customer.id,
      priceId,
      userId,
      metadata: {
        plan_type,
        plan_price: plan_price.toString(),
      }
    })

    // Save user profile data
    const supabase = createSupabaseClient()
    if (supabase) {
      await supabase.from('users').insert({
        id: userId,
        email,
        full_name,
        business_name,
        industry,
        phone_number,
        plan_type,
        plan_price,
        billing_address,
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: new Date(Date.now() + (plan_type === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        subscription_active: true,
      })
    }

    return NextResponse.json({
      success: true,
      user_id: userId,
      customer_id: customer.id,
      subscription_id: subscription.id,
      client_secret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
    })

  } catch (error) {
    console.error('Subscription creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}