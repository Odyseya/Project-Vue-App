// const API_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwenJhc2xod2R2ZG9pa2FrdWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzkwMzMsImV4cCI6MjAyNjQ1NTAzM30.nqfuLRg_URrz3x0fMBw3CPj1YV9QCdedHkNief23aU4'

// const PROJECT_URL = 'https://wpzraslhwdvdoikakufh.supabase.co'

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtb3h2aHVpenJwZGdqdW96a3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMTI4MzQsImV4cCI6MjAyNjU4ODgzNH0.nJ2rgXkzZFKxFvL3mFs16zVcYN_rveXp71X6H52M4os'

const PROJECT_URL = 'https://emoxvhuizrpdgjuozkrj.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
