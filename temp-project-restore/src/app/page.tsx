'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, TrendingUp, Zap, Clock, Star, Users, Building, Globe, Smartphone, BarChart3, ChevronDown } from 'lucide-react'
import { useLeadCapture, useContactForm } from '@/hooks/useSupabase'

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

// Translations object
const translations = {
  en: {
    // Header
    solutions: "Solutions",
    pricing: "Pricing",
    contact: "Contact",
    
    // Hero Section
    heroTitle: "Generate, Enhance & Grow",
    heroSubtitle: "Transform Your Digital Presence with AI-Powered Platform Solutions",
    heroDescription: "The complete digital platform solution for any business. From websites to mobile apps, analytics to automation—we help you build, optimize, and scale your digital presence.",
    
    // Hero Form
    formTitle: "Start Your Digital Transformation",
    emailPlaceholder: "Your email address",
    businessPlaceholder: "Business name",
    phonePlaceholder: "Phone number (optional)",
    ctaButton: "Get Free Platform Audit →",
    ctaButtonLoading: "Getting Started...",
    
    // Features Section
    featuresTitle: "Complete Digital Platform Solutions",
    featuresSubtitle: "Everything you need to build, enhance, and grow your digital presence. From concept to conversion, we've got you covered.",
    
    // Feature A
    featureATitle: "Website & App Development",
    featureADesc: "Create stunning, responsive websites and mobile applications that convert visitors into customers. Our AI-powered platform builds optimized digital experiences tailored to your business.",
    featureAItem1: "Custom website design",
    featureAItem2: "Mobile app development",
    featureAItem3: "E-commerce integration",
    
    // Feature B
    featureBTitle: "SEO & Digital Marketing",
    featureBDesc: "Boost your online visibility and drive qualified traffic to your platforms. Our comprehensive digital marketing strategies ensure your business gets found by the right customers.",
    featureBItem1: "Search engine optimization",
    featureBItem2: "Social media management",
    featureBItem3: "Content marketing strategy",
    
    // Feature C
    featureCTitle: "Analytics & Automation",
    featureCDesc: "Make data-driven decisions with comprehensive analytics and automate your business processes. Track performance, optimize conversions, and scale efficiently.",
    featureCItem1: "Real-time analytics dashboard",
    featureCItem2: "Marketing automation",
    featureCItem3: "Performance optimization",
    
    // Social Proof
    socialProofTitle: "Trusted by Businesses Across All Industries",
    testimonial1: "\"Apex Vista AI completely transformed our digital presence. Our new website and mobile app have increased our customer engagement by 400% and our online sales have tripled.\"",
    testimonial1Author: "Sarah J., E-commerce Business Owner",
    testimonial2: "\"The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have improved our ROI by 250%.\"",
    testimonial2Author: "Mike R., Professional Services",
    testimonial3: "\"From website to mobile app to marketing automation - everything works seamlessly together. Our digital platform now generates 60% of our total revenue.\"",
    testimonial3Author: "Lisa M., Local Restaurant Chain",
    trustBarText: "Powering digital growth for businesses across all sectors:",
    sector1: "Retail & E-commerce",
    sector2: "Healthcare & Wellness",
    sector3: "Financial Services",
    sector4: "Technology & SaaS",
    
    // Agency Section
    agencyTitle: "Scaling a Digital Agency or Enterprise?",
    agencySubtitle: "White-label our entire platform suite to service your clients. Become an Apex Vista AI Partner and offer comprehensive digital solutions.",
    agencyNamePlaceholder: "Your name",
    agencyEmailPlaceholder: "Email address",
    agencyCompanyPlaceholder: "Company name",
    agencyMessagePlaceholder: "Tell us about your agency and client portfolio",
    agencyButton: "Get Partnership Details & Demo →",
    agencyButtonLoading: "Sending Request...",
    
    // Footer
    footerDescription: "Complete digital platform solutions to generate, enhance, and grow your business online.",
    footerSolutions: "Solutions",
    websiteDevelopment: "Website Development",
    mobileAppsFooter: "Mobile Apps",
    digitalMarketing: "Digital Marketing",
    analyticsAutomation: "Analytics & Automation",
    company: "Company",
    contactFooter: "Contact",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    support: "Support",
    copyright: "© 2024 Apex Vista AI. All rights reserved.",
    businessPhone: "Business: 850-565-1031",
    email: "apexvistaai@gmail.com",
    location: "Location"
  },
  pt: {
    // Header
    solutions: "Soluções",
    pricing: "Preços",
    contact: "Contato",
    
    // Hero Section
    heroTitle: "Gere, Aprimore & Cresça",
    heroSubtitle: "Transforme Sua Presença Digital com Soluções de Plataforma Alimentadas por IA",
    heroDescription: "A solução completa de plataforma digital para qualquer negócio. De sites a aplicativos móveis, análises à automação—ajudamos você a construir, otimizar e escalar sua presença digital.",
    
    // Hero Form
    formTitle: "Inicie Sua Transformação Digital",
    emailPlaceholder: "Seu endereço de email",
    businessPlaceholder: "Nome da empresa",
    phonePlaceholder: "Número de telefone (opcional)",
    ctaButton: "Obter Auditoria Gratuita da Plataforma →",
    ctaButtonLoading: "Iniciando...",
    
    // Features Section
    featuresTitle: "Soluções Completas de Plataforma Digital",
    featuresSubtitle: "Tudo que você precisa para construir, aprimorar e expandir sua presença digital. Do conceito à conversão, nós cuidamos de tudo.",
    
    // Feature A
    featureATitle: "Desenvolvimento de Sites e Apps",
    featureADesc: "Crie sites e aplicativos móveis impressionantes e responsivos que convertem visitantes em clientes. Nossa plataforma alimentada por IA constrói experiências digitais otimizadas sob medida para seu negócio.",
    featureAItem1: "Design personalizado de site",
    featureAItem2: "Desenvolvimento de aplicativo móvel",
    featureAItem3: "Integração de e-commerce",
    
    // Feature B
    featureBTitle: "SEO e Marketing Digital",
    featureBDesc: "Aumente sua visibilidade online e direcione tráfego qualificado para suas plataformas. Nossas estratégias abrangentes de marketing digital garantem que seu negócio seja encontrado pelos clientes certos.",
    featureBItem1: "Otimização para mecanismos de busca",
    featureBItem2: "Gerenciamento de redes sociais",
    featureBItem3: "Estratégia de marketing de conteúdo",
    
    // Feature C
    featureCTitle: "Análises e Automação",
    featureCDesc: "Tome decisões baseadas em dados com análises abrangentes e automatize seus processos de negócio. Rastreie desempenho, otimize conversões e escale com eficiência.",
    featureCItem1: "Painel de análises em tempo real",
    featureCItem2: "Automação de marketing",
    featureCItem3: "Otimização de desempenho",
    
    // Social Proof
    socialProofTitle: "Confiado por Empresas de Todos os Setores",
    testimonial1: "\"A Apex Vista AI transformou completamente nossa presença digital. Nosso novo site e aplicativo móvel aumentaram nosso engajamento de clientes em 400% e nossas vendas online triplicaram.\"",
    testimonial1Author: "Sarah J., Proprietária de E-commerce",
    testimonial2: "\"O painel de análises nos dá insights que nunca tivemos antes. Agora podemos tomar decisões baseadas em dados que melhoraram nosso ROI em 250%.\"",
    testimonial2Author: "Mike R., Serviços Profissionais",
    testimonial3: "\"De site a aplicativo móvel até automação de marketing - tudo funciona perfeitamente junto. Nossa plataforma digital agora gera 60% de nossa receita total.\"",
    testimonial3Author: "Lisa M., Rede de Restaurantes Local",
    trustBarText: "Impulsionando o crescimento digital para empresas de todos os setores:",
    sector1: "Varejo e E-commerce",
    sector2: "Saúde e Bem-estar",
    sector3: "Serviços Financeiros",
    sector4: "Tecnologia e SaaS",
    
    // Agency Section
    agencyTitle: "Escalando uma Agência Digital ou Empresa?",
    agencySubtitle: "Marque em branco todo nosso conjunto de plataformas para atender seus clientes. Torne-se um Parceiro Apex Vista AI e ofereça soluções digitais abrangentes.",
    agencyNamePlaceholder: "Seu nome",
    agencyEmailPlaceholder: "Endereço de email",
    agencyCompanyPlaceholder: "Nome da empresa",
    agencyMessagePlaceholder: "Conte-nos sobre sua agência e portfólio de clientes",
    agencyButton: "Obter Detalhes da Parceria e Demo →",
    agencyButtonLoading: "Enviando Solicitação...",
    
    // Footer
    footerDescription: "Soluções completas de plataforma digital para gerar, aprimorar e expandir seu negócio online.",
    footerSolutions: "Soluções",
    websiteDevelopment: "Desenvolvimento de Sites",
    mobileAppsFooter: "Aplicativos Móveis",
    digitalMarketing: "Marketing Digital",
    analyticsAutomation: "Análises e Automação",
    company: "Empresa",
    contactFooter: "Contato",
    termsOfService: "Termos de Serviço",
    privacyPolicy: "Política de Privacidade",
    support: "Suporte",
    copyright: "© 2024 Apex Vista AI. Todos os direitos reservados.",
    businessPhone: "Empresa: 850-565-1031",
    email: "apexvistaai@gmail.com",
    location: "Localização"
  },
  es: {
    // Header
    solutions: "Soluciones",
    pricing: "Precios",
    contact: "Contacto",
    
    // Hero Section
    heroTitle: "Genera, Mejora & Crece",
    heroSubtitle: "Transforma Tu Presencia Digital con Soluciones de Plataforma Impulsadas por IA",
    heroDescription: "La solución completa de plataforma digital para cualquier negocio. Desde sitios web hasta aplicaciones móviles, análisis hasta automatización—te ayudamos a construir, optimizar y escalar tu presencia digital.",
    
    // Hero Form
    formTitle: "Inicia Tu Transformación Digital",
    emailPlaceholder: "Tu dirección de correo electrónico",
    businessPlaceholder: "Nombre del negocio",
    phonePlaceholder: "Número de teléfono (opcional)",
    ctaButton: "Obtener Auditoría Gratuita de Plataforma →",
    ctaButtonLoading: "Comenzando...",
    
    // Features Section
    featuresTitle: "Soluciones Completas de Plataforma Digital",
    featuresSubtitle: "Todo lo que necesitas para construir, mejorar y hacer crecer tu presencia digital. Desde el concepto hasta la conversión, te tenemos cubierto.",
    
    // Feature A
    featureATitle: "Desarrollo de Sitios Web y Apps",
    featureADesc: "Crea sitios web y aplicaciones móviles impresionantes y responsivos que convierten visitantes en clientes. Nuestra plataforma impulsada por IA construye experiencias digitales optimizadas adaptadas a tu negocio.",
    featureAItem1: "Diseño personalizado de sitio web",
    featureAItem2: "Desarrollo de aplicación móvil",
    featureAItem3: "Integración de comercio electrónico",
    
    // Feature B
    featureBTitle: "SEO y Marketing Digital",
    featureBDesc: "Aumenta tu visibilidad en línea y dirige tráfico calificado a tus plataformas. Nuestras estrategias integrales de marketing digital aseguran que tu negocio sea encontrado por los clientes correctos.",
    featureBItem1: "Optimización para motores de búsqueda",
    featureBItem2: "Gestión de redes sociales",
    featureBItem3: "Estrategia de marketing de contenidos",
    
    // Feature C
    featureCTitle: "Análisis y Automatización",
    featureCDesc: "Toma decisiones basadas en datos con análisis integrales y automatiza tus procesos de negocio. Rastrea el rendimiento, optimiza conversiones y escala eficientemente.",
    featureCItem1: "Panel de análisis en tiempo real",
    featureCItem2: "Automatización de marketing",
    featureCItem3: "Optimización de rendimiento",
    
    // Social Proof
    socialProofTitle: "Confiado por Empresas de Todas las Industrias",
    testimonial1: "\"Apex Vista AI transformó completamente nuestra presencia digital. Nuestro nuevo sitio web y aplicación móvil han aumentado nuestro compromiso de clientes en 400% y nuestras ventas en línea se han triplicado.\"",
    testimonial1Author: "Sarah J., Propietaria de E-commerce",
    testimonial2: "\"El panel de análisis nos da perspectivas que nunca tuvimos antes. Ahora podemos tomar decisiones basadas en datos que han mejorado nuestro ROI en 250%.\"",
    testimonial2Author: "Mike R., Servicios Profesionales",
    testimonial3: "\"Desde sitio web hasta aplicación móvil hasta automatización de marketing - todo funciona perfectamente junto. Nuestra plataforma digital ahora genera el 60% de nuestros ingresos totales.\"",
    testimonial3Author: "Lisa M., Cadena de Restaurantes Local",
    trustBarText: "Impulsando el crecimiento digital para empresas de todos los sectores:",
    sector1: "Comercio Minorista y E-commerce",
    sector2: "Salud y Bienestar",
    sector3: "Servicios Financieros",
    sector4: "Tecnología y SaaS",
    
    // Agency Section
    agencyTitle: "¿Escalando una Agencia Digital o Empresa?",
    agencySubtitle: "Marca blanca de todo nuestro conjunto de plataformas para servir a tus clientes. Conviértete en un Socio de Apex Vista AI y ofrece soluciones digitales integrales.",
    agencyNamePlaceholder: "Tu nombre",
    agencyEmailPlaceholder: "Dirección de correo electrónico",
    agencyCompanyPlaceholder: "Nombre de la empresa",
    agencyMessagePlaceholder: "Cuéntanos sobre tu agencia y portafolio de clientes",
    agencyButton: "Obtener Detalles de Asociación y Demo →",
    agencyButtonLoading: "Enviando Solicitud...",
    
    // Footer
    footerDescription: "Soluciones completas de plataforma digital para generar, mejorar y hacer crecer tu negocio en línea.",
    footerSolutions: "Soluciones",
    websiteDevelopment: "Desarrollo de Sitios Web",
    mobileAppsFooter: "Aplicaciones Móviles",
    digitalMarketing: "Marketing Digital",
    analyticsAutomation: "Análisis y Automatización",
    company: "Empresa",
    contactFooter: "Contacto",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    support: "Soporte",
    copyright: "© 2024 Apex Vista AI. Todos los derechos reservados.",
    businessPhone: "Empresa: 850-565-1031",
    email: "apexvistaai@gmail.com",
    location: "Ubicación"
  }
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'pt' | 'es'>('en')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
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

  const t = translations[language]

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

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

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
                <a href="#features" className="text-gray-300 hover:text-emerald-400 transition-colors">{t.solutions}</a>
                <a href="/pricing" className="text-gray-300 hover:text-emerald-400 transition-colors">{t.pricing}</a>
                <a href="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">{t.contact}</a>
              </nav>

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
              {t.heroTitle.split(' ').slice(0, 2).join(' ')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400">{t.heroTitle.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              {t.heroDescription}
            </p>

            {/* Primary CTA Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">{t.formTitle}</h3>
              <form onSubmit={(e) => handleLeadSubmit(e, 'smb')} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder={t.businessPlaceholder}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {isSubmittingLead ? t.ctaButtonLoading : t.ctaButton}
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
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature A */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.featureATitle}</h3>
              <p className="text-gray-300 mb-6">
                {t.featureADesc}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t.featureAItem1}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t.featureAItem2}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                  {t.featureAItem3}
                </li>
              </ul>
            </div>

            {/* Feature B */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-green-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-lime-400 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.featureBTitle}</h3>
              <p className="text-gray-300 mb-6">
                {t.featureBDesc}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t.featureBItem1}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t.featureBItem2}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {t.featureBItem3}
                </li>
              </ul>
            </div>

            {/* Feature C */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-lime-500/30 rounded-2xl p-8 hover:shadow-xl hover:border-lime-400/50 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.featureCTitle}</h3>
              <p className="text-gray-300 mb-6">
                {t.featureCDesc}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t.featureCItem1}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t.featureCItem2}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-lime-400 mr-2" />
                  {t.featureCItem3}
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
              {t.socialProofTitle}
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
                {t.testimonial1}
              </blockquote>
              <cite className="font-semibold text-white">{t.testimonial1Author}</cite>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-4">
                {t.testimonial2}
              </blockquote>
              <cite className="font-semibold text-white">{t.testimonial2Author}</cite>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-lime-500/30 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-lime-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300 mb-4">
                {t.testimonial3}
              </blockquote>
              <cite className="font-semibold text-white">{t.testimonial3Author}</cite>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="text-center">
            <p className="text-gray-400 mb-8">{t.trustBarText}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2 text-gray-400">
                <Building className="w-6 h-6" />
                <span className="font-medium">{t.sector1}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-6 h-6" />
                <span className="font-medium">{t.sector2}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <TrendingUp className="w-6 h-6" />
                <span className="font-medium">{t.sector3}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Zap className="w-6 h-6" />
                <span className="font-medium">{t.sector4}</span>
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
              {t.agencyTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t.agencySubtitle}
            </p>
            
            {/* Agency Contact Form */}
            <div className="bg-gray-900/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.agencyNamePlaceholder}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    className="px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder={t.agencyEmailPlaceholder}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    className="px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder={t.agencyCompanyPlaceholder}
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900/30 border border-gray-700/40 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <textarea
                  placeholder={t.agencyMessagePlaceholder}
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
                  {isSubmittingContact ? t.agencyButtonLoading : t.agencyButton}
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
                {t.footerDescription}
              </p>
              <div className="flex flex-col space-y-3 text-emerald-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{t.businessPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">{t.email}</span>
                </div>
                <a 
                  href="https://share.google/yaRZXeLxj4ksxKkiW" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-emerald-300 transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{t.location}</span>
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
              <h4 className="font-semibold mb-4 text-emerald-400">{t.footerSolutions}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t.websiteDevelopment}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t.mobileAppsFooter}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t.digitalMarketing}</a></li>
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t.analyticsAutomation}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-400">{t.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-green-400 transition-colors">{t.contactFooter}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{t.termsOfService}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{t.privacyPolicy}</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">{t.support}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-500/20 mt-8 pt-8 text-center text-gray-500">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}