'use client'

import { User, Target, Briefcase, Shield, Zap, GraduationCap, Users, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import LoginModal from '@/components/LoginModal'
import UserMenu from '@/components/UserMenu'
import { ChevronDown } from 'lucide-react'

export default function CompanyPage() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout, isLoading } = useAuth()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLoginSuccess = (userData: any) => {
    // User state is managed by AuthContext now
  }

  const handleLogout = () => {
    logout()
  }

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                  alt="Apex Vista AI Logo" 
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-white">Apex Vista AI</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-8">
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="/#features" className="text-gray-300 hover:text-emerald-400 transition-colors">{t('solutions')}</a>
                <a href="/company" className="text-emerald-400 font-medium">{t('company')}</a>
                <a href="/pricing" className="text-gray-300 hover:text-emerald-400 transition-colors">{t('pricing')}</a>
                <a href="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">{t('contact')}</a>
              </nav>

              {/* User Authentication */}
              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-emerald-400" />
                  <span className="text-white text-sm font-medium">Login</span>
                </button>
              )}

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-colors"
                >
                  <span className="text-2xl">
                    {languageOptions.find(lang => lang.code === language)?.flag}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {languageOptions.find(lang => lang.code === language)?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-emerald-500/30 rounded-lg shadow-xl z-50">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'en' | 'pt' | 'es')
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-500/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          language === lang.code ? 'bg-emerald-500/20 text-emerald-400' : 'text-white'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Company Leadership Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">
                {t('companyPageTitle')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('companyPageSubtitle')}
            </p>
          </div>

          {/* Global Roots, Global Reach Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-8 h-8 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">{t('globalRootsTitle')}</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('globalRootsText')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image and Quick Stats */}
            <div className="space-y-8">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
                  <img 
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/63b96e72-6fe7-4b2b-b6c8-be082ecbc691.jpg" 
                    alt="Samuel - CEO & Founder" 
                    className="w-72 h-72 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                  CEO & Founder
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">20+</div>
                  <div className="text-sm text-gray-300">{t('companyYearsSoftware')}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">8</div>
                  <div className="text-sm text-gray-300">{t('companyYearsUSAF')}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-lime-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-lime-400 mb-1">10+</div>
                  <div className="text-sm text-gray-300">{t('companyUSAFBases')}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">100%</div>
                  <div className="text-sm text-gray-300">{t('companyMissionFocus')}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* Mission Statement */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">{t('companyMission')}</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('companyMissionText')}
                </p>
              </div>

              {/* Experience Journey */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Briefcase className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">{t('companyJourney')}</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {t('companyJourneyText')}
                </p>
              </div>

              {/* Military Excellence */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-lime-500/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-lime-400" />
                  <h2 className="text-2xl font-bold text-white">{t('companyMilitary')}</h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {t('companyMilitaryText1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('companyMilitaryText2')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Current Focus & Personal */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Focus */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-8 h-8 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">{t('companyFocus')}</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('companyFocusText1')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('companyFocusText2')}
              </p>
            </div>

            {/* Education & Personal */}
            <div className="space-y-6">
              {/* Education */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">{t('companyEducation')}</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{t('companyEducationCurrent')}</p>
                      <p className="text-gray-300 text-sm">{t('companyEducationCurrentText')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{t('companyEducation2025')}</p>
                      <p className="text-gray-300 text-sm">{t('companyEducation2025Text')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{t('companyEducation2019')}</p>
                      <p className="text-gray-300 text-sm">{t('companyEducation2019Text')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-lime-500/30 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-lime-400" />
                  <h3 className="text-lg font-bold text-white">{t('companyPersonal')}</h3>
                </div>
                <p className="text-gray-300">
                  {t('companyPersonalText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}