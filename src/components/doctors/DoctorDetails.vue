<template>
  <button class="close-icon" @click="closeModal">X</button>
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
    const { selectedDoctor, setModalOpen } = useAppointmentDetails()
    const isLoadingAppointment = ref(false)
    const timeoutId = ref(0)

    // const doctorId = useLocalStorage('doctor_id')
    // const doctor = useLocalStorage('doctor')
    const closeModal = () => {
      setModalOpen(false)
    }

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
      closeModal,
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
  @media screen and (max-width: 576px) {
    padding: 1rem;
  }
}

.close-icon {
  position: absolute;
  top: 0.5rem;
  line-height: 0.7;
  left: 0;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;

  &:hover {
    color: gray;
  }
}
</style>
