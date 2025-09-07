<template>
  <VueDatePicker v-model="date" @date-update="setDate" ref="datepicker"></VueDatePicker>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'

export default {
  components: { VueDatePicker },
  props: {
    doctorId: String,
  },
  emits: ['setWeekdayDate', 'toggleLoader'],

  setup(props, { emit }) {
    const { selectAppointment, setFormattedDate, setWeekDay } = useAppointmentDetails()
    const date = ref(new Date())
    const datepicker = ref(null)

    onMounted(() => {})
    const weekDay = computed(() => {
      return format(date.value, 'EEE')
    })
    const dateFormatted = computed(() => {
      return format(date.value, 'd MMMM yyyy')
    })

    const setDate = (d) => {
      //resetting selected appointment by date change as it might be available for the new date
      selectAppointment(null)
      datepicker.value.closeMenu()
      date.value = d
      setWeekDay(weekDay.value)
      setFormattedDate(dateFormatted.value)

      emit('toggleLoader')
    }

    return {
      date,
      datepicker,
      dateFormatted,
      setDate,
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
