<template>
  <div class="doctorItem" @click="selectDoctor">
    <h2>{{ doctor.fullName }}</h2>
    <h4>{{ doctor.expertise }}</h4>
    <p>{{ doctor.address }}</p>
  </div>
</template>

<script>
export default {
  name: "DoctorItem",
  props: ["doctor"],
  emits: ["select-doctor"],
  methods: {
    selectDoctor() {
      this.$emit("select-doctor", this.doctor.id);
    },
  },
};
</script>

<style scoped>
.doctorItem {
  cursor: pointer;
}
</style>
