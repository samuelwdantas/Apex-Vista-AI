'use client'

import { useState } from 'react'
import { ArrowLeft, Lock, Check, CreditCard, User, Mail, Building, Phone, Globe, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function SubscribePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnnual, setIsAnnual] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Account & Contact Information
    email: '',
    password: '',
    businessName: '',
    fullName: '',
    industry: '',
    phoneNumber: '',
    
    // Step 2: Payment Information
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    billingZip: '',
    
    // Terms acceptance
    acceptTerms: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate required fields for step 1
      if (!formData.email || !formData.password || !formData.businessName) {
        setMessage('Please fill in all required fields')
        return
      }
      setCurrentStep(2)
      setMessage('')
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
      setMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields for step 2
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvc || !formData.billingZip) {
      setMessage('Please fill in all payment information')
      return
    }

    if (!formData.acceptTerms) {
      setMessage('Please accept the Terms of Service and Privacy Policy')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Here you would integrate with your payment processor (Stripe, PayPal, etc.)
      // For now, we'll simulate the process
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create subscription record in Supabase
      const subscriptionData = {
        email: formData.email,
        business_name: formData.businessName,
        full_name: formData.fullName,
        industry: formData.industry,
        phone_number: formData.phoneNumber,
        plan_type: isAnnual ? 'annual' : 'monthly',
        plan_price: isAnnual ? 290 : 29,
        status: 'active'
        // Removed the client-side date generation that was causing hydration mismatch
      }

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      })

      if (response.ok) {
        setMessage('✅ Subscription created successfully! Welcome to Apex Vista AI!')
        // Redirect to dashboard or success page after a delay
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        throw new Error('Failed to create subscription')
      }
    } catch (error) {
      setMessage('❌ There was an error processing your subscription. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </Link>
            
            <Link 
              href="/pricing" 
              className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Pricing</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Subscribe to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Reach Booster</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Start automating your business with AI-powered tools
          </p>

          {/* Plan Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-lime-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                Save 2 months!
              </span>
            )}
          </div>

          {/* Pricing Display */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-emerald-500 rounded-2xl p-6 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                ${isAnnual ? '290' : '29'}
                <span className="text-lg text-gray-400 font-normal">
                  /{isAnnual ? 'year' : 'month'}
                </span>
              </div>
              {isAnnual && (
                <div className="text-sm text-lime-400 font-medium">
                  $24.17/month when paid annually
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-600 text-gray-400'
            }`}>
              {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-600'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= 2 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-600 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl">
          {/* SSL Security Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">SSL Encrypted & Secure</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account & Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Account & Contact Information</h2>
                  <p className="text-gray-400">Create your account and provide basic information</p>
                </div>

                {/* Required Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Primary login ID and for receipts</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For secure access to your dashboard</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business/Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your business name"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For personalization and billing</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-gray-500">(Recommended)</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For personalized support</p>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Optional Information</h3>
                  <p className="text-gray-400 text-sm mb-6">Help us provide better service from Day 1</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Industry/Niche
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select your industry</option>
                          <option value="e-commerce">E-commerce</option>
                          <option value="consulting">Consulting</option>
                          <option value="marketing">Marketing Agency</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="technology">Technology</option>
                          <option value="education">Education</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Helps AI tools be more accurate</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">For critical service issues only</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Payment Information</h2>
                  <p className="text-gray-400">Secure payment processing</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Credit Card Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiration Date *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength={5}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVC/CVV Code *
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, '').substring(0, 4))}
                      maxLength={4}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Billing Zip/Postal Code *
                    </label>
                    <input
                      type="text"
                      placeholder="12345"
                      value={formData.billingZip}
                      onChange={(e) => handleInputChange('billingZip', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Required for fraud prevention</p>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="border-t border-gray-700/50 pt-6">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 text-emerald-500 bg-gray-900 border-gray-600 rounded focus:ring-emerald-500 focus:ring-2"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-gray-300">
                      By subscribing, you agree to the{' '}
                      <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
                        Apex Vista AI Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Account Info</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : `Subscribe for $${isAnnual ? '290' : '29'} →`}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.includes('✅') 
                ? 'bg-emerald-500/10 border border-emerald-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              <p className={`text-center font-medium ${
                message.includes('✅') ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {message}
              </p>
            </div>
          )}

          {/* Security & Guarantee Info */}
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Lock className="w-6 h-6 text-emerald-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">SSL Encrypted</p>
                <p className="text-xs text-gray-500">Your data is secure</p>
              </div>
              <div className="flex flex-col items-center">
                <Check className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">30-Day Guarantee</p>
                <p className="text-xs text-gray-500">Money-back promise</p>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">Cancel Anytime</p>
                <p className="text-xs text-gray-500">No long-term commitment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}