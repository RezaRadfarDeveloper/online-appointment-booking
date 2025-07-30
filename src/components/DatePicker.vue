<template>
  <VueDatePicker v-model="date" :clearable="true"></VueDatePicker>
  {{ weekDay }}
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from 'date-fns'

export default {
  components: { VueDatePicker },
  setup() {
    const date = ref(new Date())
    onMounted(() => {})
    const weekDay = computed(() => {
      return format(date.value, 'EEE')
    })
    return {
      date,
      weekDay,
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
