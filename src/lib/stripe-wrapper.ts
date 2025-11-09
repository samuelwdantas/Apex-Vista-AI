import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Check if Stripe keys are available
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Initialize Stripe instances only if keys are available and not placeholder
const isValidSecretKey = STRIPE_SECRET_KEY && !STRIPE_SECRET_KEY.includes('placeholder')
const isValidPublishableKey = STRIPE_PUBLISHABLE_KEY && !STRIPE_PUBLISHABLE_KEY.includes('placeholder')

const stripe = isValidSecretKey ? new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
}) : null

const stripePromise = isValidPublishableKey ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null

// Types
export interface PaymentIntentData {
  amount: number
  planType: 'monthly' | 'annual'
  customerEmail: string
  customerName: string
  metadata?: Record<string, string>
}

export interface SubscriptionData {
  customerId: string
  priceId: string
  userId: string
  metadata?: Record<string, string>
}

export interface CustomerData {
  email: string
  name: string
  phone?: string
  address?: Stripe.AddressParam
  metadata?: Record<string, string>
}

export interface PriceData {
  amount: number
  currency: string
  interval: 'month' | 'year'
  productName: string
}

// Stripe Wrapper Class
export class StripeWrapper {
  private static instance: StripeWrapper
  private stripe: Stripe | null
  private stripePromise: Promise<Stripe | null> | null

  private constructor() {
    this.stripe = stripe
    this.stripePromise = stripePromise
  }

  public static getInstance(): StripeWrapper {
    if (!StripeWrapper.instance) {
      StripeWrapper.instance = new StripeWrapper()
    }
    return StripeWrapper.instance
  }

  // Check if Stripe is configured
  private ensureStripeConfigured(): void {
    if (!this.stripe) {
      throw new Error('Stripe is not configured. Please set valid STRIPE_SECRET_KEY environment variable.')
    }
  }

  // Get client-side Stripe instance
  public async getStripeClient(): Promise<Stripe | null> {
    if (!this.stripePromise) {
      throw new Error('Stripe is not configured. Please set valid NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable.')
    }
    return await this.stripePromise
  }

  // Payment Intent Methods
  public async createPaymentIntent(data: PaymentIntentData): Promise<Stripe.PaymentIntent> {
    this.ensureStripeConfigured()
    
    try {
      const paymentIntent = await this.stripe!.paymentIntents.create({
        amount: data.amount * 100, // Convert to cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          planType: data.planType,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          ...data.metadata,
        },
      })

      return paymentIntent
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw new Error('Failed to create payment intent')
    }
  }

  public async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.paymentIntents.retrieve(paymentIntentId)
    } catch (error) {
      console.error('Error retrieving payment intent:', error)
      throw new Error('Failed to retrieve payment intent')
    }
  }

  public async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<Stripe.PaymentIntent> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      })
    } catch (error) {
      console.error('Error confirming payment intent:', error)
      throw new Error('Failed to confirm payment intent')
    }
  }

  // Customer Methods
  public async createCustomer(data: CustomerData): Promise<Stripe.Customer> {
    this.ensureStripeConfigured()
    
    try {
      const customer = await this.stripe!.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        metadata: data.metadata,
      })

      return customer
    } catch (error) {
      console.error('Error creating customer:', error)
      throw new Error('Failed to create customer')
    }
  }

  public async retrieveCustomer(customerId: string): Promise<Stripe.Customer> {
    this.ensureStripeConfigured()
    
    try {
      const customer = await this.stripe!.customers.retrieve(customerId)
      return customer as Stripe.Customer
    } catch (error) {
      console.error('Error retrieving customer:', error)
      throw new Error('Failed to retrieve customer')
    }
  }

  public async updateCustomer(
    customerId: string,
    data: Partial<CustomerData>
  ): Promise<Stripe.Customer> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.customers.update(customerId, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        metadata: data.metadata,
      })
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Failed to update customer')
    }
  }

  // Subscription Methods
  public async createSubscription(data: SubscriptionData): Promise<Stripe.Subscription> {
    this.ensureStripeConfigured()
    
    try {
      const subscription = await this.stripe!.subscriptions.create({
        customer: data.customerId,
        items: [{ price: data.priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: data.userId,
          ...data.metadata,
        },
      })

      return subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw new Error('Failed to create subscription')
    }
  }

  public async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice.payment_intent'],
      })
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      throw new Error('Failed to retrieve subscription')
    }
  }

  public async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.subscriptions.cancel(subscriptionId)
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw new Error('Failed to cancel subscription')
    }
  }

  public async updateSubscription(
    subscriptionId: string,
    priceId: string
  ): Promise<Stripe.Subscription> {
    this.ensureStripeConfigured()
    
    try {
      const subscription = await this.stripe!.subscriptions.retrieve(subscriptionId)
      
      return await this.stripe!.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceId,
        }],
      })
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw new Error('Failed to update subscription')
    }
  }

  // Price Methods
  public async createPrice(data: PriceData): Promise<Stripe.Price> {
    this.ensureStripeConfigured()
    
    try {
      // First create a product
      const product = await this.stripe!.products.create({
        name: data.productName,
      })

      // Then create the price
      return await this.stripe!.prices.create({
        unit_amount: data.amount * 100, // Convert to cents
        currency: data.currency,
        recurring: { interval: data.interval },
        product: product.id,
      })
    } catch (error) {
      console.error('Error creating price:', error)
      throw new Error('Failed to create price')
    }
  }

  public async listPrices(): Promise<Stripe.Price[]> {
    this.ensureStripeConfigured()
    
    try {
      const prices = await this.stripe!.prices.list({
        active: true,
        expand: ['data.product'],
      })
      return prices.data
    } catch (error) {
      console.error('Error listing prices:', error)
      throw new Error('Failed to list prices')
    }
  }

  // Invoice Methods
  public async retrieveInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.invoices.retrieve(invoiceId)
    } catch (error) {
      console.error('Error retrieving invoice:', error)
      throw new Error('Failed to retrieve invoice')
    }
  }

  public async listCustomerInvoices(customerId: string): Promise<Stripe.Invoice[]> {
    this.ensureStripeConfigured()
    
    try {
      const invoices = await this.stripe!.invoices.list({
        customer: customerId,
        limit: 100,
      })
      return invoices.data
    } catch (error) {
      console.error('Error listing customer invoices:', error)
      throw new Error('Failed to list customer invoices')
    }
  }

  // Payment Method Methods
  public async attachPaymentMethod(
    paymentMethodId: string,
    customerId: string
  ): Promise<Stripe.PaymentMethod> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      })
    } catch (error) {
      console.error('Error attaching payment method:', error)
      throw new Error('Failed to attach payment method')
    }
  }

  public async listCustomerPaymentMethods(
    customerId: string
  ): Promise<Stripe.PaymentMethod[]> {
    this.ensureStripeConfigured()
    
    try {
      const paymentMethods = await this.stripe!.paymentMethods.list({
        customer: customerId,
        type: 'card',
      })
      return paymentMethods.data
    } catch (error) {
      console.error('Error listing payment methods:', error)
      throw new Error('Failed to list payment methods')
    }
  }

  // Webhook Methods
  public constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Stripe.Event {
    this.ensureStripeConfigured()
    
    try {
      return this.stripe!.webhooks.constructEvent(payload, signature, secret)
    } catch (error) {
      console.error('Error constructing webhook event:', error)
      throw new Error('Failed to construct webhook event')
    }
  }

  // Billing Portal Methods
  public async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<Stripe.BillingPortal.Session> {
    this.ensureStripeConfigured()
    
    try {
      return await this.stripe!.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      })
    } catch (error) {
      console.error('Error creating billing portal session:', error)
      throw new Error('Failed to create billing portal session')
    }
  }

  // Utility Methods
  public formatAmount(amount: number): string {
    return (amount / 100).toFixed(2)
  }

  public formatCurrency(amount: number, currency: string = 'usd'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  public isValidWebhookSignature(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): boolean {
    try {
      this.constructWebhookEvent(payload, signature, secret)
      return true
    } catch {
      return false
    }
  }

  // Check if Stripe is configured
  public isConfigured(): boolean {
    return this.stripe !== null
  }
}

// Export singleton instance
export const stripeWrapper = StripeWrapper.getInstance()

// Export configuration
export const stripeConfig = {
  appearance: {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#10b981',
      colorBackground: '#111827',
      colorText: '#f9fafb',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        backgroundColor: '#1f2937',
        border: '1px solid #10b981',
      },
      '.Input:focus': {
        border: '2px solid #10b981',
        boxShadow: '0 0 0 1px #10b981',
      },
      '.Label': {
        color: '#d1d5db',
        fontWeight: '500',
      },
    },
  },
}