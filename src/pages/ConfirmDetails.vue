<template>
  <div class="confirm-details">
    <h2>Appointment confirmation</h2>
    <section>
      <span>Doctor details:{{ selectedDoctor.fullName }}, {{ selectedDoctor.expertise }}</span>
      <span
        >Appointment Info:{{ dayOfWeek }}, {{ formattedDate }},{{
          selectedAppointment?.title
        }}</span
      >
      <span>Patients detail: {{ user.username }}</span>
    </section>
    <div class="btn-action">
      <ButtonAction @click="confirmAppointment" :is-loading="isLoading">
        {{ isLoading ? 'Booking...' : 'Confirm' }}
      </ButtonAction>
    </div>
    <router-link class="router-link" to="/">Not sure, Back to doctors list</router-link>
  </div>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import { useBooking } from '@/hooks/useBooking'

import ButtonAction from '@/ui/ButtonAction.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    ButtonAction,
  },
  setup() {
    const router = useRouter()

    const { selectedDoctor, selectedAppointment, formattedDate, dayOfWeek } =
      useAppointmentDetails()

    const { bookAppointment, isLoading } = useBooking()

    const { user } = useAuth()

    const confirmAppointment = async () => {
      console.log('confirmed appointment booking')
      await bookAppointment()
      router.push('/thank-you')
    }

    return {
      router,
      formattedDate,
      confirmAppointment,
      dayOfWeek,
      user,
      selectedDoctor,
      selectedAppointment,
      isLoading,
    }
  },
}
</script>

<style scoped>
.confirm-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw;
  height: 60vh;
  padding: 1rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px 10px 10px 10px;
}

h2 {
  text-align: center;
}

span {
  display: block;
}
</style>
