import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn } from '@/api/userApi'

import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(undefined)

  const errorMessage = ref('')

  // Getters
  //define computed properties based on the state

  // Actions

  // If user is not authenticated (error code '401')
  // sets user to null
  async function fetchUser() {
    try {
      user.value = await fetchActualUser()
    } catch (error) {
      if (error.code === '401') {
        user.value = null
        return
      }
    }
  }

  // async function signUp(email, password) {
  //   try {
  //     user.value = await createNewUser(email, password)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  async function register(email, password) {
    try {
      user.value = await createNewUser(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  async function signIn(email, password) {
    try {
      user.value = await logIn(email, password)
      errorMessage.value = '' // Clear the message on successful login
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Wrong password provided.' // Set the message on error
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

    errorMessage
  }
})
