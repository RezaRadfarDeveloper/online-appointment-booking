<template>
  <button
    class="appointmentItem"
    :class="isAvailable ? 'active' : ''"
    :disabled="!isAvailable"
    @click="selectAppointment"
  >
    {{ appointment.title }}
  </button>
</template>

<script>
export default {
  props: ["appointment", "isAvailable", "selected"],
  emits: ["select-appointment"],
  data() {
    return {};
  },

  methods: {
    selectAppointment() {
      this.$emit("select-appointment", this.appointment);
    },
  },
};
</script>

<style scoped>
.appointmentItem {
  padding: 0.5rem 0.3rem;
  background-color: gainsboro;
  width: 22%;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-radius: 7px;
}

.active {
  background-color: #5aebbb;
  cursor: pointer;
}

.selected {
  background-color: yellow;
}
</style>
