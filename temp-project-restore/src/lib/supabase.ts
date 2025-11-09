import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database
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