'use client'

import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { t } = useLanguage()
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
          <h2 className="text-2xl font-bold text-white">{t('privacyTitle')}</h2>
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
              <strong>{t('privacyLastUpdated')}</strong>
            </p>

            <p className="text-gray-300 mb-6">
              {t('privacyIntro')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyAcceptance')}</h3>
            <p className="text-gray-300 mb-6">
              {t('privacyAcceptanceText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyCollection')}</h3>
            <p className="text-gray-300 mb-4">
              {t('privacyCollectionText')}
            </p>

            <h4 className="text-lg font-semibold text-green-400 mb-3">{t('privacyDataOverview')}</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 px-4 py-2 text-left text-emerald-400">{t('privacyDataCategory')}</th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-emerald-400">{t('privacyWhatCollect')}</th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-emerald-400">{t('privacyPurpose')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyAccountData')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyAccountDataDesc')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyAccountDataPurpose')}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyConsultationData')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyConsultationDataDesc')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyConsultationDataPurpose')}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyVoluntaryData')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyVoluntaryDataDesc')}</td>
                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{t('privacyVoluntaryDataPurpose')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyUsage')}</h3>
            <p className="text-gray-300 mb-4">
              {t('privacyUsageText')}
            </p>

            <h4 className="text-lg font-semibold text-green-400 mb-3">{t('privacyAIUsage')}</h4>
            <p className="text-gray-300 mb-4">
              {t('privacyAIUsageText')}
            </p>

            <h4 className="text-lg font-semibold text-green-400 mb-3">{t('privacyTechnical')}</h4>
            <p className="text-gray-300 mb-6">
              {t('privacyTechnicalText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyUse')}</h3>
            <p className="text-gray-300 mb-4">
              {t('privacyUseText')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li><strong>{t('privacyUseItem1')}</strong></li>
              <li><strong>{t('privacyUseItem2')}</strong></li>
              <li><strong>{t('privacyUseItem3')}</strong></li>
              <li><strong>{t('privacyUseItem4')}</strong></li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacySharing')}</h3>
            <p className="text-gray-300 mb-4">
              {t('privacySharingText')}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li><strong>{t('privacySharingItem1')}</strong></li>
              <li><strong>{t('privacySharingItem2')}</strong></li>
              <li><strong>{t('privacySharingItem3')}</strong></li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyRights')}</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li><strong>{t('privacyRightsItem1')}</strong></li>
              <li><strong>{t('privacyRightsItem2')}</strong></li>
              <li><strong>{t('privacyRightsItem3')}</strong></li>
            </ul>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacySecurity')}</h3>
            <p className="text-gray-300 mb-6">
              {t('privacySecurityText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyChildren')}</h3>
            <p className="text-gray-300 mb-6">
              {t('privacyChildrenText')}
            </p>

            <h3 className="text-xl font-bold text-emerald-400 mb-4">{t('privacyChanges')}</h3>
            <p className="text-gray-300 mb-6">
              {t('privacyChangesText')}
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