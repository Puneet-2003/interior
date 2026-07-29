import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * When the keys are missing the app keeps working against localStorage only,
 * so a misconfigured build degrades instead of rendering an empty site.
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

export const MEDIA_BUCKET = 'site-media'
