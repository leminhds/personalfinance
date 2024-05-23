import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'
const supabaseUrl = "https://hudxyhidxwmhjyscnpxh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZHh5aGlkeHdtaGp5c2NucHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMTgxOTMsImV4cCI6MjAzMTc5NDE5M30.mtQWW16JlJ56FNNwPB3oLVgBhWIG9fB9XSp8kcVfn7k"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})