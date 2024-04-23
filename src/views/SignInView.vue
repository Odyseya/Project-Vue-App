<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
// from video
// import { useToast } from 'vue-toastification'
// const toast = useToast()

const userStore = useUserStore()
const router = useRouter()

// const user = ref('')
const email = ref('')
const password = ref('')
// to display error messages from this component
// const errorMsg = ref(null)

// bind user's input (user, pass) to signIn action of userStore
// redirects even if email not confirmed
// const signIn = async () => {
//   try {
//     await userStore.signIn(email.value, password.value)
//     password.value = ''
//     router.push({ name: 'home' })
//   } catch (error) {
//     console.error(error)

//     // handle error "email not confirmed" from supabase
//     // and present it to user
//     // if (error.message === 'Email not confirmed') {
//     //   errorMsg.value = 'This email is not verified. Check your mailbox and try to login again.'
//     // } else {
//     //   errorMsg.value = 'Wrong data provided. Please try again'
//     // }
//   }
// }

const signIn = async () => {
  try {
    const loginSuccess = await userStore.signIn(email.value, password.value)
    password.value = ''

    if (loginSuccess) {
      router.push({ name: 'home' })
    } else {
      // The login attempt failed, possibly due to email not being confirmed.
      // Do not redirect to the homepage.
      console.log('Login failed. Verify email confirmation status.')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
      <form @submit.prevent="signIn" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
        <h1 class="text-3xl text-at-light-green mb-4">Login to your Account</h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green">User email: </label>
          <input
            type="text"
            required
            id="email"
            v-model="email"
            class="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-at-light-green">Password:</label>
          <input
            type="password"
            required
            id="password"
            v-model="password"
            class="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <!-- Display the error message from store-->
        <div v-if="userStore.errorMessage" class="text-red-500">
          {{ userStore.errorMessage }}
        </div>
        <!-- Display the error message from this component-->
        <!-- <div v-if="errorMsg" class="text-red-500">
      {{ errorMsg }}
    </div> -->
        <button
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Login
        </button>

        <p class="text-sm mt-6 text-center">
          <RouterLink class="text-sm mt-6 text-center text-at-light-green" to="/register">
            Don't have an account? <span class="text-at-light-green">Register</span>
          </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
