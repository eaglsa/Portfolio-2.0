import { createClient } from '@supabase/supabase-js'

// You will find these keys inside your Supabase Settings > API tab
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)