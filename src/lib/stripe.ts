// Re-export everything from stripe-wrapper for backward compatibility
export { stripeWrapper, stripeConfig } from './stripe-wrapper'

// Legacy exports for existing code
export const stripePromise = stripeWrapper.getStripeClient()