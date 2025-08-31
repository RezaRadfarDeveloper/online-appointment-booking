<template>
  <div class="confirm-details">
    <h2>Appointment confirmation</h2>
    <section>
      <span>Doctor details:Marry chandler, GP</span>
      <span>Appointment Info: Thursday, 23 Sep 2025, 9:00 to 9:30</span>
      <span>Patients detail: Reza Radfar</span>
    </section>
    <div class="btn-action">
      <ButtonAction>Confirm</ButtonAction>
    </div>
    <router-link class="router-link" to="/">Not sure, Back to doctors list</router-link>
  </div>
</template>

<script>
import ButtonAction from '@/ui/ButtonAction.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    ButtonAction,
  },
  setup() {
    const router = useRouter()

    return {
      router,
    }
  },
}
</script>

<style scoped>
.confirm-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw;
  height: 60vh;
  padding: 1rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px 10px 10px 10px;
}

h2 {
  text-align: center;
}

span {
  display: block;
}
</style>
