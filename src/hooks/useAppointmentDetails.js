import { supabase } from '@/supabase'
import { ref } from 'vue'

const localAvailableDoctors = ref([])
const selectedDoctor = ref(null)
const selectedAppointment = ref(null)
const formattedDate = ref(null)
const dayOfWeek = ref(null)
const page = ref(1)
const range = 4
const loading = ref(false)

export function useAppointmentDetails() {
  const noMoreContent = ref(false)
  const bottomSentinel = ref(null) // Reference to the element at the bottom

  const setDoctor = (doctorId) => {
    selectedAppointment.value = null
    selectedDoctor.value = localAvailableDoctors.value.find((doctor) => doctor.id === doctorId)
  }

  const selectAppointment = (appointment) => {
    selectedAppointment.value = appointment
  }

  const setFormattedDate = (date) => {
    formattedDate.value = date
  }

  const setWeekDay = (day) => {
    dayOfWeek.value = day
  }

  const fetchDoctors = async () => {
    if (loading.value || noMoreContent.value) return

    loading.value = true

    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .range((page.value - 1) * range, page.value * range - 1)

    if (error) {
      console.log(error)
    }
    if (data.length === 0) {
      noMoreContent.value = true
    } else {
      localAvailableDoctors.value.push(...data)
      page.value++
    }
    loading.value = false
  }

  return {
    localAvailableDoctors,
    formattedDate,
    dayOfWeek,
    setWeekDay,
    setDoctor,
    selectAppointment,
    setFormattedDate,
    selectedDoctor,
    selectedAppointment,
    noMoreContent,
    fetchDoctors,
    bottomSentinel,

    loading,
  }
}
