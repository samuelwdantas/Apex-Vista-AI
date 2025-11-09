'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, ArrowLeft, Clock, Users, Globe, MessageCircle } from 'lucide-react'
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

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const { submitContact, isSubmitting, message } = useContactForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await submitContact({
      name: contactForm.name,
      email: contactForm.email,
      company: contactForm.company,
      message: contactForm.message,
      contact_type: 'general'
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

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ready to transform your digital presence? Let's discuss how we can help your business grow with our AI-powered platform solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                      <p className="text-emerald-400 font-medium">Business: 850-565-1031</p>
                      <p className="text-gray-400 text-sm">Available Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-lime-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <p className="text-emerald-400 font-medium">apexvistaai@gmail.com</p>
                      <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                      <a 
                        href="https://share.google/yaRZXeLxj4ksxKkiW" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                      >
                        View on Google Maps
                      </a>
                      <p className="text-gray-400 text-sm">Click to see our location</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <InstagramIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Social Media</h3>
                      <a 
                        href="https://www.instagram.com/apexvistaai?igsh=MTRtcGxvbDdvcnJ6OA==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                      >
                        @apexvistaai
                      </a>
                      <p className="text-gray-400 text-sm">Follow us for updates and insights</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-6 h-6 text-green-400 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-green-400">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-yellow-400">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center">
                  <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-emerald-400 mr-2" />
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Your company name (optional)"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project, goals, or any questions you have..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
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
                  <strong className="text-white">Response Time:</strong> We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
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
            <p className="text-gray-500">© 2024 Apex Vista AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}