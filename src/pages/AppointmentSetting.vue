<template>
  <div class="container">
    <progress-bar></progress-bar>
    <div class="data-container">
      <doctors-list></doctors-list>
      <div class="content">
        <doctor-details></doctor-details>
        <selected-appointment></selected-appointment>
      </div>
    </div>
  </div>
</template>

<script>
import SelectedAppointment from '@/components/appointments/SelectedAppointment.vue'
import DoctorDetails from '@/components/doctors/DoctorDetails.vue'
import DoctorsList from '@/components/doctors/DoctorsList.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

import { onMounted } from 'vue'

export default {
  name: 'AppointmentSetting',
  components: {
    DoctorDetails,
    DoctorsList,
    SelectedAppointment,
    ProgressBar,
  },
  setup() {
    const { fetchDoctors, availableDoctors } = useAppointmentDetails()

    onMounted(() => fetchDoctors())

    return {
      availableDoctors,
    }
  },
}
</script>

<style scoped>
.data-container {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
}
.content {
  padding-top: 4rem;
  width: 45%;
}
</style>
