<template>
  <nav>
    <router-link class="router-link" @click.native="previousStep" to="/"
      ><span>Back to doctors' list</span></router-link
    >
    <DarkModeToggle />
    <button :disabled="isLoading" v-if="!isLoggedIn" @click="checkAuth">Login /sign up</button>
    <template v-else>
      <button :disabled="isLoading" @click="checkAccount">account</button>
      <button :disabled="isLoading" @click="signOut">log out</button>
    </template>
  </nav>
</template>
<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import useLocalStorage from '@/hooks/useLocalStorage'
import useStepperBar from '@/hooks/useStepperBar'

import { useRouter } from 'vue-router'
import DarkModeToggle from './DarkModeToggle.vue'

export default {
  components: {
    DarkModeToggle,
  },
  setup() {
    const router = useRouter()
    const { logout, isLoggedIn, setIsLoggedIn, setUser, isLoading } = useAuth()
    const { setDoctor, setDoctorId, setWeekDay, selectDate, setFormattedDate, selectAppointment } =
      useAppointmentDetails()
    const { previousStep } = useStepperBar(4)

    const checkAccount = () => {
      router.push('/account')
    }
    const checkAuth = () => {
      router.push('/auth')
    }

    const signOut = async () => {
      await logout()

      const doctorId = useLocalStorage('doctor_id')
      const doctor = useLocalStorage('doctor')
      const weekDay = useLocalStorage('appointment_week_day')
      const date = useLocalStorage('date')
      const dateFormatted = useLocalStorage('appointment_formatted_date')
      const selectedAppointment = useLocalStorage('selected_appointment')
      const isLoggedInStorage = useLocalStorage('is_loggedIn')
      console.log(isLoggedInStorage.value)

      const user = useLocalStorage('user')

      doctorId.value = null
      doctor.value = null
      weekDay.value = null
      date.value = null
      dateFormatted.value = null
      selectedAppointment.value = null
      isLoggedIn.value = null
      isLoggedInStorage.value = null
      user.value = null

      setDoctorId(null)
      setDoctor(null)
      selectDate(null)
      setWeekDay(null)
      setFormattedDate(null)
      selectAppointment(null)
      setIsLoggedIn(false)
      setUser(null)

      router.push('/')
    }

    return {
      checkAccount,
      checkAuth,
      previousStep,
      isLoggedIn,
      signOut,
      isLoading,
    }
  },
}
</script>
<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
}

button {
  background-color: var(--background-color-ternary);
  color: var(--text-primary-color);
  padding: 0.5rem;
  width: 8rem;
  height: 2.5rem;
  text-align: center;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
  }
}
</style>
