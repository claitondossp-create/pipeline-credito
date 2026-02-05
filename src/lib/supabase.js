import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tmmlkfqedqsvgxxjcgxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWxrZnFlZHFzdmd4eGpjZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzQ0MDUsImV4cCI6MjA4NTgxMDQwNX0.NSR4weo4ehhLNNwkq8qJhj2a6Uo2Enc9C_zL3W8TUeA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
