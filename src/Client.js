import { createClient } from '@supabase/supabase-js'

const URL = "https://wqprvvcemrmeagpdsykf.supabase.co"
const API_KEY = "sb_publishable_IpEBm1ihbsa9-nATg3xUFQ_YxeL5dms"

export const supabase = createClient(URL, API_KEY)