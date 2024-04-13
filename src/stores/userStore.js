import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, logOut } from '@/api/userApi'
import { setupAuthListener } from '@/api/userApi'
// import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(undefined)

  const errorMessage = ref('')
  let authListener = null

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

  async function register(email, password) {
    try {
      user.value = await createNewUser(email, password)
    } catch (error) {
      console.error(error)
    }
  }
  // Error: Password should be at least 6 characters.

  async function signIn(email, password) {
    try {
      user.value = await logIn(email, password)
      errorMessage.value = '' // Clear the message on successful login
      console.log('User info retrieved:', user.value)
    } catch (error) {
      // {
      //   console.error(error)
      //   errorMessage.value = 'Wrong data provided.' // Set the message on error
      // }
      if (error.message === 'Email not confirmed') {
        errorMessage.value =
          'This email is not verified. Check your mailbox and try to login again.'
        resetErrorMessageAfterDelay(2500) // 2500 milliseconds
      } else {
        errorMessage.value = 'Wrong data provided. Please try again'
        resetErrorMessageAfterDelay(2500) // 2500 milliseconds
      }
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
    // Getters
    // Actions
    fetchUser,
    // signUp,
    register,
    signIn,
    signOut,
    errorMessage,
    unsubscribeAuthListener
  }
})
