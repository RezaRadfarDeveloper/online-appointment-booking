<template>
  <div class="booking-item">
    <div class="doctor-details">
      <span>Doctor: {{ `${appointment.doctors.fullName},` }}</span>
      <span>{{ appointment.doctors.expertise }}</span>
    </div>
    <p>
      <span>appointment time:</span> <span>{{ appointment.booking_details }}</span>
    </p>

    <p>
      <span>Address:</span> <span>{{ appointment.doctors.address }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['appointment'],
  setup() {},
}
</script>

<style scoped>
.booking-item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 65%;
  height: 12rem;
  padding: 1rem 2rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: rgb(var(--background-color-secondary));
}

.doctor-details {
  display: flex;
  justify-content: start;
  gap: 5px;
}
</style>
