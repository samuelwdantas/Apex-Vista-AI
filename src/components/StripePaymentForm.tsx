'use client'

import { useState, useEffect } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { stripeWrapper, stripeConfig } from '@/lib/stripe-wrapper'

interface StripePaymentFormProps {
  clientSecret: string
  onSuccess: () => void
  onError: (error: string) => void
  amount: number
  planType: string
}

function CheckoutForm({ onSuccess, onError, amount, planType }: Omit<StripePaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      onError(error.message || 'An unexpected error occurred.')
    } else {
      onSuccess()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
      </div>
      
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
        <div className="flex justify-between items-center text-white">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold text-emerald-400">
            ${amount}/{planType === 'annual' ? 'year' : 'month'}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none text-lg"
      >
        {isLoading ? 'Processing...' : `Subscribe Now - $${amount}`}
      </button>
    </form>
  )
}

export default function StripePaymentForm({ clientSecret, onSuccess, onError, amount, planType }: StripePaymentFormProps) {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null)

  useEffect(() => {
    // Get Stripe client from wrapper
    const initStripe = async () => {
      const stripeClient = await stripeWrapper.getStripeClient()
      setStripePromise(Promise.resolve(stripeClient))
    }
    
    initStripe()
  }, [])

  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: stripeConfig.appearance,
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm 
        onSuccess={onSuccess}
        onError={onError}
        amount={amount}
        planType={planType}
      />
    </Elements>
  )
}