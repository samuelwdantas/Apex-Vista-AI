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
      // Save to Supabase if configured
      if (supabase) {
        const { data, error } = await supabase
          .from('leads')
          .insert([leadData])
          .select()

        if (error) {
          console.error('Supabase error:', error)
        }
      }

      // Send email via Brevo
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: leadData.email,
          businessName: leadData.business_name,
          phone: leadData.phone,
          leadType: leadData.lead_type
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      setMessage('✅ Obrigado! Entraremos em contato em breve.')
      return { success: true }
    } catch (error: any) {
      console.error('Error submitting lead:', error)
      setMessage('❌ Erro ao enviar. Tente novamente.')
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
      // Save to Supabase if configured
      if (supabase) {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([contactData])
          .select()

        if (error) {
          console.error('Supabase error:', error)
        }
      }

      // Send email via Brevo
      const emailResponse = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          message: contactData.message,
          contactType: contactData.contact_type
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send contact email')
      }

      setMessage('✅ Mensagem enviada com sucesso!')
      return { success: true }
    } catch (error: any) {
      console.error('Error submitting contact:', error)
      setMessage('❌ Erro ao enviar mensagem. Tente novamente.')
      return { success: false, error }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitContact, isSubmitting, message }
}