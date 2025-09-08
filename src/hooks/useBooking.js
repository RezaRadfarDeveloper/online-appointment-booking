// import { supabase } from '@/supabase'
import { supabase } from '@/supabase'
import { useAppointmentDetails } from './useAppointmentDetails'
import { ref } from 'vue'
import { useAuth } from './useAuth'

export function useBooking() {
  const { selectedDoctor, dayOfWeek, formattedDate, selectedAppointment } = useAppointmentDetails()
  const { user } = useAuth()
  const isLoading = ref(false)

  const bookAppointment = async () => {
    const bookingDetails = `${dayOfWeek.value},${formattedDate.value},${selectedAppointment.value.title}`
    isLoading.value = true
    const { error } = await supabase.from('bookings').insert({
      patient_id: user.value.id,
      booking_details: bookingDetails,
      doctor_id: selectedDoctor.value.id,
    })
    if (error) {
      throw new Error('Failed to book')
    }
    isLoading.value = false
  }

  return {
    bookAppointment,
    isLoading,
  }
}
