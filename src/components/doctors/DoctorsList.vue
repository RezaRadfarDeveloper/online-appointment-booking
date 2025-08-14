<template>
  <div class="doctorsList">
    <h2>doctors list</h2>
    <div v-if="isLoading" class="noData">Loading Doctors...</div>
    <doctor-item
      v-for="doctor in doctors"
      v-else
      :key="doctor.id"
      :doctor="doctor"
      @select-doctor="$emit('select-doctor', $event)"
    ></doctor-item>
  </div>
</template>

<script>
import DoctorItem from './DoctorItem.vue'

export default {
  components: { DoctorItem },
  props: ['doctors', 'isLoading'],

  setup() {},
}
</script>

<style scoped>
.doctorsList,
.noData {
  flex: 0 0 1;
  display: flex;
  padding: 0.4rem 1rem;
  height: 80vh;
  flex-direction: column;
  overflow: scroll;
  gap: 5px;
  width: 27rem;
}
</style>
