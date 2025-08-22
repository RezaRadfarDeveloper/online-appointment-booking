<template>
  <button
    class="appointmentItem"
    :class="isAvailable ? 'active' : ''"
    :disabled="!isAvailable"
    @click="selectAppointment(appointment)"
  >
    {{ appointment.title }}
  </button>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

export default {
  props: ['appointment', 'isAvailable'],

  setup() {
    const { selectAppointment } = useAppointmentDetails()

    return {
      selectAppointment,
    }
  },
}
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
  background-color: rgb(4, 131, 140);
  cursor: pointer;
}

.selected {
  background-color: yellow;
}
</style>
