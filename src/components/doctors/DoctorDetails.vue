<template>
  <h2 v-if="!doctor" class="doctorDetails">No DoctorSelected</h2>
  <div v-else class="doctorDetails">
    <h3>{{ doctor.fullName }}</h3>
    <p>{{ doctor.expertise }}</p>
    <p>{{ doctor.address }}</p>
    <appointments-list
      @select-appointment="$emit('select-appointment', $event)"
      :doctor="doctor"
    ></appointments-list>
  </div>
</template>

<script>
import AppointmentsList from "../appointments/AppointmentsList.vue";

export default {
  props: ["doctor"],
  components: {
    AppointmentsList,
  },
};
</script>

<style scoped>
.doctorDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 0 1;
  padding: 1rem 3rem;
}
</style>
