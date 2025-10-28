import { supabase } from '@/supabase'
import { useAppointmentDetails } from './useAppointmentDetails'
import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

const bookedAppointments = ref(null)

export function useBooking() {
  const { selectedDoctor, selectedDoctorId, dayOfWeek, formattedDate, selectedAppointment } =
    useAppointmentDetails()
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

  const fetchBookedAppointment = async (id) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_details')
      .eq('doctor_id', id)

    if (error) {
      throw new Error('Failed to fetch booked appointments for this doctor')
    }
    bookedAppointments.value = data

    return data
  }

  const fetchUserBookedAppointments = async (userId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_details, doctors(fullName, expertise,address)')
      .eq('patient_id', userId)

    if (error) {
      throw new Error('Failed to fetch booked appointments for you')
    }

    return data
  }

  watch(
    selectedDoctorId,
    async () => {
      if (!selectedDoctorId.value) return
      const appointments = await fetchBookedAppointment(selectedDoctorId.value)
      bookedAppointments.value = appointments.map((appointment) => {
        return appointment.booking_details
      })
    },
    { immediate: true },
  )

  return {
    bookAppointment,
    fetchBookedAppointment,
    fetchUserBookedAppointments,
    bookedAppointments,
    isLoading,
  }
}
