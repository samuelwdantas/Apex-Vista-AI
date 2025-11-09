'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('apex_vista_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('apex_vista_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!supabase) {
        return { success: false, error: 'Database connection not available' }
      }

      // Query the users table to verify credentials
      const { data: users, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .limit(1)

      if (queryError) {
        return { success: false, error: 'Login failed. Please try again.' }
      }

      if (!users || users.length === 0) {
        return { success: false, error: 'Invalid email or password' }
      }

      const userData = users[0]

      // Decode the Base64 password hash and compare
      let storedPassword: string
      try {
        storedPassword = atob(userData.password_hash)
      } catch (error) {
        // If it's not Base64, compare directly (fallback)
        storedPassword = userData.password_hash
      }

      if (storedPassword !== password) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Login successful - save user data
      setUser(userData)
      localStorage.setItem('apex_vista_user', JSON.stringify(userData))
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('apex_vista_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}