import { useState } from 'react'

interface FormSubmissionData {
  userEmail: string
  userName: string
  formType: string
  formData: Record<string, any>
}

interface UseFormSubmissionReturn {
  isSubmitting: boolean
  submitForm: (data: FormSubmissionData) => Promise<{
    success: boolean
    submissionId?: string
    error?: string
  }>
}

export function useFormSubmission(): UseFormSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Form submission failed')
      }

      return {
        success: true,
        submissionId: result.submissionId,
      }
    } catch (error) {
      console.error('Form submission error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitForm,
  }
}