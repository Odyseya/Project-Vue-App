const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtb3h2aHVpenJwZGdqdW96a3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTI4MzQsImV4cCI6MjAyNjU4ODgzNH0.nJ2rgXkzZFKxFvL3mFs16zVcYN_rveXp71X6H52M4os'
const PROJECT_URL = 'https://emoxvhuizrpdgjuozkrj.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
