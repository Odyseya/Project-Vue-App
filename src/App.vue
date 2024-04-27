<script setup>
import NavBar from './components/NavBar.vue'
import { useUserStore } from '@/stores/userStore'
import { onUnmounted } from 'vue'

const userStore = useUserStore()

// remove the callback FROM setupAuthListener
// ensures that the auth listener is properly cleaned up.
onUnmounted(() => {
  userStore.unsubscribeAuthListener()
})
</script>

<template>
  <header>
    <div class="min-h-full font-Poppins box-border">
      <nav>
        <NavBar />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
