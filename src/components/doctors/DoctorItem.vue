<template>
  <div class="doctorItem" @click="selectDoctor(doctor.id)">
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
      <!-- <a href="">Profile</a> -->
      <a href="">Book</a>
    </div>
  </div>
</template>

<script>
import { useAppointmentDetails } from '@/hooks/useAppointmentDetails'
import useLocalStorage from '@/hooks/useLocalStorage'

export default {
  name: 'DoctorItem',
  props: {
    doctor: Object,
    activeAction: Boolean,
  },

  setup(props) {
    const { setDoctor, setDoctorId, setModalOpen } = useAppointmentDetails()

    const selectDoctor = (id) => {
      const doctorId = useLocalStorage('doctor_id')
      const doctor = useLocalStorage('doctor')

      setDoctor(props.doctor)
      setDoctorId(id)
      doctorId.value = id
      doctor.value = props.doctor
      setModalOpen(true)
    }

    return {
      selectDoctor,
    }
  },
}
</script>

<style scoped>
.doctorItem {
  cursor: pointer;
  width: 25rem;
  align-self: center;
  padding: 1rem 1.5rem;
  background-color: rgba(var(--background-color-secondary));
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
  color: var(--text-primary-color);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5em;
  margin: 0px 0px 16px;
  margin-bottom: 2px;
}
p {
  font-family: MessinaSansWeb, Arial, sans-serif;
  color: var(--text-secondary-color);
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
  color: rgb(255, 255, 255);
  background-color: rgb(4, 131, 140);
  border-radius: 24px;
  display: flex;
  font-weight: 600;
  height: 36px;
  padding: 0px 16px;
  margin: 9px 0;
  width: 100%;
}
/* a:nth-child(2) {
  color: rgb(255, 255, 255);
  background-color: rgb(4, 131, 140);
} */
</style>
