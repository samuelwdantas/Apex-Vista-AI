import { createClient } from '@supabase/supabase-js'
import { checkEnvironmentConfig, logEnvironmentStatus } from './env-config'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Lazy client creation - only create when actually needed
let _supabaseAdmin: ReturnType<typeof createClient> | null = null

// Export a function to get the client (for runtime use)
export const getSupabaseAdminClient = () => {
  // Return cached client if already created and valid
  if (_supabaseAdmin) {
    return _supabaseAdmin
  }

  // Check environment configuration
  const envStatus = checkEnvironmentConfig()
  
  if (!envStatus.isValid) {
    console.error('🚨 Supabase environment configuration is invalid:')
    envStatus.errors.forEach(error => console.error(`  - ${error}`))
    
    // In production, this is a critical error
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 Production deployment failed due to missing environment variables')
      console.error('Please configure the following in your deployment platform:')
      console.error('  - NEXT_PUBLIC_SUPABASE_URL')
      console.error('  - SUPABASE_SERVICE_ROLE_KEY')
    }
    
    return null
  }

  // Check if we're in build time (no env vars available)
  const isBuildTime = !supabaseUrl || !supabaseServiceKey
  
  if (isBuildTime) {
    // During build time, don't throw errors - just return null
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ Supabase admin client not available during build time')
    }
    return null
  }
  
  try {
    console.log('✅ Creating Supabase admin client')
    logEnvironmentStatus()
    
    _supabaseAdmin = createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    return _supabaseAdmin
  } catch (error) {
    console.error('🚨 Failed to create Supabase admin client:', error)
    return null
  }
}

// Create the admin client instance and export it as named export
const createAdminClient = () => {
  // Check environment configuration
  const envStatus = checkEnvironmentConfig()
  
  if (!envStatus.isValid) {
    return null
  }

  // Check if we're in build time (no env vars available)
  const isBuildTime = !supabaseUrl || !supabaseServiceKey
  
  if (isBuildTime) {
    return null
  }
  
  try {
    return createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('🚨 Failed to create Supabase admin client:', error)
    return null
  }
}

// Export the admin client as named export for compatibility
export const supabaseAdmin = createAdminClient()

// Export environment variables for other uses
export { supabaseUrl, supabaseServiceKey }