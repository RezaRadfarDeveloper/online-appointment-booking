<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="UserAccount">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { onMounted } from 'vue'
import useLocalStorage from './hooks/useLocalStorage'
import { useAppointmentDetails } from './hooks/useAppointmentDetails'
import { useAuth } from './hooks/useAuth'

export default {
  name: 'App',
  setup() {
    const { setDoctor, setDoctorId, setFormattedDate, setWeekDay, selectAppointment, selectDate } =
      useAppointmentDetails()
    const { setIsLoggedIn, setUser } = useAuth()

    onMounted(() => {
      const doctorId = useLocalStorage('doctor_id')
      const doctor = useLocalStorage('doctor')
      const weekDay = useLocalStorage('appointment_week_day')
      const date = useLocalStorage('date')
      const dateFormatted = useLocalStorage('appointment_formatted_date')
      const selectedAppointment = useLocalStorage('selected_appointment')
      const isLoggedIn = useLocalStorage('is_loggedIn')
      const user = useLocalStorage('user')

      setDoctorId(doctorId.value)
      setDoctor(doctor.value)
      selectDate(date.value)
      setWeekDay(weekDay.value)
      setFormattedDate(dateFormatted.value)
      selectAppointment(selectedAppointment.value)
      setIsLoggedIn(isLoggedIn.value)
      setUser(user.value)
      console.log('islogged in in app', isLoggedIn.value)
    })
  },
}
</script>

<style>
:root {
  --background-color-primary: 255, 255, 255;
  --background-color-secondary: 249, 249, 249;

  --background-color-ternary: rgb(255, 140, 0);
  --background-color-loading: #ffb459;

  --border-color-circle: 34, 34, 34;
  --connector-color: lch(69.48% 84 63.99 / 0.051);

  --accent-color: #3f3f3f;
  --text-primary-color: rgb(76, 75, 75);
  /* #222; */
  --text-secondary-color: #535353;
  --text-ternary-color: rgb(85, 85, 85);
  /* #666e73; */

  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: 32, 39, 51;
  /* #373a4e; */
  --background-color-secondary: 41, 53, 67;
  /* #2d2d30; */
  --background-color-ternary: rgb(242, 102, 78);

  --background-color-loading: rgb(246, 142, 124);

  --border-color-circle: 192, 183, 152;

  --connector-color: #f268500d;

  --text-secondary-color: #b4ae98;
  --text-ternary-color: #56f6e9;

  --accent-color: #cacaca;
  --text-primary-color: #e5e5e5;
}
#app {
  display: block;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}
</style>
