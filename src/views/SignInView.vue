<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const signIn = async () => {
  try {
    const loginSuccess = await userStore.signIn(email.value, password.value)
    password.value = ''

    // if login successfull, redirect
    if (loginSuccess) {
      router.push({ name: 'home' })
      // if login failed, do not redirect to the homepage.
    } else {
      console.log('Login failed. Check email')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <!-- Email field -->
  <div class="max-w-screen-md px-4 py-10 mx-auto">
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

      <!-- Password field -->
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
      <div v-if="userStore.errorMessage" class="text-red-500 mx-auto">
        {{ userStore.errorMessage }}
      </div>

      <!-- Login button -->
      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Login
      </button>

      <!-- Don't have an account redirection  -->
      <p class="text-sm mt-6 text-center">
        <RouterLink class="text-sm mt-6 text-center text-at-light-green" to="/register">
          Don't have an account? <span class="text-at-light-green">Register</span>
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped></style>
