<template>
  <h2 v-if="!doctor" class="doctorDetails">No DoctorSelected</h2>
  <div v-else class="doctorDetails">
    <doctor-item :doctor="doctor" :activeAction="false"></doctor-item>
    <date-picker
      @toggle-loader="setLoading"
      @set-weekday-date="setWeekDayDate"
      :doctorId="String(doctor.id)"
    ></date-picker>
    <appointments-list
      @select-appointment="$emit('select-appointment', $event)"
      :doctor="doctor"
      :isLoading="isLoadingAppointment"
      :selected-week-day="selectedWeekDay"
    ></appointments-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppointmentsList from '../appointments/AppointmentsList.vue'
import DatePicker from '../DatePicker.vue'
import DoctorItem from './DoctorItem.vue'

export default {
  props: ['doctor'],
  components: {
    AppointmentsList,
    DatePicker,
    DoctorItem,
  },

  setup() {
    const selectedWeekDay = ref('Mon')
    const isLoadingAppointment = ref(false)
    const timeoutId = ref(0)
    const setWeekDayDate = ({ day, formattedDate }) => {
      selectedWeekDay.value = day
      console.log(formattedDate)
    }

    const setLoading = () => {
      console.log('toggle triggered')
      isLoadingAppointment.value = !isLoadingAppointment.value
      clearTimeout(timeoutId)
      timeoutId.value = setTimeout(() => {
        isLoadingAppointment.value = !isLoadingAppointment.value
      }, 500)
    }

    return {
      setWeekDayDate,
      selectedWeekDay,
      isLoadingAppointment,
      setLoading,
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
  text-align: center;
}
</style>
