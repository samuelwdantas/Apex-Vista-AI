import { createClient } from '@supabase/supabase-js'

// Get environment variables with detailed validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validation function for environment variables
const validateSupabaseConfig = () => {
  if (!supabaseUrl) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    console.error('Expected format: https://your-project.supabase.co')
    return false
  }

  if (!supabaseAnonKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    console.error('Expected format: eyJ... (JWT token starting with eyJ)')
    return false
  }

  // Validate URL format
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    console.error('❌ Invalid NEXT_PUBLIC_SUPABASE_URL format:', supabaseUrl)
    console.error('Expected format: https://your-project.supabase.co')
    return false
  }

  // Validate anon key format
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.error('❌ Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY format')
    console.error('Expected format: eyJ... (JWT token)')
    return false
  }

  return true
}

// Create client only if environment variables are available and valid
export const supabase = validateSupabaseConfig() 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

// Safe client creation for build time
export const createSupabaseClient = () => {
  if (!validateSupabaseConfig()) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('supabaseUrl is required.')
    }
    return null
  }
  
  console.log('✅ Supabase client environment variables validated successfully')
  console.log('📍 URL:', supabaseUrl)
  console.log('🔑 Anon Key:', supabaseAnonKey!.substring(0, 20) + '...')
  
  return createClient(supabaseUrl!, supabaseAnonKey!)
}

// Database Types for Apex Vista AI Dashboard
export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  business_name?: string
  subscription_status: 'active' | 'lapsed' | 'pending'
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  billing_cycle: 'monthly' | 'annual'
  start_date: string
  next_renewal_date: string
  payment_method_token?: string
  amount: number
  status: 'active' | 'cancelled' | 'past_due'
  created_at: string
  updated_at: string
}

export interface Usage {
  id: string
  user_id: string
  date_logged: string
  asset_count: number
  month_year: string // Format: YYYY-MM
  created_at: string
  updated_at: string
}

export interface AutomationRule {
  id: string
  user_id: string
  rule_name: string
  trigger_type: string
  trigger_config: Record<string, any>
  action_type: string
  action_config: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GeneratedContent {
  id: string
  user_id: string
  input_text: string
  output_type: string
  generated_content: string
  created_at: string
}

// Legacy types for backward compatibility
export interface Lead {
  id?: string
  email: string
  business_name?: string
  phone?: string
  lead_type: 'smb' | 'agency'
  created_at?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  company?: string
  message: string
  contact_type: 'general' | 'agency' | 'demo'
  created_at?: string
}

export interface UserCreateData {
  email: string
  password_hash: string
  full_name: string
  business_name?: string
  industry?: string
  phone_number?: string
  plan_type: 'monthly' | 'annual'
  plan_price: number
  card_last_four: string
  card_brand: string
  card_exp_month: number
  card_exp_year: number
  billing_address: {
    address?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
}

// Authentication and session management utilities
export const getCurrentUser = async () => {
  const client = createSupabaseClient()
  if (!client) return null
  
  const { data: { session } } = await client.auth.getSession()
  return session?.user || null
}

export const signInUser = async (email: string, password: string) => {
  const client = createSupabaseClient()
  if (!client) throw new Error('Supabase not configured')
  
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signUpUser = async (email: string, password: string, metadata?: Record<string, any>) => {
  const client = createSupabaseClient()
  if (!client) throw new Error('Supabase not configured')
  
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  
  if (error) throw error
  return data
}

export const signOutUser = async () => {
  const client = createSupabaseClient()
  if (!client) throw new Error('Supabase not configured')
  
  const { error } = await client.auth.signOut()
  if (error) throw error
}

// Database utility functions
export const getUserProfile = async (userId: string): Promise<User | null> => {
  const client = createSupabaseClient()
  if (!client) return null
  
  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data
}

export const getCurrentUsage = async (userId: string): Promise<Usage | null> => {
  const client = createSupabaseClient()
  if (!client) return null
  
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
  
  const { data, error } = await client
    .from('usage')
    .select('*')
    .eq('user_id', userId)
    .eq('month_year', currentMonth)
    .single()
  
  if (error) return null
  return data
}

export const getUserSubscription = async (userId: string): Promise<Subscription | null> => {
  const client = createSupabaseClient()
  if (!client) return null
  
  const { data, error } = await client
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()
  
  if (error) return null
  return data
}

// Email configuration for sending receipts and notifications
export const emailConfig = {
  fromName: 'Apex Vista AI',
  fromEmail: 'contact@apexvistaai.com'
}