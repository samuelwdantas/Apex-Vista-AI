'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, CheckCircle, TrendingUp, Zap, Clock, Star, Users, Building, Globe, Smartphone, BarChart3, ChevronDown, User, Award, Shield, Target, Briefcase, GraduationCap } from 'lucide-react'
import { useLeadCapture, useContactForm } from '@/hooks/useSupabase'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import LoginModal from '@/components/LoginModal'
import UserMenu from '@/components/UserMenu'
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal'
import TermsOfServiceModal from '@/components/TermsOfServiceModal'

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

// Facebook SVG Icon Component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout, isLoading } = useAuth()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const { submitLead, isSubmitting: isSubmittingLead, message: leadMessage } = useLeadCapture()
  const { submitContact, isSubmitting: isSubmittingContact, message: contactMessage } = useContactForm()

  const handleLeadSubmit = async (e: React.FormEvent, leadType: 'smb' | 'agency') => {
    e.preventDefault()
    
    await submitLead({
      email,
      business_name: businessName,
      phone,
      lead_type: leadType
    })

    // Reset form on success
    if (leadMessage.includes('✅')) {
      setEmail('')
      setBusinessName('')
      setPhone('')
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await submitContact({
      name: contactForm.name,
      email: contactForm.email,
      company: contactForm.company,
      message: contactForm.message,
      contact_type: 'agency'
    })

    // Reset form on success
    if (contactMessage.includes('✅')) {
      setContactForm({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    }
  }

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
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </div>
            
            <div className="flex items-center space-x-8">
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors">{t('solutions')}</a>
                <a href="/company" className="text-gray-300 hover:text-emerald-400 transition-colors">Company</a>
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
                  <span className="text-lg">
                    {languageOptions.find(lang => lang.code === language)?.flag}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {languageOptions.find(lang => lang.code === language)?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-emerald-500/30 rounded-lg shadow-xl z-50">
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
                        <span className="text-lg">{lang.flag}</span>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">{t('heroTitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              {t('heroDescription')}
            </p>

            {/* Primary CTA Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">{t('formTitle')}</h3>
              <form onSubmit={(e) => handleLeadSubmit(e, 'smb')} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder={t('businessPlaceholder')}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="tel"
                  placeholder={t('phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {isSubmittingLead ? t('ctaButtonLoading') : t('ctaButton')}
                </button>
              </form>
              {leadMessage && (
                <p className={`mt-4 text-center ${leadMessage.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {leadMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature A */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('featureATitle')}</h3>
              <p className="text-gray-300 mb-6">
                {t('featureADesc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t('featureAItem1')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t('featureAItem2')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t('featureAItem3')}
                </li>
              </ul>
            </div>

            {/* Feature B */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-green-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-lime-400 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('featureBTitle')}</h3>
              <p className="text-gray-300 mb-6">
                {t('featureBDesc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t('featureBItem1')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t('featureBItem2')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t('featureBItem3')}
                </li>
              </ul>
            </div>

            {/* Feature C */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-lime-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-lime-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('featureCTitle')}</h3>
              <p className="text-gray-300 mb-6">
                {t('featureCDesc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t('featureCItem1')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t('featureCItem2')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t('featureCItem3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('socialProofTitle')}
            </h2>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-emerald-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-4">
                {t('testimonial1')}
              </blockquote>
              <cite className="font-semibold text-white">{t('testimonial1Author')}</cite>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-4">
                {t('testimonial2')}
              </blockquote>
              <cite className="font-semibold text-white">{t('testimonial2Author')}</cite>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-lime-500/30 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-lime-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-4">
                {t('testimonial3')}
              </blockquote>
              <cite className="font-semibold text-white">{t('testimonial3Author')}</cite>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="text-center">
            <p className="text-gray-400 mb-8">{t('trustBarText')}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2 text-gray-400">
                <Building className="w-6 h-6" />
                <span className="font-medium">{t('sector1')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-6 h-6" />
                <span className="font-medium">{t('sector2')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <TrendingUp className="w-6 h-6" />
                <span className="font-medium">{t('sector3')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Zap className="w-6 h-6" />
                <span className="font-medium">{t('sector4')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 rounded-2xl p-8 text-gray-900 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('agencyTitle')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('agencySubtitle')}
            </p>
            
            {/* Agency Contact Form */}
            <div className="bg-gray-900/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('agencyNamePlaceholder')}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder={t('agencyEmailPlaceholder')}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t('agencyCompanyPlaceholder')}
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <textarea
                  placeholder={t('agencyMessagePlaceholder')}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full bg-white text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {isSubmittingContact ? t('agencyButtonLoading') : t('agencyButton')}
                </button>
              </form>
              {contactMessage && (
                <p className={`mt-4 text-center ${contactMessage.includes('✅') ? 'text-emerald-300' : 'text-red-300'}`}>
                  {contactMessage}
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
                {t('footerDescription')}
              </p>
              <div className="flex flex-col space-y-3 text-emerald-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+1 (850) 565-1031</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">contact@apexvistaai.com</span>
                </div>
                <a 
                  href="https://share.google/yaRZXeLxj4ksxKkiW" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-emerald-300 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{t('location')}</span>
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
                <a 
                  href="https://www.facebook.com/profile.php?id=61583213563840" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-emerald-300 transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                  <span className="font-medium">Facebook</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-emerald-400">{t('footerSolutions')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('websiteDevelopment')}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('mobileAppsFooter')}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('digitalMarketing')}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('analyticsAutomation')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-400">{t('company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/company" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-green-400 transition-colors">{t('contactFooter')}</a></li>
                <li>
                  <button 
                    onClick={() => setIsTermsModalOpen(true)}
                    className="hover:text-green-400 transition-colors text-left"
                  >
                    {t('termsOfService')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="hover:text-green-400 transition-colors text-left"
                  >
                    {t('privacyPolicy')}
                  </button>
                </li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{t('support')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-500/20 mt-8 pt-8 text-center text-gray-500">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  )
}