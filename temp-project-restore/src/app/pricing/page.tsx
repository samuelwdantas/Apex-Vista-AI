'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, ArrowLeft, Check, X, Zap, TrendingUp, Users, Clock, Star, Calendar, MessageCircle, Sparkles } from 'lucide-react'
import { useContactForm } from '@/hooks/useSupabase'
import Link from 'next/link'

// Instagram SVG Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function PricingPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const { submitContact, isSubmitting, message } = useContactForm()

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await submitContact({
      name: contactForm.name,
      email: contactForm.email,
      company: contactForm.company,
      message: `FREE AI Strategy Session Request: ${contactForm.message}`,
      contact_type: 'consultation'
    })

    // Reset form on success
    if (message.includes('✅')) {
      setContactForm({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    }
  }

  const handleCustomQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await submitContact({
      name: contactForm.name,
      email: contactForm.email,
      company: contactForm.company,
      message: `Custom Development Quote Request: ${contactForm.message}`,
      contact_type: 'custom_quote'
    })

    // Reset form on success
    if (message.includes('✅')) {
      setContactForm({
        name: '',
        email: '',
        company: '',
        message: ''
      })
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
              href="/" 
              className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Powerful</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect solution for your business. Start with our core platform or get custom development tailored to your needs.
          </p>
        </div>
      </section>

      {/* Core Subscription Plan */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Core Solution
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to automate and scale your business with AI
            </p>
          </div>

          {/* Reach Booster Plan */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-emerald-500 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-8 bg-gradient-to-r from-emerald-500 to-green-400 text-gray-900 px-6 py-2 rounded-b-lg font-bold text-sm">
              MOST POPULAR
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Reach Booster Plan</h3>
              <p className="text-gray-400 mb-6">Perfect for solopreneurs, small business owners, and micro-agencies</p>
              
              {/* Pricing */}
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400">$29</div>
                  <div className="text-gray-400">per month</div>
                </div>
                <div className="text-gray-500">or</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">$290</div>
                  <div className="text-gray-400">per year</div>
                  <div className="text-sm text-lime-400 font-medium">Save 2 months!</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-emerald-400 mr-2" />
                  Core AI Access
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Full access to Content Generator</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Advanced Trend Analyzer</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Workflow Automation Tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Single-user/Single-business optimization</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                  Features & Support
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Generate up to 50 Content Assets/month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Standard Email & Knowledge Base Support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">10% off On-Demand Development Services</span>
                  </li>
                  <li className="flex items-start">
                    <X className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">No 1:1 consultation included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link href="/subscribe">
                <button className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-12 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                  Subscribe Now & Start Automating →
                </button>
              </Link>
              <p className="text-gray-400 text-sm mt-4">
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* On-Demand Development */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Premium On-Demand Development
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get customized development and 1:1 time with our expert team. The only way to get fully tailored solutions for your unique business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Apex Solution Build */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-purple-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Apex Solution Build</h3>
              <div className="text-3xl font-bold text-purple-400 mb-4">
                Starts at $1,500
                <span className="text-lg text-gray-400 font-normal ml-2">(One-time fee)</span>
              </div>
              <p className="text-gray-300 mb-6">
                Initial Product Development: We scope, build, and deploy a brand-new, customized digital tool using our Lasy.ai engine.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom client portal development</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Specialized chatbot creation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Complete deployment & setup</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">30 days of post-launch support</span>
                </li>
              </ul>
            </div>

            {/* Feature Enhancement */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-blue-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Feature Enhancement</h3>
              <div className="text-3xl font-bold text-blue-400 mb-4">
                $400 - $1,200
                <span className="text-lg text-gray-400 font-normal ml-2">(One-time fee)</span>
              </div>
              <p className="text-gray-300 mb-6">
                Development of Upgrades: Add custom features to your existing Reach Booster platform, such as specific API integrations or proprietary reports.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom API integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Proprietary reporting systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced automation workflows</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Priority development queue</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Custom Quote Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-emerald-400 mr-2" />
              Request a Custom Quote
            </h3>
            
            <form onSubmit={handleCustomQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  placeholder="Describe your project requirements, goals, timeline, and any specific features you need..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Request...' : 'Request a Custom Quote →'}
              </button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                <p className={`text-center font-medium ${message.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {message}
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <p className="text-sm text-gray-400 text-center">
                <strong className="text-white">Response Time:</strong> Custom quotes are typically provided within 48 hours. Complex projects may require a brief consultation call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What's included in the FREE AI Strategy Session?</h3>
              <p className="text-gray-300">A personalized 30-minute consultation where we analyze your business needs, discuss AI automation opportunities, and create a custom roadmap for implementing our solutions.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I upgrade from Reach Booster to custom development?</h3>
              <p className="text-gray-300">Absolutely! Reach Booster subscribers get a 10% discount on all On-Demand Development Services. You can seamlessly add custom features to your existing platform.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-lime-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What happens if I exceed 50 content assets per month?</h3>
              <p className="text-gray-300">We'll notify you when you're approaching your limit. You can either wait for the next billing cycle or upgrade to a custom plan with higher limits through our On-Demand services.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How long does custom development take?</h3>
              <p className="text-gray-300">Apex Solution Builds typically take 2-4 weeks, while Feature Enhancements usually take 1-2 weeks. Timeline depends on complexity and current project queue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section - Moved to Bottom */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/20 backdrop-blur-sm rounded-2xl p-8 text-gray-900">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-900" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FREE AI Strategy Session
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get a personalized 30-minute session to understand the possibilities of the Apex Vista AI Engine for your specific business.
            </p>
            
            {/* Consultation Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="px-4 py-3 bg-white/20 border border-gray-700/40 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="px-4 py-3 bg-white/20 border border-gray-700/40 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company name"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-gray-700/40 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your business and goals"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-white/20 border border-gray-700/40 rounded-lg text-gray-900 placeholder-gray-700 focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking Your Session...' : 'Book Your Free Consultation →'}
                </button>
              </form>
              {message && (
                <p className={`mt-4 text-center ${message.includes('✅') ? 'text-emerald-200' : 'text-red-200'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                  alt="Apex Vista AI Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">Apex Vista AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Complete digital platform solutions to generate, enhance, and grow your business online.
              </p>
              <div className="flex flex-col space-y-3 text-emerald-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Business: 850-565-1031</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">apexvistaai@gmail.com</span>
                </div>
                <a 
                  href="https://share.google/yaRZXeLxj4ksxKkiW" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-emerald-300 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Location</span>
                </a>
                <a 
                  href="https://www.instagram.com/apexvistaai?igsh=MTRtcGxvbDdvcnJ6OA==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-emerald-300 transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-emerald-400">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Website Development</Link></li>
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Mobile Apps</Link></li>
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Digital Marketing</Link></li>
                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Analytics & Automation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-500/20 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 Apex Vista AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}