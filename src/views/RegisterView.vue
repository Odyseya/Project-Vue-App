<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref(null)

// bind user's input (user, pass) to register action of userStore
const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match. Please try again.'
    return
  }
  try {
    await userStore.register(email.value, password.value)
    errorMsg.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    // router.push({ name: 'signin' })
  } catch (error) {
    console.error(error)
    errorMsg.value = 'Registration failed. Please try again.'
  }
}
</script>

<template>
  <div class="max-w-screen-md px-4 py-10 mx-auto">
    <!-- Register form-->
    <form @submit.prevent="register" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-light-green mb-4">Register new Account</h1>

      <!--  Email Field -->
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <!--  Password Field -->
      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <!-- Confirm Password Field -->
      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green"
          >Confirm Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div>

      <!-- Display the error message from this component -->
      <div v-if="errorMsg" class="mb-8 p-2 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>

      <!-- Display the error message from store-->
      <div v-if="userStore.errorMessage" class="text-red-500">
        {{ userStore.errorMessage }}
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Register
      </button>

      <RouterLink class="text-sm mt-6 text-center" to="/signin">
        <span class="text-at-light-green"> Already have an account? Login</span>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped></style>
