<template>
  <Transition name="selected-appointment">
    <div v-if="selectedAppointment" class="selectedAppointment">
      <span>Selected session: {{ selectedAppointment?.title }}</span>
      <button @click="nextStepLocal">Next</button>
    </div>
  </Transition>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import useStepperBar from '@/hooks/useStepperBar'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { selectedAppointment } = useAppointmentDetails()
    const { isLoggedIn } = useAuth()
    const { nextStep, setStep } = useStepperBar(4)

    const nextStepLocal = () => {
      console.log(isLoggedIn.value)
      setStep(isLoggedIn.value ? 2 : 1)
      nextStep()
      router.push('/auth')
    }
    return { selectedAppointment, nextStepLocal }
  },
}
</script>
<style scoped>
.selectedAppointment {
  padding: 2rem 4rem;
  text-align: left;
  height: auto;
  background-color: rgb(241, 244, 244);
}
.selected-appointment-enter-from {
  opacity: 0;
  padding: 0rem 4rem;
}

.selected-appointment-enter-active {
  transition: all 0.2s ease-out;
}

.selected-appointment-enter-to {
  opacity: 1;
  padding: 2rem 4rem;
}
</style>
