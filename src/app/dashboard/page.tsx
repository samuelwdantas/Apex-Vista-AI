'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, User, Settings, BarChart3, FileText, Zap, TrendingUp, Calendar, Bell, X, Eye, EyeOff, Save, Edit, CreditCard, Download, Phone, DollarSign, Receipt } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState({
    contentAssetsUsed: 12,
    contentAssetsLimit: 50
  })
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showBillingInvoices, setShowBillingInvoices] = useState(false)
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    business_name: '',
    phone: '',
    username: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  // Mock billing data - in real app this would come from Stripe/payment provider
  const [billingData] = useState({
    currentPlan: user?.plan_type || 'Premium',
    billingCycle: 'Monthly',
    nextBillingDate: '2024-02-15',
    paymentMethod: '**** **** **** 4242',
    invoices: [
      {
        id: 'INV-2024-001',
        date: '2024-01-15',
        amount: 99.00,
        status: 'Paid',
        description: 'Premium Plan - January 2024',
        downloadUrl: '#'
      },
      {
        id: 'INV-2023-012',
        date: '2023-12-15',
        amount: 99.00,
        status: 'Paid',
        description: 'Premium Plan - December 2023',
        downloadUrl: '#'
      },
      {
        id: 'INV-2023-011',
        date: '2023-11-15',
        amount: 99.00,
        status: 'Paid',
        description: 'Premium Plan - November 2023',
        downloadUrl: '#'
      }
    ]
  })

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        full_name: user.full_name || '',
        email: user.email || '',
        business_name: user.business_name || '',
        phone: user.phone || '',
        username: user.username || user.email?.split('@')[0] || ''
      })
    }
  }, [user])

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setUpdateMessage('')

    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: profileData.full_name,
          business_name: profileData.business_name,
          phone: profileData.phone,
          username: profileData.username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error

      setUpdateMessage('Profile updated successfully!')
      setTimeout(() => {
        setUpdateMessage('')
        setShowProfileSettings(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setUpdateMessage('Error updating profile. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setUpdateMessage('New passwords do not match!')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setUpdateMessage('Password must be at least 6 characters long!')
      return
    }

    setIsUpdating(true)
    setUpdateMessage('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })

      if (error) throw error

      setUpdateMessage('Password updated successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setTimeout(() => {
        setUpdateMessage('')
        setShowPasswordChange(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating password:', error)
      setUpdateMessage('Error updating password. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real app, this would generate and download the actual invoice
    alert(`Downloading invoice ${invoiceId}...`)
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null
  }

  const progressPercentage = (dashboardData.contentAssetsUsed / dashboardData.contentAssetsLimit) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/276afa56-12ee-4cb4-b583-b25f4d82ca46.png" 
                alt="Apex Vista AI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Apex Vista AI</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-5 h-5" />
                <span>{user.full_name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors text-sm"
              >
                Logout
              </button>
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {user.full_name || user.email.split('@')[0]}! 🎉
          </h1>
          <p className="text-xl text-gray-300">
            Your {user.plan_type || 'Premium'} subscription is active and ready to use.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Content Assets Usage */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Content Assets</h3>
                  <p className="text-gray-400 text-sm">This month</p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{dashboardData.contentAssetsUsed} used</span>
                <span className="text-gray-400">{dashboardData.contentAssetsLimit} limit</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-emerald-400 text-sm font-medium">
              {dashboardData.contentAssetsLimit - dashboardData.contentAssetsUsed} remaining
            </p>
          </div>

          {/* Plan Status */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Active Plan</h3>
                <p className="text-gray-400 text-sm">Subscription status</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-2 capitalize">
              {user.plan_type || 'Premium'} Plan
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium capitalize">{user.status || 'Active'}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Quick Start</h3>
                <p className="text-gray-400 text-sm">Get started now</p>
              </div>
            </div>
            <Link 
              href="/dashboard/tools/content-generator"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 block text-center"
            >
              Generate Content
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools & Features */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Available Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Generator */}
                <Link 
                  href="/dashboard/tools/content-generator"
                  className="bg-gray-900/50 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Content Generator</h3>
                  <p className="text-gray-400 text-sm mb-4">Create engaging content with AI assistance</p>
                  <div className="text-emerald-400 font-medium text-sm group-hover:text-emerald-300 transition-colors">
                    Launch Tool →
                  </div>
                </Link>

                {/* Trend Analyzer */}
                <Link 
                  href="/dashboard/tools/trend-analyzer"
                  className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Trend Analyzer</h3>
                  <p className="text-gray-400 text-sm mb-4">Analyze market trends and opportunities</p>
                  <div className="text-green-400 font-medium text-sm group-hover:text-green-300 transition-colors">
                    Launch Tool →
                  </div>
                </Link>

                {/* Workflow Automation */}
                <Link 
                  href="/dashboard/tools/workflow-automation"
                  className="bg-gray-900/50 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Workflow Automation</h3>
                  <p className="text-gray-400 text-sm mb-4">Automate your business processes</p>
                  <div className="text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors">
                    Launch Tool →
                  </div>
                </Link>

                {/* Analytics */}
                <Link 
                  href="/dashboard/tools/analytics"
                  className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                  <p className="text-gray-400 text-sm mb-4">Track performance and insights</p>
                  <div className="text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors">
                    Launch Tool →
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 text-emerald-400 mr-2" />
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{user.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white truncate ml-2">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Business:</span>
                  <span className="text-white">{user.business_name || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan:</span>
                  <span className="text-emerald-400 capitalize">{user.plan_type || 'Premium'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 capitalize">{user.status || 'Active'}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Bell className="w-5 h-5 text-gray-400 mr-2" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-300">Logged in successfully</span>
                  <span className="text-gray-500 ml-auto">Just now</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Dashboard accessed</span>
                  <span className="text-gray-500 ml-auto">Just now</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Tools available</span>
                  <span className="text-gray-500 ml-auto">Ready</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:contact@apexvistaai.com"
                  className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
                >
                  <span>📧</span>
                  <span>Email Support</span>
                </a>
                <a 
                  href="tel:+1-850-565-1031"
                  className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone Support</span>
                </a>
                <Link 
                  href="/pricing"
                  className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
                >
                  <span>💡</span>
                  <span>Upgrade Plan</span>
                </Link>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 text-gray-400 mr-2" />
                Account Settings
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowProfileSettings(true)}
                  className="w-full text-left text-gray-300 hover:text-emerald-400 transition-colors text-sm py-2 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button 
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full text-left text-gray-300 hover:text-emerald-400 transition-colors text-sm py-2 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
                <button 
                  onClick={() => setShowBillingInvoices(true)}
                  className="w-full text-left text-gray-300 hover:text-emerald-400 transition-colors text-sm py-2 flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Billing & Invoices</span>
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white transition-colors text-sm py-2">
                  API Keys
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <span className="text-emerald-400 text-lg">🎉</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Welcome to Your Dashboard!</h3>
          </div>
          <p className="text-gray-300 mb-4">
            You're successfully logged in and have access to all Apex Vista AI features. 
            Start exploring the tools above to automate and grow your business with AI.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/dashboard/tools/content-generator"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Get Started with Content Generator
            </Link>
            <a 
              href="mailto:contact@apexvistaai.com?subject=Onboarding Call Request"
              className="border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Schedule Onboarding Call
            </a>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
              <button
                onClick={() => setShowProfileSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed from here</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={profileData.business_name}
                  onChange={(e) => setProfileData({ ...profileData, business_name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              {updateMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  updateMessage.includes('Error') 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {updateMessage}
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUpdating ? 'Updating...' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileSettings(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              {updateMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  updateMessage.includes('Error') || updateMessage.includes('do not match') || updateMessage.includes('must be')
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {updateMessage}
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUpdating ? 'Updating...' : 'Change Password'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Billing & Invoices Modal */}
      {showBillingInvoices && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Billing & Invoices</h2>
              <button
                onClick={() => setShowBillingInvoices(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Current Plan Info */}
            <div className="bg-gray-900/50 border border-emerald-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <CreditCard className="w-5 h-5 text-emerald-400 mr-2" />
                  Current Plan
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-white font-medium">{billingData.currentPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Billing Cycle:</span>
                    <span className="text-white">{billingData.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Billing:</span>
                    <span className="text-white">{billingData.nextBillingDate}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="text-white">{billingData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-emerald-400 font-semibold">$99.00/month</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Update Payment Method
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Change Plan
                </button>
              </div>
            </div>

            {/* Invoice History */}
            <div className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Receipt className="w-5 h-5 text-gray-400 mr-2" />
                Invoice History
              </h3>

              <div className="space-y-4">
                {billingData.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-white font-medium">{invoice.id}</p>
                          <p className="text-gray-400 text-sm">{invoice.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-white font-medium">${invoice.amount.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm">{invoice.date}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'Paid' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {invoice.status}
                        </span>
                        
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {billingData.invoices.length === 0 && (
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No invoices found</p>
                </div>
              )}
            </div>

            {/* Billing Summary */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Total Spent This Year</h4>
                  <p className="text-gray-300">Your investment in AI automation</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-400 flex items-center">
                    <DollarSign className="w-8 h-8" />
                    {(billingData.invoices.reduce((total, invoice) => total + invoice.amount, 0)).toFixed(2)}
                  </div>
                  <p className="text-gray-400 text-sm">Since January 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}