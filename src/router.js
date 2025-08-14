import { createRouter, createWebHistory } from 'vue-router'

import AppointmentSetting from '@/pages/AppointmentSetting.vue'
import AuthTabs from '@/pages/AuthTabs.vue'
import ConfirmDetails from '@/pages/ConfirmDetails.vue'
import OnScroll from '@/components/OnScroll.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppointmentSetting,
    },

    {
      path: '/auth',
      component: AuthTabs,
    },
    {
      path: '/confirmation',
      component: ConfirmDetails,
    },
    {
      path: '/onscroll',
      component: OnScroll,
    },
  ],
})

export default router
