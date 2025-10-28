<template>
  <VueDatePicker
    v-model="date"
    @date-update="setDate"
    ref="datepicker"
    :enable-time-picker="false"
    :min-date="new Date()"
    :max-date="addMonths(new Date(), 1)"
    hide-offset-dates
  ></VueDatePicker>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { addMonths, format } from 'date-fns'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import useLocalStorage from '@/hooks/useLocalStorage'

export default {
  components: { VueDatePicker },
  props: {
    doctorId: String,
  },
  emits: ['toggleLoader'],

  setup(props, { emit }) {
    const { selectAppointment, setFormattedDate, setWeekDay, selectedDate, selectDate } =
      useAppointmentDetails()
    const date = ref(selectedDate.value)
    const datepicker = ref(null)

    const weekDay = computed(() => {
      return format(date.value, 'EEE')
    })
    const dateFormatted = computed(() => {
      return format(date.value, 'd MMMM yyyy')
    })

    const setDate = (d) => {
      const weekDayStorage = useLocalStorage('appointment_week_day')
      const formattedDateStorage = useLocalStorage('appointment_formatted_date')
      const dateLocalstorage = useLocalStorage('date')
      //resetting selected appointment session when date changes as it might not be available for the new date
      selectAppointment(null)
      datepicker.value.closeMenu()
      date.value = d

      dateLocalstorage.value = d
      selectDate(d)
      setWeekDay(weekDay.value)
      setFormattedDate(dateFormatted.value)
      weekDayStorage.value = weekDay.value
      formattedDateStorage.value = dateFormatted.value
      emit('toggleLoader')
    }

    onMounted(() => {
      setDate(selectedDate.value ? selectedDate.value : new Date())
    })

    return {
      date,
      datepicker,
      dateFormatted,
      setDate,
      addMonths,
    }
  },
}
</script>

<style>
.dp__cell_inner {
  border-radius: 50px;
  border: none;
}
.dp__active_date {
  background-color: rgb(4, 131, 140);
}
.dp__month_year_select {
  color: rgb(4, 131, 140);
}
.dp__action_button.dp__action_select {
  background-color: rgb(4, 131, 140);
  &:hover {
    background-color: rgb(180, 66, 9);
  }
}
</style>
