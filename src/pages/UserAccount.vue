<template>
  <BaseLayout>
    <div>
      <div v-if="isLoading" class="loader-zone"><LoaderIcon /></div>
      <div v-else class="booking-list">
        <BookingItem
          :appointment="appointment"
          v-for="appointment in appointments"
          :key="appointment.id"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BookingItem from '@/components/bookings/BookingItem.vue'
import { useBooking } from '@/hooks/useBooking'
import useLocalStorage from '@/hooks/useLocalStorage'
import BaseLayout from '@/ui/BaseLayout.vue'
import LoaderIcon from '@/ui/LoaderIcon.vue'
import { onActivated, onDeactivated, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    BookingItem,
    LoaderIcon,
    BaseLayout,
  },
  setup() {
    const appointments = ref(null)
    // const { user } = useAuth()
    const user = useLocalStorage('user')
    const router = useRouter()
    const { fetchUserBookedAppointments } = useBooking()
    const isLoading = ref(false)

    onDeactivated(() => console.log('Account deactivated'))
    onActivated(async () => {
      isLoading.value = true
      console.log(user.value.id)

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
  height: 70vh;
  align-items: center;
  overflow-y: auto;
  gap: 2rem;
  padding: 5rem;
  margin-top: 4rem;

  @media screen and (max-width: 576px) {
    padding: 3rem 1.5rem;
  }
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
