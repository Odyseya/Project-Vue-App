import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import AboutView from '@/views/AboutView.vue'
import RegisterView from '@/views/RegisterView.vue'

import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    }
  ]
})

// check if the user is authenticated before
// each route navigation
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Fetch user information if not already fetched
  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }
  // Check if the user is not logged in and the route is not Home or About
  if (
    userStore.user === null &&
    to.name !== 'signin' &&
    to.name !== 'about' &&
    // && to.name !== 'home'
    to.name !== 'register'
  ) {
    // Redirect to sign-in page if not logged in and not accessing Home or About
    next({ name: 'signin' })
  } else {
    // Proceed with navigation if logged in or accessing Home or About
    next()
  }
})

export default router
