<template>
  <BaseLayout>
    <div class="container">
      <div class="data-container">
        <doctors-list></doctors-list>
        <AppointmentDetailModal />
        <!-- <div class="modal-mask" v-show="false">
          <div class="content" ref="modalRef">
            <doctor-details></doctor-details>
            <selected-appointment></selected-appointment>
          </div>
        </div> -->
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import AppointmentDetailModal from '@/components/AppointmentDetailModal.vue'
// import SelectedAppointment from '@/components/appointments/SelectedAppointment.vue'
// import DoctorDetails from '@/components/doctors/DoctorDetails.vue'
import DoctorsList from '@/components/doctors/DoctorsList.vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
// import useClickOutside from '@/hooks/useClickOutside'
import BaseLayout from '@/ui/BaseLayout.vue'

import { onMounted } from 'vue'

export default {
  name: 'AppointmentSetting',
  components: {
    // DoctorDetails,
    DoctorsList,
    // SelectedAppointment,
    BaseLayout,
    AppointmentDetailModal,
  },
  setup() {
    const { fetchDoctors, availableDoctors } = useAppointmentDetails()

    // const modalRef = ref(null)
    // useClickOutside(modalRef, () => setModalOpen(false))
    // const handleClick = (event) => {
    //   if (modalIsOpen.value === false) return
    //   console.log('handleclicked reached')
    //   if (event.target == modalRef.value || event.composedPath().includes(modalRef.value)) {
    //     console.log('clicked on modal area')
    //     return
    //   }
    //   setModalOpen(false)
    // }

    onMounted(() => {
      // useClickOutside(modalRef, (val) => setModalOpen(val), modalIsOpen)
      // window.addEventListener('click', (e) => handleClick(e), true)
      fetchDoctors()
    })
    // onBeforeMount(() => {
    //   window.removeEventListener('click', (e) => handleClick(e), true)
    // })

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
