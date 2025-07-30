import { createRouter, createWebHistory } from "vue-router";

import AppointmentSetting from "./pages/AppointmentSetting.vue";
import UserForm from "./pages/UserForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppointmentSetting,
    },

    {
      path: "/user-form",
      component: UserForm,
    },
  ],
});

export default router;
