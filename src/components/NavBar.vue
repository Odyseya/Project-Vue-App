<template>
  <header class="bg-[#3490dc52]">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/logo.svg" alt="Vue logo" />
        <!-- <RouterView /> -->
        <h1 class="text-lg">To Do App</h1>
      </div>

      <ul class="flex flex-1 justify-end gap-x-10">
        <RouterLink class="cursor-pointer" to="/">Home</RouterLink>
        <RouterLink class="cursor-pointer" :to="{ name: 'about' }">About</RouterLink>
        <!-- if logged show logout, otherwise login -->
        <RouterLink v-if="!user" class="cursor-pointer" to="/signin">Login</RouterLink>
        <li v-if="user" @click="logout" class="cursor-pointer logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// added to rotate navbar sign/out visibility
const user = computed(() => userStore.user)

const logout = async () => {
  try {
    await userStore.signOut()
    // redirect to the sign-in page or another appropriate page
    router.push({ name: 'signin' })
  } catch (error) {
    console.error('Error logging out:', error.message)
  }
}
</script>
