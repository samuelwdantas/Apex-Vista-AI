// Environment configuration checker for production
export const checkEnvironmentConfig = () => {
  const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    nodeEnv: process.env.NODE_ENV
  }

  const errors: string[] = []
  const warnings: string[] = []

  // Check Supabase URL
  if (!config.supabaseUrl) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is missing')
  } else if (!config.supabaseUrl.startsWith('https://') || !config.supabaseUrl.includes('.supabase.co')) {
    errors.push(`NEXT_PUBLIC_SUPABASE_URL format is invalid: ${config.supabaseUrl}`)
  }

  // Check Supabase Service Key
  if (!config.supabaseServiceKey) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY is missing')
  } else if (!config.supabaseServiceKey.startsWith('eyJ')) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY format is invalid (should start with eyJ)')
  }

  // Production-specific checks
  if (config.nodeEnv === 'production') {
    if (!config.supabaseUrl || !config.supabaseServiceKey) {
      errors.push('Production deployment requires all Supabase environment variables')
    }
  }

  return {
    isValid: errors.length === 0,
    config,
    errors,
    warnings
  }
}

// Log environment status
export const logEnvironmentStatus = () => {
  const status = checkEnvironmentConfig()
  
  if (status.isValid) {
    console.log('✅ Environment configuration is valid')
    console.log('📍 Supabase URL:', status.config.supabaseUrl)
    console.log('🔑 Service Key:', status.config.supabaseServiceKey ? 'Present' : 'Missing')
  } else {
    console.error('❌ Environment configuration errors:')
    status.errors.forEach(error => console.error(`  - ${error}`))
  }

  if (status.warnings.length > 0) {
    console.warn('⚠️ Environment configuration warnings:')
    status.warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  return status
}