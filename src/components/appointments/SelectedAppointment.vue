<template>
  <Transition name="selected-appointment">
    <div v-if="selectedAppointment" class="selectedAppointment">
      <span>
        <span class="btn btn-tag">{{ selectedAppointment?.title }}</span></span
      >
      <span class="btn btn-next" @click="nextStepLocal">Next</span>
    </div>
  </Transition>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
// import useStepperBar from '@/hooks/useStepperBar'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const { selectedAppointment, setModalOpen } = useAppointmentDetails()
    const { isLoggedIn } = useAuth()
    // const { nextStep, setStep } = useStepperBar(4)

    const nextStepLocal = () => {
      console.log(isLoggedIn.value)
      // setStep(isLoggedIn.value ? 2 : 1)
      // nextStep()
      setModalOpen(false)
      router.push('/auth')
    }
    return { selectedAppointment, nextStepLocal }
  },
}
</script>
<style scoped>
.selectedAppointment {
  display: flex;
  justify-content: space-around;
  padding: 2rem 4rem;
  text-align: left;
  height: auto;
  background-color: rgb(var(--background-color-secondary));
  border-top: 1px solid #d3d3d3;
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
.btn {
  display: inline-block;

  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 3rem;
  background-color: var(--background-color-ternary);

  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  &.btn-tag {
    background-color: #0899a4;
  }
  &.btn-next {
    text-align: center;
    cursor: pointer;
  }
}

.next-button {
  width:;
}
</style>
