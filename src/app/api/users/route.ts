import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('users')
      .select(`
        id,
        email,
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
        subscription_start_date,
        subscription_end_date,
        created_at
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by email if provided
    if (email) {
      query = query.eq('email', email)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch users.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        users: data,
        total: count,
        limit,
        offset
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id,
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
        subscription_start_date,
        subscription_end_date
      `)
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Verify password (in production, use bcrypt.compare)
    const passwordMatch = user.password_hash === btoa(password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Check if subscription is active
    const now = new Date()
    const subscriptionEnd = new Date(user.subscription_end_date)
    const isSubscriptionActive = subscriptionEnd > now && user.status === 'active'

    // Return user data without password
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        user: {
          ...userWithoutPassword,
          subscription_active: isSubscriptionActive
        },
        message: 'Login successful'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}