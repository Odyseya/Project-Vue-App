import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// check if the user is authenticated before navigation
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Fetch user information if not already fetched
  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }
  // If user is not logged in and the route is not Signin/About/Register
  // Redirect to sign-in page
  if (
    userStore.user === null &&
    to.name !== 'signin' &&
    to.name !== 'about' &&
    to.name !== 'register'
  ) {
    next({ name: 'signin' })
    // Proceed with navigation if logged in
  } else {
    next()
  }
})

export default router
