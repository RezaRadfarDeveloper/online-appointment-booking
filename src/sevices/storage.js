import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import { useAuth } from '@/hooks/useAuth'
import useLocalStorage from '@/hooks/useLocalStorage'

const { setDoctor, setDoctorId, setFormattedDate, setWeekDay, selectAppointment, selectDate } =
  useAppointmentDetails()
const { setIsLoggedIn, setUser } = useAuth()

const doctorId = useLocalStorage('doctor_id')
const doctor = useLocalStorage('doctor')
const weekDay = useLocalStorage('appointment_week_day')
const date = useLocalStorage('date')
const dateFormatted = useLocalStorage('appointment_formatted_date')
const selectedAppointment = useLocalStorage('selected_appointment')
const isLoggedIn = useLocalStorage('is_loggedIn')
const user = useLocalStorage('user')

export function readLocalStorage() {
  setDoctorId(doctorId.value)
  setDoctor(doctor.value)
  selectDate(date.value)
  setWeekDay(weekDay.value)
  setFormattedDate(dateFormatted.value)
  selectAppointment(selectedAppointment.value)
  setIsLoggedIn(isLoggedIn.value)
  setUser(user.value)
  console.log('islogged in in app', isLoggedIn.value)
}

export function clearLocalStorage() {
  doctorId.value = null
  doctor.value = null
  weekDay.value = null
  date.value = null
  dateFormatted.value = null
  selectedAppointment.value = null

  setDoctorId(null)
  setDoctor(null)
  selectDate(null)
  setWeekDay(null)
  setFormattedDate(null)
  selectAppointment(null)
}
