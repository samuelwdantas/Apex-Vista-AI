import { NextRequest, NextResponse } from 'next/server'
import { stripeWrapper } from '@/lib/stripe-wrapper'
import { updateSubscriptionStatus } from '@/lib/supabase-stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  // Check if Stripe is configured
  if (!stripeWrapper.isConfigured()) {
    console.warn('Stripe webhook called but Stripe is not configured')
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 400 }
    )
  }

  // Check if webhook secret is configured
  if (!webhookSecret || webhookSecret.includes('placeholder')) {
    console.warn('Stripe webhook called but webhook secret is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 400 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  try {
    // Use Stripe Wrapper to construct webhook event
    const event = stripeWrapper.constructWebhookEvent(body, signature, webhookSecret)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        await updateSubscriptionStatus(
          subscription.id,
          subscription.status,
          subscription.current_period_start,
          subscription.current_period_end
        )
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        await updateSubscriptionStatus(subscription.id, 'canceled')
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any
        if (invoice.subscription) {
          // Retrieve subscription using Stripe Wrapper
          const subscription = await stripeWrapper.retrieveSubscription(
            invoice.subscription as string
          )
          await updateSubscriptionStatus(
            subscription.id,
            subscription.status,
            subscription.current_period_start,
            subscription.current_period_end
          )
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        if (invoice.subscription) {
          const subscription = await stripeWrapper.retrieveSubscription(
            invoice.subscription as string
          )
          await updateSubscriptionStatus(subscription.id, subscription.status)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}