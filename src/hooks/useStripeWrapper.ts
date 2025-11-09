'use client'

import { useState, useCallback } from 'react'
import { stripeWrapper } from '@/lib/stripe-wrapper'

export interface UseStripeWrapperReturn {
  // Payment Intent
  createPaymentIntent: (data: {
    amount: number
    planType: 'monthly' | 'annual'
    customerEmail: string
    customerName: string
    metadata?: Record<string, string>
  }) => Promise<{ clientSecret: string; paymentIntentId: string }>
  
  // Customer
  createCustomer: (data: {
    email: string
    name: string
    phone?: string
    address?: any
    metadata?: Record<string, string>
  }) => Promise<any>
  
  // Subscription
  createSubscription: (data: {
    customerId: string
    priceId: string
    userId: string
    metadata?: Record<string, string>
  }) => Promise<any>
  
  // Billing Portal
  createBillingPortalSession: (customerId: string, returnUrl?: string) => Promise<{ url: string }>
  
  // Invoices
  getCustomerInvoices: (customerId: string) => Promise<any[]>
  
  // Payment Methods
  getCustomerPaymentMethods: (customerId: string) => Promise<any[]>
  
  // State
  loading: boolean
  error: string | null
}

export function useStripeWrapper(): UseStripeWrapperReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAsync = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await operation()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createPaymentIntent = useCallback(async (data: {
    amount: number
    planType: 'monthly' | 'annual'
    customerEmail: string
    customerName: string
    metadata?: Record<string, string>
  }) => {
    return handleAsync(async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }
      
      return response.json()
    })
  }, [handleAsync])

  const createCustomer = useCallback(async (data: {
    email: string
    name: string
    phone?: string
    address?: any
    metadata?: Record<string, string>
  }) => {
    return handleAsync(async () => {
      return await stripeWrapper.createCustomer(data)
    })
  }, [handleAsync])

  const createSubscription = useCallback(async (data: {
    customerId: string
    priceId: string
    userId: string
    metadata?: Record<string, string>
  }) => {
    return handleAsync(async () => {
      return await stripeWrapper.createSubscription(data)
    })
  }, [handleAsync])

  const createBillingPortalSession = useCallback(async (
    customerId: string,
    returnUrl?: string
  ) => {
    return handleAsync(async () => {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customerId, 
          returnUrl: returnUrl || `${window.location.origin}/dashboard`
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create billing portal session')
      }
      
      return response.json()
    })
  }, [handleAsync])

  const getCustomerInvoices = useCallback(async (customerId: string) => {
    return handleAsync(async () => {
      return await stripeWrapper.listCustomerInvoices(customerId)
    })
  }, [handleAsync])

  const getCustomerPaymentMethods = useCallback(async (customerId: string) => {
    return handleAsync(async () => {
      return await stripeWrapper.listCustomerPaymentMethods(customerId)
    })
  }, [handleAsync])

  return {
    createPaymentIntent,
    createCustomer,
    createSubscription,
    createBillingPortalSession,
    getCustomerInvoices,
    getCustomerPaymentMethods,
    loading,
    error,
  }
}