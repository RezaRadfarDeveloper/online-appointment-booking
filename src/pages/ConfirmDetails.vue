<template>
  <BaseLayout>
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
      <router-link class="router-link" @click.native="handleNavigation" to="/"
        >Not sure, Back to doctors list</router-link
      >
    </div>
  </BaseLayout>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import { useBooking } from '@/hooks/useBooking'
import useStepperBar from '@/hooks/useStepperBar'
import BaseLayout from '@/ui/BaseLayout.vue'

import ButtonAction from '@/ui/ButtonAction.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    ButtonAction,
    BaseLayout,
  },
  setup() {
    const router = useRouter()

    const { selectedDoctor, selectedAppointment, formattedDate, dayOfWeek } =
      useAppointmentDetails()
    // const { isLoggedIn } = useAuth()
    const { previousStep, nextStep, setStep } = useStepperBar(4)

    const { bookAppointment, isLoading } = useBooking()

    const { user, isLoggedIn } = useAuth()

    const confirmAppointment = async () => {
      console.log('confirmed appointment booking')
      await bookAppointment()
      setStep(1)
      nextStep()
      router.push('/thank-you')
    }

    const handleNavigation = () => {
      setStep(isLoggedIn ? 2 : 1)
      previousStep()
    }

    return {
      router,
      formattedDate,
      confirmAppointment,
      previousStep,
      handleNavigation,
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
  position: absolute;
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
