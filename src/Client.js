import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(VITE_APP_API_URL, VITE_APP_API_KEY)