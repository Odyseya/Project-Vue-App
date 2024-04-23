import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, logOut } from '@/api/userApi'
import { setupAuthListener } from '@/api/userApi'
// import { useRouter } from 'vue-router'

import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(undefined)

  const errorMessage = ref('')
  let authListener = null

  const toast = useToast()

  // Setup auth listener when the store is initialized
  setupAuthListener({ user }).then((listener) => {
    authListener = listener
  })

  // Getters  // define computed properties based on the state

  // Actions

  // If user is not authenticated (error code '401')
  // sets user to null
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

  // test
  async function register(email, password) {
    try {
      user.value = await createNewUser(email, password)
      toast.success('Account created. We sent you an email. Please check your mailbox.')
    } catch (error) {
      console.error(error)

      if (error.message === 'Password should be at least 6 characters') {
        errorMessage.value = 'Password should be at least 6 characters'
      }
    }
  }
  // Error: Password should be at least 6 characters.

  // async function signIn(email, password) {
  //   try {
  //     user.value = await logIn(email, password)
  //     errorMessage.value = '' // Clear the message on successful login
  //     console.log('User info retrieved:', user.value)
  //   } catch (error) {
  //     // {
  //     console.error(error)
  //     //   errorMessage.value = 'Wrong data provided.' // Set the message on error
  //     // }
  //     if (error.message === 'Email not confirmed') {
  //       // errorMessage.value =
  //       toast.warning('This email is not verified. Check your mailbox and try to login again.')
  //     } else {
  //       errorMessage.value = 'Invalid login credentials or account does not exist. Please try again'
  //     }
  //     resetErrorMessageAfterDelay(3500)
  //   }
  // }

  async function signIn(email, password) {
    try {
      user.value = await logIn(email, password)
      errorMessage.value = '' // Clear the message on successful login
      console.log('User info retrieved:', user.value)
      // Assuming logIn function throws an error if email is not confirmed
      return true // Return true to indicate successful login
    } catch (error) {
      // {
      console.error(error)
      //   errorMessage.value = 'Wrong data provided.' // Set the message on error
      // }
      if (error.message === 'Email not confirmed') {
        // errorMessage.value =
        toast.warning('This email is not verified. Check your mailbox and try to login again.')
        return false // Return false to indicate login failed due to email not being confirmed
      } else {
        errorMessage.value = 'Invalid login credentials or account does not exist. Please try again'
      }
      resetErrorMessageAfterDelay(3500)
      return false // Return false for other errors as well
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
      user.value = null // Ensure the user's state is cleared / SHOULD BE UNDEFINED?
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
    // Getters

    // Actions
    fetchUser,
    register,
    signIn,
    signOut,
    unsubscribeAuthListener
  }
})
