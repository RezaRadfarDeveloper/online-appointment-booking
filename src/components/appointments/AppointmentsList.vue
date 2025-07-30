<template>
  <div class="appointmentsList">
    <appointment-item
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
import AppointmentItem from "./AppointmentItem.vue";
import data from "../../data.js";
export default {
  components: {
    AppointmentItem,
  },
  props: ["doctor"],
  emits: ["select-appointment"],

  data() {
    return {
      appointments: data.appointments,
      selectedAppointment: null,
    };
  },
  computed: {
    availableAppointments() {
      return this.appointments;
    },
    isAvailableSession() {
      return (appointmentId) => {
        return this.doctor.appointments.includes(appointmentId);
      };
    },
  },

  methods: {
    selectAppointment(appointment) {
      this.selectedAppointment = appointment;
      this.$emit("select-appointment", appointment);
    },
  },
};
</script>

<style scoped>
.appointmentsList {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 1rem;
}
</style>
