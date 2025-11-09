'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Eye, EyeOff, ExternalLink, User, Mail, Phone, Building, MapPin, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import TermsOfServiceModal from '@/components/TermsOfServiceModal'
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal'

export default function SubscribePage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  const [formData, setFormData] = useState({
    // User account info
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    business_name: '',
    industry: '',
    phone_number: '',
    
    // Subscription info
    plan_type: 'monthly',
    plan_price: 29,
    
    // Billing address
    billing_address: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    billing_country: 'US'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Update plan price when plan type changes
    if (name === 'plan_type') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        plan_price: value === 'annual' ? 290 : 29
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
      if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required'
    }

    if (step === 2) {
      if (!formData.billing_address.trim()) newErrors.billing_address = 'Address is required'
      if (!formData.billing_city.trim()) newErrors.billing_city = 'City is required'
      if (!formData.billing_state.trim()) newErrors.billing_state = 'State is required'
      if (!formData.billing_zip.trim()) newErrors.billing_zip = 'ZIP code is required'
      if (!acceptedTerms) newErrors.terms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePaymentRedirect = () => {
    if (validateStep(2)) {
      // Here you could save user data to your database before redirecting
      console.log('User data:', formData)
      
      const paymentUrl = formData.plan_type === 'monthly' 
        ? 'https://buy.stripe.com/4gM6oH0nw6LA7Ae5ZJfjG01'
        : 'https://buy.stripe.com/00w8wP7PY7PEbQugEnfjG02'
      
      // Use direct redirect instead of window.open to avoid popup blockers
      window.location.href = paymentUrl
    }
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Reach Booster</span>
          </h1>
          <p className="text-xl text-gray-300">
            Complete your subscription in {currentStep === 1 ? '3' : currentStep === 2 ? '2' : '1'} easy steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-emerald-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Account Info</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-emerald-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Billing Info</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-emerald-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Account Information</h2>
                <p className="text-gray-300">Create your account to get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.full_name ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.full_name && <p className="text-red-400 text-sm mt-1">{errors.full_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12 ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.phone_number ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone_number && <p className="text-red-400 text-sm mt-1">{errors.phone_number}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry (Optional)
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Billing Information & Plan Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Billing Information & Plan</h2>
                <p className="text-gray-300">Choose your plan and enter billing details</p>
              </div>

              {/* Plan Selection */}
              <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Check className="w-6 h-6 text-emerald-400 mr-2" />
                  Choose Your Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${formData.plan_type === 'monthly' ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-600 hover:border-emerald-400'}`}>
                    <input
                      type="radio"
                      name="plan_type"
                      value="monthly"
                      checked={formData.plan_type === 'monthly'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">$29</div>
                      <div className="text-lg text-gray-300 mb-1">per month</div>
                      <div className="text-sm text-gray-400">Billed monthly</div>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${formData.plan_type === 'annual' ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-green-400'}`}>
                    <input
                      type="radio"
                      name="plan_type"
                      value="annual"
                      checked={formData.plan_type === 'annual'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">$290</div>
                      <div className="text-lg text-gray-300 mb-1">per year</div>
                      <div className="text-sm text-lime-400 font-medium">Save 2 months!</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Billing Address</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="billing_address"
                    value={formData.billing_address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.billing_address ? 'border-red-500' : 'border-gray-600'}`}
                    placeholder="Enter your street address"
                  />
                  {errors.billing_address && <p className="text-red-400 text-sm mt-1">{errors.billing_address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="billing_city"
                      value={formData.billing_city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.billing_city ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="City"
                    />
                    {errors.billing_city && <p className="text-red-400 text-sm mt-1">{errors.billing_city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="billing_state"
                      value={formData.billing_state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.billing_state ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="State"
                    />
                    {errors.billing_state && <p className="text-red-400 text-sm mt-1">{errors.billing_state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="billing_zip"
                      value={formData.billing_zip}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.billing_zip ? 'border-red-500' : 'border-gray-600'}`}
                      placeholder="ZIP"
                    />
                    {errors.billing_zip && <p className="text-red-400 text-sm mt-1">{errors.billing_zip}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <select
                    name="billing_country"
                    value={formData.billing_country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="bg-gray-900/30 rounded-xl p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked)
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }))
                      }
                    }}
                    className="mt-1 w-4 h-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the{' '}
                    <button 
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button 
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.terms && <p className="text-red-400 text-sm mt-2">{errors.terms}</p>}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105"
                >
                  Review & Pay
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Review & Payment</h2>
                <p className="text-gray-300">Review your information and complete payment</p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Plan:</span>
                    <span className="text-white font-medium">
                      Reach Booster {formData.plan_type === 'monthly' ? 'Monthly' : 'Annual'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-emerald-400 font-bold text-xl">
                      ${formData.plan_price}{formData.plan_type === 'monthly' ? '/month' : '/year'}
                    </span>
                  </div>
                  {formData.plan_type === 'annual' && (
                    <div className="text-sm text-lime-400">
                      You save $58 per year!
                    </div>
                  )}
                </div>
              </div>

              {/* Account Summary */}
              <div className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white ml-2">{formData.full_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white ml-2">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white ml-2">{formData.phone_number}</span>
                  </div>
                  {formData.business_name && (
                    <div>
                      <span className="text-gray-400">Business:</span>
                      <span className="text-white ml-2">{formData.business_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Billing Summary */}
              <div className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Billing Address</h3>
                <div className="text-sm text-gray-300">
                  <div>{formData.billing_address}</div>
                  <div>{formData.billing_city}, {formData.billing_state} {formData.billing_zip}</div>
                  <div>{formData.billing_country}</div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="text-center">
                <button
                  onClick={handlePaymentRedirect}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center space-x-2"
                >
                  <span>
                    Complete Payment - ${formData.plan_price}{formData.plan_type === 'monthly' ? '/month' : '/year'}
                  </span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                
                <p className="text-sm text-gray-400 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={handlePreviousStep}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Previous
                </button>
              </div>
            </div>
          )}

          {/* Features List - Show on all steps */}
          {currentStep === 3 && (
            <div className="mt-8 bg-gray-900/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">What's included:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  Advanced AI-powered reach optimization
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  Real-time analytics dashboard
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  Multi-platform integration
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  Custom reporting tools
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  24/7 customer support
                </div>
                <div className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  API access for developers
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <TermsOfServiceModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </div>
  )
}