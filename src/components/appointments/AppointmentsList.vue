<template>
  <div class="appointmentsList">
    <loader-icon v-if="isLoading || initialLoading">Loading ...</loader-icon>
    <appointment-item
      v-else
      v-for="appointment in availableAppointments"
      :appointment="appointment"
      :key="appointment.id"
      :isAvailable="isAvailableSession(appointment.id)"
    ></appointment-item>
  </div>
</template>
<script>
import LoaderIcon from '@/ui/LoaderIcon.vue'
import AppointmentItem from './AppointmentItem.vue'
import data from '@/data'
export default {
  components: {
    AppointmentItem,
    LoaderIcon,
  },
  props: ['doctor', 'selectedWeekDay', 'isLoading'],

  data() {
    return {
      appointments: data.appointments,
      selectedAppointment: null,
      timeoutId: 0,
      initialLoading: false,
    }
  },
  computed: {
    availableAppointments() {
      return this.appointments
    },
    isAvailableSession() {
      return (appointmentId) => {
        return JSON.parse(this.doctor.appointmentsPerWeek)?.[this.selectedWeekDay]?.includes(
          appointmentId,
        )
      }
    },
  },

  methods: {
    selectAppointment(appointment) {
      this.selectedAppointment = appointment
    },
  },
  mounted() {
    this.initialLoading = true
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      this.initialLoading = false
    }, 500)
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
