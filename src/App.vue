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
    })
  },
}
</script>

<style>
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
