import { supabase } from '@/api/supabase'

export const fetchActualUser = async () => {
  // Fetches the current user's session information
  const { data } = await supabase.auth.getSession()
  // If user authenticated, return user object; otherwise, return null
  return data?.session?.user || null
}

// Register

//If Confirm email is enabled, a user is returned but session is null.
//If Confirm email is disabled, both a user and a session are returned.

export const createNewUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const logIn = async (email, password) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  return user
}
