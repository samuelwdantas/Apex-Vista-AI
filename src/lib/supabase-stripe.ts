import { supabaseAdmin } from './supabase-admin'
import Stripe from 'stripe'

// Check if Stripe key is available and not placeholder
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const isValidSecretKey = STRIPE_SECRET_KEY && !STRIPE_SECRET_KEY.includes('placeholder')

const stripe = isValidSecretKey ? new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
}) : null

export interface StripeCustomer {
  id: string
  user_id: string
  stripe_customer_id: string
  email: string
}

export interface StripeSubscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  status: string
  price_id: string
  current_period_start: string
  current_period_end: string
}

// Helper function to ensure Stripe is configured
function ensureStripeConfigured(): void {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set valid STRIPE_SECRET_KEY environment variable.')
  }
}

// Helper function to ensure Supabase is configured
function ensureSupabaseConfigured(): void {
  if (!supabaseAdmin) {
    throw new Error('Supabase is not configured. Please set valid environment variables.')
  }
}

// Create or get Stripe customer
export async function createOrGetStripeCustomer(
  userId: string,
  email: string,
  name?: string
): Promise<string> {
  ensureStripeConfigured()
  ensureSupabaseConfigured()

  // Check if customer already exists in our database
  const { data: existingCustomer } = await supabaseAdmin!
    .from('customers')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (existingCustomer) {
    return existingCustomer.stripe_customer_id
  }

  // Create new Stripe customer
  const stripeCustomer = await stripe!.customers.create({
    email,
    name,
    metadata: {
      user_id: userId,
    },
  })

  // Save to our database
  await supabaseAdmin!.from('customers').insert({
    user_id: userId,
    stripe_customer_id: stripeCustomer.id,
    email,
  })

  return stripeCustomer.id
}

// Create Stripe subscription
export async function createStripeSubscription(
  customerId: string,
  priceId: string,
  userId: string
): Promise<Stripe.Subscription> {
  ensureStripeConfigured()
  ensureSupabaseConfigured()

  const subscription = await stripe!.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      user_id: userId,
    },
  })

  // Save subscription to our database
  await supabaseAdmin!.from('subscriptions').insert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    status: subscription.status,
    price_id: priceId,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  })

  return subscription
}

// Get user's active subscription
export async function getUserSubscription(userId: string): Promise<StripeSubscription | null> {
  ensureSupabaseConfigured()
  
  const { data } = await supabaseAdmin!
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  return data
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  ensureStripeConfigured()
  ensureSupabaseConfigured()

  await stripe!.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })

  await supabaseAdmin!
    .from('subscriptions')
    .update({ cancel_at_period_end: true })
    .eq('stripe_subscription_id', subscriptionId)
}

// Update subscription status (for webhooks)
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: string,
  currentPeriodStart?: number,
  currentPeriodEnd?: number
): Promise<void> {
  ensureSupabaseConfigured()
  
  const updateData: any = { status }
  
  if (currentPeriodStart) {
    updateData.current_period_start = new Date(currentPeriodStart * 1000).toISOString()
  }
  
  if (currentPeriodEnd) {
    updateData.current_period_end = new Date(currentPeriodEnd * 1000).toISOString()
  }

  await supabaseAdmin!
    .from('subscriptions')
    .update(updateData)
    .eq('stripe_subscription_id', subscriptionId)
}

// Get available prices
export async function getPrices() {
  ensureSupabaseConfigured()
  
  const { data } = await supabaseAdmin!
    .from('prices')
    .select(`
      *,
      products (*)
    `)
    .eq('active', true)
    .order('unit_amount')

  return data || []
}

// Create checkout session for subscription
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  ensureStripeConfigured()

  return await stripe!.checkout.sessions.create({
    customer: customerId,
    billing_address_collection: 'required',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 7, // 7-day free trial
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
}

// Create customer portal session
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  ensureStripeConfigured()

  return await stripe!.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}