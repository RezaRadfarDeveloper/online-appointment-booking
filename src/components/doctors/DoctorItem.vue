<template>
  <div class="doctorItem" @click="selectDoctor">
    <div class="doctorItem__item--details">
      <div class="doctorItem__item--details-img">
        <img src="/src/assets/img/doctor-image.png" alt="" srcset="" />
      </div>
      <div class="doctorItem__item--details-info">
        <h3>DR. {{ doctor.fullName }}</h3>
        <p>{{ doctor.expertise }}</p>
      </div>
    </div>
    <div class="doctor__item--actions" :style="{ display: !activeAction ? 'none' : '' }">
      <a href="">Profile</a>
      <a href="">Book</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorItem',
  props: ['doctor', 'activeAction'],
  emits: ['select-doctor'],
  methods: {
    selectDoctor() {
      this.$emit('select-doctor', this.doctor.id)
    },
  },
}
</script>

<style scoped>
.doctorItem {
  cursor: pointer;
  width: 25rem;
  align-self: center;
  padding: 0.75rem 1.5rem;
  background-color: #f9f9f9;
}
.doctorItem__item--details-img {
  width: 80px;
  border: none;
  height: 80px;
  margin-right: 2rem;
}
.doctorItem__item--details-info {
}
.doctorItem__item--details {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
}

img {
  object-fit: cover;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

h3 {
  color: rgb(27, 27, 27);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5em;
  margin: 0px 0px 16px;
  margin-bottom: 2px;
}
p {
  font-family: MessinaSansWeb, Arial, sans-serif;
  color: rgb(0, 0, 0);
  font-size: 1rem;
  text-align: center;
}

a {
  font-family: MessinaSansWeb, Arial, sans-serif;
  transition-duration: 200ms;
  transition-property:
    filter, transform, color, background-color, box-shadow, border-color, opacity;
  cursor: pointer;
  user-select: none;
  align-items: center;
  box-sizing: border-box;
  flex-direction: row;
  font-size: 14px;
  justify-content: center;
  text-decoration: none;
  white-space: nowrap;
  border: 2px solid rgb(238, 238, 238);
  color: rgb(4, 131, 140);
  background-color: rgb(255, 255, 255);
  border-radius: 24px;
  display: flex;
  font-weight: 600;
  height: 36px;
  padding: 0px 16px;
  margin-bottom: 3px;
  width: 100%;
}
a:nth-child(2) {
  color: rgb(255, 255, 255);
  background-color: rgb(4, 131, 140);
}
</style>
