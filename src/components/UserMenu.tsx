'use client'

import { useState } from 'react'
import { User, LogOut, Settings, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserMenuProps {
  user: any
  onLogout: () => void
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    onLogout()
    setIsOpen(false)
    router.push('/')
  }

  const handleDashboard = () => {
    setIsOpen(false)
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Dashboard Button - Always visible when user is logged in */}
      <Link
        href="/dashboard"
        className="flex items-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-colors"
      >
        <LayoutDashboard className="w-5 h-5 text-emerald-400" />
        <span className="text-white text-sm font-medium hidden sm:inline">Dashboard</span>
      </Link>

      {/* User Menu Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-colors"
        >
          <User className="w-5 h-5 text-emerald-400" />
          <span className="text-white text-sm font-medium max-w-32 truncate">
            {user.full_name || user.email}
          </span>
          <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-emerald-500/30 rounded-lg shadow-xl z-50">
            <div className="p-3 border-b border-gray-700">
              <p className="text-white font-medium truncate">{user.full_name}</p>
              <p className="text-gray-400 text-sm truncate">{user.email}</p>
              <p className="text-emerald-400 text-xs mt-1 capitalize">
                {user.plan_type} Plan - {user.status}
              </p>
            </div>
            
            <div className="py-2">
              <button
                onClick={handleDashboard}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-emerald-500/10 transition-colors text-white"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">Dashboard</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-500/10 transition-colors text-white"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}