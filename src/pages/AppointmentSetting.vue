<template>
  <div class="container">
    <doctors-list @select-doctor="setDoctor"></doctors-list>

    <div class="content">
      <doctor-details
        :doctor="selectedDoctor"
        @select-appointment="selectAppointment"
      ></doctor-details>

      <selected-appointment :selectedAppointment="selectedAppointment"></selected-appointment>
    </div>
  </div>
</template>

<script>
import SelectedAppointment from '@/components/appointments/SelectedAppointment.vue'
import DoctorDetails from '@/components/doctors/DoctorDetails.vue'
import DoctorsList from '@/components/doctors/DoctorsList.vue'

import { supabase } from '@/supabase.js'
import { onMounted, ref } from 'vue'

export default {
  name: 'AppointmentSetting',
  components: {
    DoctorDetails,
    DoctorsList,
    SelectedAppointment,
  },
  setup() {
    const availableDoctors = ref([])
    const selectedDoctor = ref(null)
    const isLoading = ref(false)
    const selectedAppointment = ref(null)

    const setDoctor = (doctorId) => {
      selectedAppointment.value = null
      selectedDoctor.value = availableDoctors.value.find((doctor) => doctor.id === doctorId)
    }

    const selectAppointment = (appointment) => {
      selectedAppointment.value = appointment
    }
    const fetchData = async () => {
      isLoading.value = true
      const { data, error } = await supabase.from('doctors').select('*')
      isLoading.value = false
      if (error) {
        console.error('Error fetching data:', error)
      } else {
        // console.log(data)

        availableDoctors.value = data
      }
    }

    onMounted(() => fetchData())

    return {
      setDoctor,
      availableDoctors,
      selectAppointment,
      selectedAppointment,
      selectedDoctor,
      fetchData,
      isLoading,
    }
  },

  // methods: {
  //   // setDoctor(doctorId) {
  //   //   this.selectedAppointment = null
  //   //   this.selectedDoctor = this.availableDoctors.find((doctor) => doctor.id === doctorId)
  //   // },
  //   // selectAppointment(appointment) {
  //   //   this.selectedAppointment = appointment
  //   // },
  //   // async fetchData() {
  //   //   this.isLoading = true
  //   //   const { data, error } = await supabase.from('doctors').select('*')
  //   //   this.isLoading = false
  //   //   if (error) {
  //   //     console.error('Error fetching data:', error)
  //   //   } else {
  //   //     console.log(data)
  //   //     this.availableDoctors = data
  //   //   }
  //   // },
  // },

  // mounted() {
  //   this.fetchData()
  // },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
}
.content {
  padding-top: 4rem;
  width: 45%;
}
</style>
