<template>
  <div class="container">
    <doctors-list :doctors="doctors" @select-doctor="setDoctor"></doctors-list>
    <div class="content">
      <doctor-details
        :doctor="selectedDoctor"
        @select-appointment="selectAppointment"
      ></doctor-details>

      <selected-appointment
        :selectedAppointment="selectedAppointment"
      ></selected-appointment>
    </div>
  </div>
</template>

<script>
import SelectedAppointment from "@/components/appointments/SelectedAppointment.vue";
import DoctorDetails from "@/components/doctors/DoctorDetails.vue";
import DoctorsList from "@/components/doctors/DoctorsList.vue";
import data from "../data.js";

export default {
  name: "AppointmentSetting",
  components: {
    DoctorDetails,
    DoctorsList,
    SelectedAppointment,
  },
  data() {
    return {
      availableDoctors: data.doctors,
      selectedDoctor: null,
      selectedAppointment: null,
    };
  },

  computed: {
    doctors() {
      return this.availableDoctors;
    },
  },
  methods: {
    setDoctor(doctorId) {
      this.selectedAppointment = null;
      this.selectedDoctor = this.availableDoctors.find(
        (doctor) => doctor.id === doctorId
      );
    },
    selectAppointment(appointment) {
      this.selectedAppointment = appointment;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>
