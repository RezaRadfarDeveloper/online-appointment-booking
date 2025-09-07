<template>
  <div class="appointmentsList">
    <loader-icon v-if="isLoading || initialLoading">Loading ...</loader-icon>
    <appointment-item
      v-else
      v-for="appointment in availableAppointments"
      :appointment="appointment"
      :key="appointment.id"
      :isAvailable="isAvailableSession(appointment.id)"
    ></appointment-item>
  </div>
</template>
<script>
import LoaderIcon from '@/ui/LoaderIcon.vue'
import AppointmentItem from './AppointmentItem.vue'
import data from '@/data'
import { computed, onMounted, ref } from 'vue'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
export default {
  components: {
    AppointmentItem,
    LoaderIcon,
  },
  props: ['doctor', 'isLoading'],

  setup(props) {
    const { dayOfWeek } = useAppointmentDetails()
    const appointments = ref(data.appointments)
    const selectedAppointment = ref(null)
    const timeoutId = ref(0)
    const initialLoading = ref(false)

    const availableAppointments = computed(() => {
      return appointments.value
    })

    // const isAvailableSession = computed(
    //   () => (appointmentId) =>
    //     JSON.parse(props.doctor.appointmentsPerWeek)?.[props.selectedWeekDay]?.includes(
    //       appointmentId,
    //     ),
    // )
    const isAvailableSession = computed(() => {
      return (appointmentId) => {
        return JSON.parse(props.doctor.appointmentsPerWeek)?.[dayOfWeek.value || 'Mon']?.includes(
          appointmentId,
        )
      }
    })

    const selectAppointment = (appointment) => {
      selectedAppointment.value = appointment
    }

    onMounted(() => {
      initialLoading.value = true
      clearTimeout(timeoutId.value)

      timeoutId.value = setTimeout(() => {
        initialLoading.value = false
      }, 500)
    })

    return {
      isAvailableSession,
      availableAppointments,
      initialLoading,
      selectAppointment,
    }
  },
  // data() {
  //   return {
  //     appointments: data.appointments,
  //     selectedAppointment: null,
  //     timeoutId: 0,
  //     initialLoading: false,
  //   }
  // },
  // computed: {
  //   availableAppointments() {
  //     return this.appointments
  //   },
  //   isAvailableSession() {
  //     return (appointmentId) => {
  //       return JSON.parse(this.doctor.appointmentsPerWeek)?.[this.selectedWeekDay]?.includes(
  //         appointmentId,
  //       )
  //     }
  //   },
  // },

  // methods: {
  //   selectAppointment(appointment) {
  //     this.selectedAppointment = appointment
  //   },
  // },
  // mounted() {
  //   this.initialLoading = true
  //   clearTimeout(this.timeoutId)

  //   this.timeoutId = setTimeout(() => {
  //     this.initialLoading = false
  //   }, 500)
  // },
}
</script>

<style scoped>
.appointmentsList {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 1rem;
  column-gap: 1rem;
}
</style>
