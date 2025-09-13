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

export default {
  components: { VueDatePicker },
  props: {
    doctorId: String,
  },
  emits: ['toggleLoader'],

  setup(props, { emit }) {
    const { selectAppointment, setFormattedDate, setWeekDay } = useAppointmentDetails()
    const date = ref(null)
    const datepicker = ref(null)

    const weekDay = computed(() => {
      return format(date.value, 'EEE')
    })
    const dateFormatted = computed(() => {
      return format(date.value, 'd MMMM yyyy')
    })

    const setDate = (d) => {
      //resetting selected appointment when date changes as it might not be available for the new date
      selectAppointment(null)
      datepicker.value.closeMenu()
      date.value = d
      setWeekDay(weekDay.value)
      setFormattedDate(dateFormatted.value)
      emit('toggleLoader')
    }

    onMounted(() => {
      setDate(new Date())
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
