<template>
  <div class="doctorsList">
    <h2>doctors list</h2>
    <doctor-item
      v-for="doctor in doctors"
      :key="doctor.id"
      :doctor="doctor"
      @select-doctor="$emit('select-doctor', $event)"
    ></doctor-item>
  </div>
</template>

<script>
import DoctorItem from "./DoctorItem.vue";

export default {
  components: { DoctorItem },
  props: ["doctors"],
};
</script>

<style scoped>
.doctorsList {
  flex: 0 0 50%;
}
</style>
