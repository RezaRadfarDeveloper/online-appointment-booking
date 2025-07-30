<template>
  <Transition name="selected-appointment">
    <div v-if="selectedAppointment" class="selectedAppointment">
      <span>Selected session: {{ selectedAppointment?.title }}</span>
      <button @click="$router.push('/user-form')">Next</button>
    </div>
  </Transition>
</template>

<script>
export default {
  props: ["selectedAppointment"],
};
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
