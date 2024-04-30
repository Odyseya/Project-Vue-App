import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, logOut } from '@/api/userApi'
import { setupAuthListener } from '@/api/userApi'
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('user', () => {
  // State
  let authListener = null
  const toast = useToast()
  const user = ref(undefined)
  const errorMessage = ref('')

  // Setup auth listener when the store is initialized
  setupAuthListener({ user }).then((listener) => {
    authListener = listener
  })

  // Actions
  async function fetchUser() {
    try {
      user.value = await fetchActualUser()
    } catch (error) {
      // if fetchActualUser returns null, Interprets null from data layer
      // as user not being authenticated updates user state to null.
      if (error.code === '401') {
        user.value = null
        return
      }
    }
  }

  async function register(email, password) {
    try {
      user.value = await createNewUser(email, password)
      toast.success('Account created. Next step: check your mailbox to access.')
    } catch (error) {
      console.error(error)

      if (error.message) {
        // errorMessage.value = 'Password should be at least 6 characters'
        toast.warning(error.message)
      }
    }
  }

  async function signIn(email, password) {
    try {
      user.value = await logIn(email, password)
      errorMessage.value = '' // Clear the message on successful login
      console.log('User info retrieved:', user.value)
      // Return true to indicate successful login
      return true
    } catch (error) {
      console.error(error)

      if (error.message === 'Email not confirmed') {
        toast.warning('This email is not verified. Check your mailbox and try to login again.')
        // Return false to indicate login failed due to email not being confirmed
        return false
      } else {
        errorMessage.value = 'Invalid login credentials. Please try again'
      }
      resetErrorMessageAfterDelay(2500)
      // Return false for other errors as well
      return false
    }
  }

  function resetErrorMessageAfterDelay(delay) {
    setTimeout(() => {
      errorMessage.value = ''
    }, delay)
  }

  async function signOut() {
    try {
      await logOut()
      // Ensure the user's state is cleared
      user.value = null
    } catch (error) {
      console.error('Failed to log out:', error.message)
    }
    toast('Log out successful.')
  }

  function unsubscribeAuthListener() {
    if (authListener) {
      authListener.unsubscribe()
      authListener = null
    }
  }

  return {
    // State
    user,
    errorMessage,

    // Actions
    fetchUser,
    register,
    signIn,
    signOut,
    unsubscribeAuthListener
  }
})
