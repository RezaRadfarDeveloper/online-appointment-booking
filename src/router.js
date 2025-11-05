import { createRouter, createWebHistory } from 'vue-router'

import AppointmentSetting from '@/pages/AppointmentSetting.vue'
import AuthTabs from '@/pages/AuthTabs.vue'
import ConfirmDetails from '@/pages/ConfirmDetails.vue'
import OnScroll from '@/components/OnScroll.vue'
import { useAuth } from './hooks/useAuth'
import ThankYou from './pages/ThankYou.vue'
import UserAccount from './pages/UserAccount.vue'
import { useAppointmentDetails } from './hooks/useAppointmentDetails'

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
      path: '/thank-you',
      component: ThankYou,
      name: 'thank-you',
      meta: { requiresAuth: true },
    },
    {
      path: '/account',
      component: UserAccount,
      name: 'account',
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
  const { selectedAppointment } = useAppointmentDetails()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    // If the route requires authentication and the user is not authenticated, redirect to login

    next({ name: 'auth' })
  } else if (from.name !== 'home' && to.name === 'auth' && isLoggedIn.value) {
    // If the user is already authenticated and tries to access the login page, redirect to dashboard

    next({ name: 'home' })
  } else if (from.name === 'home' && to.name === 'auth' && isLoggedIn.value) {
    // If the user is already authenticated and tries to access the login page, redirect to dashboard
    console.log('auth passed to confirmation route', isLoggedIn.value)

    next({ name: 'confirmation' })
  } else if (
    from.name === 'auth' &&
    (selectedAppointment.value === undefined || selectedAppointment.value === null) &&
    to.name === 'confirmation'
  ) {
    // If the user has come to auth page but not selected appointment(step 1 is left)then go back to step 1
    next({ name: 'home' })
  } else {
    // Allow navigation
    next()
  }
})

export default router
