<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
// from video
// import { useToast } from 'vue-toastification'
// const toast = useToast()

const userStore = useUserStore()

// const user = ref('')
const email = ref('')
const password = ref('')

// to bind user's input (user, pass) to signIn action of userStore ?
const signIn = () => {
  // userStore.signIn(user.value, password.value)
  userStore.signIn(email.value, password.value)
}

// MOVE TO HOME SCREEN
// handle error from supabase and present it to user
// so that when their email is not confirmed
// it states "email not confirmed " in the error.
</script>

<template>
  <main>
    <form @submit.prevent="signIn" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-light-green mb-4">Login to your Account</h1>

      <div class="flex flex-col mb-2">
        <label>
          User email:
          <!-- <input type="text" v-model="user" /> -->
          <input type="text" v-model="email" />
        </label>
      </div>

      <label>
        Password:
        <input type="password" v-model="password" />
      </label>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-white hover:bg-white hover:text-at-light-green"
      >
        Login using signIn funcion
      </button>

      <RouterLink class="text-sm mt-6 text-center" to="/register">
        Don't have an account? <span class="text-at-light-green">Register</span>
      </RouterLink>
    </form>

    <!-- Display the error message -->
    <div v-if="userStore.errorMessage" class="text-red-500">{{ userStore.errorMessage }}</div>
  </main>
</template>

<style scoped></style>
