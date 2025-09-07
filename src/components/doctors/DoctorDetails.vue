<template>
  <h2 v-if="!selectedDoctor" class="doctorDetails">No DoctorSelected</h2>
  <div v-else class="doctorDetails">
    <doctor-item :doctor="selectedDoctor" :activeAction="false"></doctor-item>
    <date-picker @toggle-loader="setLoading" :doctorId="String(selectedDoctor.id)"></date-picker>
    <appointments-list
      :doctor="selectedDoctor"
      :isLoading="isLoadingAppointment"
    ></appointments-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppointmentsList from '../appointments/AppointmentsList.vue'
import DatePicker from '../DatePicker.vue'
import DoctorItem from './DoctorItem.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

export default {
  props: ['doctor'],
  components: {
    AppointmentsList,
    DatePicker,
    DoctorItem,
  },

  setup() {
    const { selectedDoctor } = useAppointmentDetails()
    // const selectedWeekDay = ref('Mon')
    const isLoadingAppointment = ref(false)
    const timeoutId = ref(0)
    // const setWeekDayDate = ({ day, formattedDate }) => {
    //   selectedWeekDay.value = day
    //   console.log(formattedDate)
    // }

    const setLoading = () => {
      isLoadingAppointment.value = !isLoadingAppointment.value
      clearTimeout(timeoutId)
      timeoutId.value = setTimeout(() => {
        isLoadingAppointment.value = !isLoadingAppointment.value
      }, 500)
    }

    return {
      // setWeekDayDate,
      // selectedWeekDay,
      isLoadingAppointment,
      setLoading,
      selectedDoctor,
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
