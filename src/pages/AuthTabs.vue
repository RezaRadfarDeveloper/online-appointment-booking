<template>
  <div class="auth-tab">
    <div class="tabs">
      <button class="tab" @click="activeTab = 'signIn'" :class="{ active: activeTab === 'signIn' }">
        Sign In
      </button>
      <button class="tab" @click="activeTab = 'signUp'" :class="{ active: activeTab === 'signUp' }">
        Sign Up
      </button>
    </div>
    <div class="form-container">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'signIn'">
          <SignInForm @signedIn="handleSignedIn" />
        </div>
        <div v-else-if="activeTab === 'signUp'">
          <SignUpForm @signedUp="handleSignedUp" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SignInForm from '@/components/Auth/SignIn.vue'
import SignUpForm from '@/components/Auth/SignUp.vue'

defineEmits(['signedUp'])
const activeTab = ref('signIn')

const handleSignedIn = () => {
  console.log('User signed in!')
  // Redirect or perform other actions
}

const handleSignedUp = () => {
  console.log('User signed up!')
  // Redirect or perform other actions
  activeTab.value = 'signIn' // Optionally switch to sign-in after sign-up
}
</script>

<style scoped>
.auth-tab {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tabs {
  display: flex;
}

.tabs button {
  width: 15rem;
  height: 3.5rem;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  padding: 10px 15px;
  color: rgb(4, 131, 140);
  background-color: white;
  border: 1px solid rgb(4, 131, 140);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  cursor: pointer;
}

.tabs button.active {
  background-color: rgb(4, 131, 140);
  /*  #84c9ff; */
  border-bottom-color: transparent;
  color: white;
}

.form-container {
  width: 100%;
  height: 24rem;
  border: 1px solid gray;
  border-radius: 0 0 10px 10px;
}
</style>
