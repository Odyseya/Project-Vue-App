import { supabase } from '@/api/supabase'

export const fetchActualUser = async () => {
  // Fetches the current user's session information
  const { data } = await supabase.auth.getSession()
  console.log(data.session)
  // If user authenticated, return user object; otherwise, return null
  return data?.session?.user || null
}

//If Confirm email is enabled, a user is returned but session is null.
//If Confirm email is disabled, both a user and a session are returned.

export const createNewUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    throw new Error(error.message)
  }
  console.log(data)
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

export const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Error signing out:', error.message)
    throw error
  }
}

// ADD Auth event listener
export const setupAuthListener = async (store) => {
  const { data: authListener } = await supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)

    if (event === 'SIGNED_IN') {
      store.user = session.user
    } else if (event === 'SIGNED_OUT') {
      store.user = null
    } else if (event === 'USER_UPDATED') {
      store.user = session.user
    }
  })

  return authListener
}
