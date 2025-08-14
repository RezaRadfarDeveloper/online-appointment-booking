<template>
  <h2 v-if="!doctor" class="doctorDetails">No DoctorSelected</h2>
  <div v-else class="doctorDetails">
    <h3>{{ doctor.fullName }}</h3>
    <p>{{ doctor.expertise }}</p>
    <p>{{ doctor.address }}</p>
    <date-picker @set-weekday-date="setWeekDayDate" :doctorId="String(doctor.id)"></date-picker>
    <appointments-list
      @select-appointment="$emit('select-appointment', $event)"
      :doctor="doctor"
      :selected-week-day="selectedWeekDay"
    ></appointments-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppointmentsList from '../appointments/AppointmentsList.vue'
import DatePicker from '../DatePicker.vue'

export default {
  props: ['doctor'],
  components: {
    AppointmentsList,
    DatePicker,
  },

  setup() {
    const selectedWeekDay = ref('Mon')
    const setWeekDayDate = ({ day, formattedDate }) => {
      selectedWeekDay.value = day
      console.log(formattedDate)
      console.log(day)
    }

    return {
      setWeekDayDate,
      selectedWeekDay,
    }
  },
}
</script>

<style scoped>
.doctorDetails {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 1;
  padding: 1rem 3rem;
}
</style>
