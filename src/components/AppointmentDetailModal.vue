<template>
  <div class="modal-mask" v-show="modalIsOpen">
    <div class="content" ref="modalRef">
      <doctor-details></doctor-details>
      <selected-appointment></selected-appointment>
    </div>
  </div>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import useClickOutside from '@/hooks/useClickOutside'

import { ref } from 'vue'
import DoctorDetails from './doctors/DoctorDetails.vue'
import SelectedAppointment from './appointments/SelectedAppointment.vue'

export default {
  components: {
    DoctorDetails,
    SelectedAppointment,
  },
  setup() {
    const { modalIsOpen, setModalOpen } = useAppointmentDetails()
    const modalRef = ref(null)
    useClickOutside(modalRef, setModalOpen, modalIsOpen)

    return {
      modalIsOpen,
      modalRef,
    }
  },
}
</script>
