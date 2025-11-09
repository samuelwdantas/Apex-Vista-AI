'use client'

import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  const { t } = useLanguage()
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
          <h2 className="text-2xl font-bold text-white">{t('termsTitle')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              <strong>{t('termsLastUpdated')}</strong>
            </p>

            <p className="text-gray-300 mb-6">
              {t('termsIntro')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsAcceptance')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsAcceptanceText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsService')}</h3>
            <p className="text-gray-300 mb-4">
              {t('termsServiceText')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>{t('termsServiceItem1')}</li>
              <li>{t('termsServiceItem2')}</li>
              <li>{t('termsServiceItem3')}</li>
              <li>{t('termsServiceItem4')}</li>
              <li>{t('termsServiceItem5')}</li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsResponsibilities')}</h3>
            <p className="text-gray-300 mb-4">
              {t('termsResponsibilitiesText')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>{t('termsResponsibilitiesItem1')}</li>
              <li>{t('termsResponsibilitiesItem2')}</li>
              <li>{t('termsResponsibilitiesItem3')}</li>
              <li>{t('termsResponsibilitiesItem4')}</li>
              <li>{t('termsResponsibilitiesItem5')}</li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsPayment')}</h3>
            <p className="text-gray-300 mb-4">
              {t('termsPaymentText')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>{t('termsPaymentItem1')}</li>
              <li>{t('termsPaymentItem2')}</li>
              <li>{t('termsPaymentItem3')}</li>
              <li>{t('termsPaymentItem4')}</li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsIP')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsIPText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsPrivacy')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsPrivacyText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsAvailability')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsAvailabilityText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsLiability')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsLiabilityText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsTermination')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsTerminationText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsGoverning')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsGoverningText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsChanges')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsChangesText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('termsContact')}</h3>
            <p className="text-gray-300 mb-6">
              {t('termsContactText')}
              <br />
              {t('termsContactEmail')}
              <br />
              {t('termsContactPhone')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-emerald-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {t('closeButton')}
          </button>
        </div>
      </div>
    </div>
  )
}