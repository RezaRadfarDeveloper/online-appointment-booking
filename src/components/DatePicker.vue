<template>
  <VueDatePicker v-model="date" @date-update="setDate" ref="datepicker"></VueDatePicker>
  {{ weekDay }}
  {{ doctorId }}
  {{ selectedDate }}
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'
import data from '@/data'

export default {
  components: { VueDatePicker },
  props: {
    doctorId: String,
  },
  emits: ['setWeekdayDate'],

  setup(props, { emit }) {
    const date = ref(new Date())
    const selectedDate = ref(null)
    const datepicker = ref(null)

    onMounted(() => {})
    const weekDay = computed(() => {
      return format(date.value, 'EEE')
    })
    const dateFormatted = computed(() => {
      return format(date.value, 'd MMMM yyyy')
    })
    // No needed anymore
    const appointments = computed(() => {
      return data.doctors.find((doctor) => doctor.id == props.doctorId)?.appointmentsPerWeek[
        weekDay.value
      ]
    })

    const setDate = (d) => {
      date.value = d
      selectedDate.value = d
      datepicker.value.closeMenu()
      emit('setWeekdayDate', { day: weekDay.value, formattedDate: dateFormatted.value })
      console.log(dateFormatted.value)

      console.log(appointments.value)
    }

    return {
      date,
      weekDay,
      datepicker,
      selectedDate,
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
  background-color: rgb(73, 217, 75);
}
.dp__month_year_select {
  color: rgb(73, 217, 75);
}
.dp__action_button.dp__action_select {
  background-color: rgb(65, 181, 67);
  &:hover {
    background-color: rgb(180, 66, 9);
  }
}
</style>
