<template>
  <header>
    <div class="min-h-full font-Poppins box-border">
      <nav>
        <!-- styled tailwind -->
        <!-- <NavBar /> -->
        <!-- styled scoped: -->
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/signin">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
// import NavBar from './components/NavBar.vue'
// suggested by iron portal
// import { onMounted } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/userStore'

// const router = useRouter()
// const userStore = useUserStore()
// const { user } = storeToRefs(userStore)

// onMounted(async () => {
//   try {
//     await userStore.fetchUser() // Fetch the user's authentication status
//     if (!userStore.user.value) {
//       // If the user is not authenticated, redirect them to the sign-in page
//       router.push({ name: 'signin' })
//     } else {
//       // If the user is authenticated, continue to the dashboard or home page
//       router.push({ name: 'home' })
//     }
//   } catch (e) {
//     console.error(e)
//     // Optionally, handle the error, e.g., by showing an error message
//   }
// })
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
