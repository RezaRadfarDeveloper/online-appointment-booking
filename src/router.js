import { createRouter, createWebHistory } from 'vue-router'

import AppointmentSetting from '@/pages/AppointmentSetting.vue'
import AuthTabs from '@/pages/AuthTabs.vue'
import ConfirmDetails from '@/pages/ConfirmDetails.vue'
import OnScroll from '@/components/OnScroll.vue'
import { useAuth } from './hooks/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppointmentSetting,
    },

    {
      path: '/auth',
      name: 'auth',
      component: AuthTabs,
    },
    {
      path: '/confirmation',
      component: ConfirmDetails,
      name: 'confirmation',
      meta: { requiresAuth: true },
    },
    {
      path: '/onscroll',
      component: OnScroll,
    },
  ],
})

router.beforeEach((to, from, next) => {
  // const isLoggedIn = /* Your authentication check (e.g., check a token in localStorage, or a state in Vuex/Pinia) */;
  const { isLoggedIn } = useAuth()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    // If the route requires authentication and the user is not authenticated, redirect to login
    console.log(' confirmation', isLoggedIn.value)

    next({ name: 'auth' })
  } else if (from.name !== 'home' && to.name === 'auth' && isLoggedIn.value) {
    // If the user is already authenticated and tries to access the login page, redirect to dashboard
    console.log('auth route', isLoggedIn.value)
    next({ name: 'home' })
  } else if (from.name === 'home' && to.name === 'auth' && isLoggedIn.value) {
    // If the user is already authenticated and tries to access the login page, redirect to dashboard
    console.log('auth passed to confirmation route', isLoggedIn.value)
    next({ name: 'confirmation' })
  } else {
    // Allow navigation
    next()
  }
})

export default router
