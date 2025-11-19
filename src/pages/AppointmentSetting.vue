<template>
  <BaseLayout>
    <div class="container">
      <div class="data-container">
        <doctors-list></doctors-list>
        <AppointmentDetailModal />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import AppointmentDetailModal from '@/components/AppointmentDetailModal.vue'
import DoctorsList from '@/components/doctors/DoctorsList.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

import BaseLayout from '@/ui/BaseLayout.vue'
import { computed } from 'vue'

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AppointmentSetting',
  components: {
    DoctorsList,
    BaseLayout,
    AppointmentDetailModal,
  },
  setup() {
    const { fetchDoctors, availableDoctors } = useAppointmentDetails()
    const route = useRoute()

    const path = computed(() => route.path)
    console.log(path.value)

    onMounted(() => {
      fetchDoctors()
    })

    return {
      availableDoctors,
    }
  },
}
</script>

<style>
.data-container {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
}
.content {
  height: max-content;
  width: 45%;
  position: relative;
  margin: 80px auto;
  padding-top: 1rem;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); */
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
