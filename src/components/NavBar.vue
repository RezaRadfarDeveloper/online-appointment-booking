<template>
  <nav>
    <span v-if="!isLoggedIn" @click="checkAuth">Login /sign up</span>
    <template v-else>
      <span @click="checkAccount">account</span>
      <span @click="signOut">log out</span>
    </template>
  </nav>
</template>
<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { logout, isLoggedIn } = useAuth()
    const { setDoctor, setDoctorId, setWeekDay, selectDate, setFormattedDate, selectAppointment } =
      useAppointmentDetails()
    const { setIsLoggedIn, setUser } = useAuth()

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
      const isLoggedIn = useLocalStorage('is_loggedIn')
      const user = useLocalStorage('user')

      doctorId.value = null
      doctor.value = null
      weekDay.value = null
      date.value = null
      dateFormatted.value = null
      selectedAppointment.value = null
      isLoggedIn.value = null
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
      isLoggedIn,
      signOut,
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
  padding: 0.75rem;
}

span {
  background-color: #ff8c00;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
  }
}
</style>
