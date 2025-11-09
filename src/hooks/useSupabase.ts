'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Lead, ContactMessage } from '@/lib/supabase'

// Hook for lead capture
export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const submitLead = async (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    setIsSubmitting(true)
    setMessage('')

    try {
      console.log('🚀 Submitting lead:', leadData)

      // Save to Supabase if configured
      if (supabase) {
        const { data, error } = await supabase
          .from('leads')
          .insert([leadData])
          .select()

        if (error) {
          console.error('❌ Supabase error:', error)
          throw new Error('Failed to save lead data')
        } else {
          console.log('✅ Lead saved to Supabase:', data)
        }
      } else {
        throw new Error('Database not configured')
      }
      
      setMessage('✅ Thank you! Your information has been saved successfully.')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error submitting lead:', error)
      
      // Provide user-friendly error messages
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error.message?.includes('Database not configured')) {
        errorMessage = 'Service is temporarily unavailable. Please try again later.'
      } else if (error.message?.includes('Failed to save')) {
        errorMessage = 'Unable to save your information. Please try again.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setMessage(`❌ ${errorMessage}`)
      return { success: false, error }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitLead, isSubmitting, message }
}

// Hook for contact form
export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const submitContact = async (contactData: Omit<ContactMessage, 'id' | 'created_at'>) => {
    setIsSubmitting(true)
    setMessage('')

    try {
      console.log('🚀 Submitting contact:', contactData)

      // Save to Supabase if configured
      if (supabase) {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([contactData])
          .select()

        if (error) {
          console.error('❌ Supabase error:', error)
          throw new Error('Failed to save contact message')
        } else {
          console.log('✅ Contact saved to Supabase:', data)
        }
      } else {
        throw new Error('Database not configured')
      }
      
      setMessage('✅ Message sent successfully! We have received your inquiry and will get back to you soon.')
      return { success: true }
    } catch (error: any) {
      console.error('❌ Error submitting contact:', error)
      
      // Provide user-friendly error messages
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error.message?.includes('Database not configured')) {
        errorMessage = 'Service is temporarily unavailable. Please try again later.'
      } else if (error.message?.includes('Failed to save')) {
        errorMessage = 'Unable to save your message. Please try again.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setMessage(`❌ ${errorMessage}`)
      return { success: false, error }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitContact, isSubmitting, message }
}