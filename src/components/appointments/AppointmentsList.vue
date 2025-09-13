<template>
  <div class="appointmentsList">
    <loader-icon v-if="isLoading || initialLoading">Loading ...</loader-icon>
    <appointment-item
      v-else
      v-for="appointment in availableAppointments"
      :appointment="appointment"
      :key="appointment.id"
      :isBooked="isBookedSession(appointment.title)"
      :isAvailable="isAvailableSession(appointment.id)"
    ></appointment-item>
  </div>
</template>
<script>
import LoaderIcon from '@/ui/LoaderIcon.vue'
import AppointmentItem from './AppointmentItem.vue'
import data from '@/data'
import { computed, onMounted, ref } from 'vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useBooking } from '@/hooks/useBooking'
export default {
  components: {
    AppointmentItem,
    LoaderIcon,
  },
  props: ['doctor', 'isLoading'],

  setup(props) {
    const { dayOfWeek, formattedDate } = useAppointmentDetails()
    const { bookedAppointments } = useBooking()
    const appointments = ref(data.appointments)
    const selectedAppointment = ref(null)
    const timeoutId = ref(0)
    const initialLoading = ref(false)

    const availableAppointments = computed(() => {
      return appointments.value
    })

    const isAvailableSession = computed(() => {
      return (appointmentId) => {
        return JSON.parse(props.doctor.appointmentsPerWeek)?.[dayOfWeek.value || 'Mon']?.includes(
          appointmentId,
        )
      }
    })
    const isBookedSession = computed(() => {
      return (appointmentTitle) => {
        return bookedAppointments.value?.includes(
          `${dayOfWeek.value},${formattedDate.value},${appointmentTitle}`,
        )
      }
    })

    const selectAppointment = (appointment) => {
      console.log('here booked appointments', bookedAppointments.value)
      console.log(bookedAppointments.value)

      selectedAppointment.value = appointment
    }

    onMounted(() => {
      initialLoading.value = true
      clearTimeout(timeoutId.value)

      timeoutId.value = setTimeout(() => {
        initialLoading.value = false
      }, 500)
    })

    return {
      isAvailableSession,
      isBookedSession,
      availableAppointments,
      initialLoading,
      selectAppointment,
    }
  },
}
</script>

<style scoped>
.appointmentsList {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 1rem;
  column-gap: 1rem;
}
</style>
