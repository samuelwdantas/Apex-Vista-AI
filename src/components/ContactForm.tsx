'use client'

import { useState } from 'react'
import { X, Mail, User, MessageSquare, Send, RefreshCw, Phone, Building } from 'lucide-react'
import { useFormSubmission } from '@/hooks/useFormSubmission'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
  formType?: string
  title?: string
}

export default function ContactForm({ isOpen, onClose, formType = 'general-contact', title = 'Contact Us' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const { isSubmitting, submitForm } = useFormSubmission()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await submitForm({
      userEmail: formData.email,
      userName: formData.name,
      formType,
      formData: {
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        submissionSource: 'Dashboard Contact Form'
      }
    })

    if (result.success) {
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
      }, 4000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {submitSuccess ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you for contacting us! We've received your message and sent you an email receipt 
              with all the details. Our team will get back to you within 24 hours.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6">
              <div className="flex items-center justify-center space-x-2 text-emerald-400 mb-2">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email Receipt Sent</span>
              </div>
              <p className="text-emerald-300 text-sm">
                Check your inbox for a detailed copy of your submission
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300">We'd love to hear from you. Send us a message!</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Company and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Receipt Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                <div className="flex items-center space-x-2 text-blue-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email Receipt Included</span>
                </div>
                <p className="text-blue-300 text-sm mt-1">
                  You'll receive an email confirmation with a copy of your message for your records.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}