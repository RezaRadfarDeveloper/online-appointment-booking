<template>
  <BaseLayout>
    <div class="container">
      <div class="data-container">
        <doctors-list></doctors-list>
        <div class="content">
          <doctor-details></doctor-details>
          <selected-appointment></selected-appointment>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import SelectedAppointment from '@/components/appointments/SelectedAppointment.vue'
import DoctorDetails from '@/components/doctors/DoctorDetails.vue'
import DoctorsList from '@/components/doctors/DoctorsList.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import BaseLayout from '@/ui/BaseLayout.vue'

import { onMounted } from 'vue'

export default {
  name: 'AppointmentSetting',
  components: {
    DoctorDetails,
    DoctorsList,
    SelectedAppointment,
    BaseLayout,
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
  padding-top: 1rem;
  width: 45%;
}
</style>
