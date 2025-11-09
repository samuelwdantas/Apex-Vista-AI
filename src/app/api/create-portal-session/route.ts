import { NextRequest, NextResponse } from 'next/server'
import { stripeWrapper } from '@/lib/stripe-wrapper'

export async function POST(request: NextRequest) {
  try {
    const { customerId, returnUrl } = await request.json()

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }

    // Create billing portal session using Stripe Wrapper
    const session = await stripeWrapper.createBillingPortalSession(
      customerId,
      returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}