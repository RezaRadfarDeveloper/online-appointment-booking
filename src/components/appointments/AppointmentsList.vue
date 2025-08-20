<template>
  <div class="appointmentsList">
    <div class="no-data" v-if="isLoading || initialLoading">Loading ...</div>
    <appointment-item
      v-else
      v-for="appointment in availableAppointments"
      :appointment="appointment"
      :key="appointment.id"
      :isAvailable="isAvailableSession(appointment.id)"
      :selected="selectedAppointment"
      @select-appointment="selectAppointment"
    ></appointment-item>
  </div>
</template>
<script>
import AppointmentItem from './AppointmentItem.vue'
import data from '@/data'
export default {
  components: {
    AppointmentItem,
  },
  props: ['doctor', 'selectedWeekDay', 'isLoading'],
  emits: ['select-appointment'],

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
      this.$emit('select-appointment', appointment)
    },
  },
  mounted() {
    this.initialLoading = true
    clearTimeout(this.timeoutId)
    console.log(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      console.log('mounted appointment list')
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
