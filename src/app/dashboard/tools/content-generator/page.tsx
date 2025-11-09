'use client'

import { useState } from 'react'
import { ArrowLeft, FileText, Wand2, Copy, Download, RefreshCw, Mail, User, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import { useFormSubmission } from '@/hooks/useFormSubmission'

export default function ContentGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [contentType, setContentType] = useState('social-media')
  const [tone, setTone] = useState('professional')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    contentRequest: ''
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const { isSubmitting, submitForm } = useFormSubmission()

  const contentTypes = [
    { value: 'social-media', label: 'Social Media Post' },
    { value: 'blog-post', label: 'Blog Post' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'ad-copy', label: 'Ad Copy' },
    { value: 'product-description', label: 'Product Description' },
    { value: 'press-release', label: 'Press Release' }
  ]

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'creative', label: 'Creative' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Simulate AI content generation
    setTimeout(() => {
      const sampleContent = generateSampleContent(contentType, tone, prompt)
      setGeneratedContent(sampleContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await submitForm({
      userEmail: contactForm.email,
      userName: contactForm.name,
      formType: 'content-request',
      formData: {
        message: contactForm.message,
        contentRequest: contactForm.contentRequest,
        currentContentType: contentType,
        currentTone: tone,
        currentPrompt: prompt
      }
    })

    if (result.success) {
      setSubmitSuccess(true)
      setContactForm({ name: '', email: '', message: '', contentRequest: '' })
      setTimeout(() => {
        setSubmitSuccess(false)
        setShowContactForm(false)
      }, 3000)
    }
  }

  const generateSampleContent = (type: string, tone: string, prompt: string) => {
    const samples = {
      'social-media': `🚀 Exciting news! ${prompt}

Transform your business with cutting-edge AI solutions that deliver real results. Our innovative approach helps you:

✅ Increase efficiency by 40%
✅ Reduce operational costs
✅ Scale your operations seamlessly

Ready to take your business to the next level? Let's connect! 

#AI #BusinessGrowth #Innovation #Technology`,

      'blog-post': `# ${prompt}: A Comprehensive Guide

## Introduction

In today's rapidly evolving business landscape, ${prompt.toLowerCase()} has become more crucial than ever. Companies that embrace innovative solutions are seeing remarkable growth and competitive advantages.

## Key Benefits

1. **Enhanced Efficiency**: Streamline your operations with automated processes
2. **Cost Reduction**: Minimize overhead while maximizing output
3. **Scalability**: Grow your business without proportional resource increases

## Implementation Strategy

To successfully implement these solutions, consider the following approach:

- **Assessment Phase**: Evaluate current processes and identify opportunities
- **Planning Phase**: Develop a comprehensive implementation roadmap
- **Execution Phase**: Deploy solutions with proper monitoring and support

## Conclusion

${prompt} represents the future of business operations. By adopting these innovative approaches, your organization can achieve sustainable growth and maintain a competitive edge in the market.`,

      'email': `Subject: Transform Your Business with ${prompt}

Dear [Name],

I hope this email finds you well. I wanted to reach out because I believe your business could benefit significantly from our latest innovations in ${prompt.toLowerCase()}.

**What makes this opportunity special:**

• Proven ROI within 90 days
• Seamless integration with existing systems
• 24/7 support and training included

Many businesses like yours have already seen:
- 40% increase in operational efficiency
- 25% reduction in costs
- Improved customer satisfaction scores

Would you be interested in a brief 15-minute call to discuss how this could work for your specific situation?

Best regards,
[Your Name]

P.S. We're offering a limited-time implementation bonus for early adopters.`,

      'ad-copy': `🎯 **${prompt} - Limited Time Offer!**

**Headline:** Revolutionary AI Solutions That Actually Work

**Subheadline:** Join 1000+ businesses already transforming their operations

**Body:**
Stop struggling with outdated processes. Our cutting-edge AI platform delivers:

✅ 40% faster results
✅ 60% cost reduction  
✅ 24/7 automated support

**Special Launch Offer:**
- 30-day free trial
- No setup fees
- Dedicated success manager

**Call to Action:** Start Your Free Trial Today - Limited Spots Available!

*Trusted by industry leaders worldwide*`,

      'product-description': `**${prompt} - Next-Generation Business Solution**

**Product Overview:**
Experience the future of business automation with our comprehensive AI-powered platform designed specifically for growing companies.

**Key Features:**
• Advanced AI algorithms for optimal performance
• Intuitive dashboard with real-time analytics
• Seamless integration with popular business tools
• Enterprise-grade security and compliance

**Benefits:**
- Reduce manual work by up to 70%
- Increase accuracy and consistency
- Scale operations without additional overhead
- Access insights that drive better decisions

**Technical Specifications:**
- Cloud-based SaaS platform
- API integrations available
- Mobile-responsive design
- 99.9% uptime guarantee

**Perfect for:** Small to medium businesses, agencies, and enterprises looking to modernize their operations.`,

      'press-release': `FOR IMMEDIATE RELEASE

**${prompt}: Revolutionary AI Platform Launches to Transform Business Operations**

*New solution helps companies increase efficiency by 40% while reducing operational costs*

[City, Date] - Today marks the official launch of ${prompt}, an innovative AI-powered platform designed to revolutionize how businesses operate and scale their operations.

**Industry Impact**
The platform addresses critical challenges faced by modern businesses, including operational inefficiencies, rising costs, and the need for rapid scaling capabilities.

**Key Features and Benefits**
- Advanced automation capabilities
- Real-time analytics and insights
- Seamless integration with existing systems
- Enterprise-grade security

**Market Response**
Early adopters have reported significant improvements in operational efficiency and cost reduction within the first 90 days of implementation.

**About the Company**
Founded with the mission to democratize AI technology for businesses of all sizes, the company continues to innovate in the business automation space.

**Contact Information**
For more information about ${prompt}, visit [website] or contact [email].

###`
    }

    return samples[type as keyof typeof samples] || samples['social-media']
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  const downloadContent = () => {
    const element = document.createElement('a')
    const file = new Blob([generatedContent], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `generated-content-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Request Custom Content</span>
              </button>
              
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Content Generator</h1>
              <p className="text-xl text-gray-300">Create engaging content with AI assistance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Content Settings</h2>
            
            <div className="space-y-6">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {tones.map((toneOption) => (
                    <option key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Content Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what content you want to generate..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-gray-900 font-bold py-4 px-8 rounded-lg hover:from-emerald-600 hover:via-green-600 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Generated Content</h2>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5 text-emerald-400" />
                  </button>
                  <button
                    onClick={downloadContent}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-colors"
                    title="Download content"
                  >
                    <Download className="w-5 h-5 text-emerald-400" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="min-h-[400px] bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              {generatedContent ? (
                <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedContent}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Generated content will appear here</p>
                    <p className="text-sm mt-2">Fill in the settings and click "Generate Content" to start</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {submitSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                <p className="text-gray-300 mb-4">
                  We've received your content request and sent you an email receipt. 
                  Our team will get back to you within 24 hours.
                </p>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-emerald-400 text-sm">
                    📧 Check your email for a detailed receipt of your request
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Request Custom Content</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Content Request
                    </label>
                    <textarea
                      value={contactForm.contentRequest}
                      onChange={(e) => setContactForm(prev => ({ ...prev, contentRequest: e.target.value }))}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Describe the specific content you need..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Additional Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-900 border border-emerald-500/30 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="Any additional details or requirements..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}