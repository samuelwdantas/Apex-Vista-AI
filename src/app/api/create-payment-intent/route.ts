import { NextRequest, NextResponse } from 'next/server'
import { stripeWrapper } from '@/lib/stripe-wrapper'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripeWrapper.isConfigured()) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. Please set up Stripe environment variables.' },
        { status: 503 }
      )
    }

    const { amount, planType, customerEmail, customerName, metadata } = await request.json()

    // Validate required fields
    if (!amount || !planType || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create payment intent using Stripe Wrapper
    const paymentIntent = await stripeWrapper.createPaymentIntent({
      amount,
      planType,
      customerEmail,
      customerName,
      metadata,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}