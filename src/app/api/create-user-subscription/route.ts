import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseServiceKey
      })
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const body = await request.json()
    
    const {
      email,
      password_hash,
      full_name,
      business_name,
      industry,
      phone_number,
      plan_type,
      plan_price,
      card_last_four,
      card_brand,
      card_exp_month,
      card_exp_year,
      billing_address,
      status = 'active'
    } = body

    console.log('Creating user subscription for:', { email, full_name, plan_type })

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      )
    }

    // Calculate subscription end date
    const subscriptionStartDate = new Date()
    const subscriptionEndDate = new Date(subscriptionStartDate)
    if (plan_type === 'annual') {
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1)
    } else {
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1)
    }

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash,
          full_name,
          business_name,
          industry,
          phone_number,
          plan_type,
          plan_price,
          status,
          card_last_four,
          card_brand,
          card_exp_month,
          card_exp_year,
          billing_address,
          subscription_start_date: subscriptionStartDate.toISOString(),
          subscription_end_date: subscriptionEndDate.toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      )
    }

    console.log('User created successfully in Supabase:', data[0].id)

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: data[0].id,
          email: data[0].email,
          full_name: data[0].full_name,
          plan_type: data[0].plan_type,
          plan_price: data[0].plan_price
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}