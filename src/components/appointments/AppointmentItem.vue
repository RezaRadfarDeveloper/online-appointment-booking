<template>
  <button
    class="appointmentItem"
    :class="[isAvailable ? 'active' : '', isBooked ? 'booked' : '']"
    :disabled="!isAvailable || isBooked"
    @click="selectAppointment(appointment)"
  >
    {{ appointment.title }}
  </button>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { computed } from 'vue'

export default {
  props: ['appointment', 'isAvailable', 'isBooked'],

  setup(props) {
    const { selectAppointment, formattedDate, dayOfWeek } = useAppointmentDetails()

    const currentItemDetails = computed(() => {
      // to recreate the same format as we save booking details in database,  making comparison between front and back-end easy
      return `${dayOfWeek.value},${formattedDate.value},${props.appointment.title}`
    })

    return {
      selectAppointment,
      currentItemDetails,
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

.booked {
  background-color: rgb(243, 88, 88);
  cursor: not-allowed;
}

.selected {
  background-color: yellow;
}
</style>
