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
import { onMounted, ref } from 'vue'
import AppointmentsList from '../appointments/AppointmentsList.vue'
import DatePicker from '../DatePicker.vue'
import DoctorItem from './DoctorItem.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
// import useLocalStorage from '@/hooks/useLocalStorage'

export default {
  props: ['doctor'],
  components: {
    AppointmentsList,
    DatePicker,
    DoctorItem,
  },

  setup() {
    const { selectedDoctor } = useAppointmentDetails()
    const isLoadingAppointment = ref(false)
    const timeoutId = ref(0)

    // const doctorId = useLocalStorage('doctor_id')
    // const doctor = useLocalStorage('doctor')

    const setLoading = () => {
      isLoadingAppointment.value = !isLoadingAppointment.value
      clearTimeout(timeoutId)
      timeoutId.value = setTimeout(() => {
        isLoadingAppointment.value = !isLoadingAppointment.value
      }, 500)
    }

    onMounted(() => {
      // console.log(doctorId.value)
      // console.log(doctor.value)
    })

    // watch(
    //   selectedDoctorId,
    //   () => {
    //     console.log(selectedDoctorId.value)
    //     setDoctorId(selectedDoctorId.value)
    //     // setDoctor(selectedDoctor.value)

    //     console.log(selectedDoctor.value)
    //   },
    //   {
    //     immediate: true,
    //   },
    // )

    return {
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
