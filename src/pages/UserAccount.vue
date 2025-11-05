<template>
  <div>
    <router-link class="router-link" to="/">Back to doctors' list</router-link>
    <div v-if="isLoading" class="loader-zone"><LoaderIcon /></div>
    <div v-else class="booking-list">
      <BookingItem
        :appointment="appointment"
        v-for="appointment in appointments"
        :key="appointment.id"
      />
    </div>
  </div>
</template>

<script>
import BookingItem from '@/components/bookings/BookingItem.vue'
import { useAuth } from '@/hooks/useAuth'
import { useBooking } from '@/hooks/useBooking'
import LoaderIcon from '@/ui/LoaderIcon.vue'
import { onActivated, onDeactivated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    BookingItem,
    LoaderIcon,
  },
  setup() {
    const appointments = ref(null)
    const { user } = useAuth()
    const router = useRouter()
    const { fetchUserBookedAppointments } = useBooking()
    const isLoading = ref(false)
    // onMounted(async () => {
    //   isLoading.value = true
    //   appointments.value = await fetchUserBookedAppointments(user.value.id)
    //   isLoading.value = false
    //   console.log(appointments.value)
    // })

    onDeactivated(() => console.log('Account deactivated'))
    onActivated(async () => {
      isLoading.value = true
      appointments.value = await fetchUserBookedAppointments(user.value.id)
      isLoading.value = false
      console.log(appointments.value)
    })
    return {
      appointments,
      isLoading,
      router,
    }
  },
}
</script>

<style scoped>
.booking-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 5rem;
}
.loader-zone {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  & > span {
    margin-top: 0;
  }
}
</style>
