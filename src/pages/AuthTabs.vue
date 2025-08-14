<template>
  <div>
    <div class="tabs">
      <button @click="activeTab = 'signIn'" :class="{ active: activeTab === 'signIn' }">
        Sign In
      </button>
      <button @click="activeTab = 'signUp'" :class="{ active: activeTab === 'signUp' }">
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
.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 15px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tabs button.active {
  background-color: #e0e0e0;
  border-bottom-color: transparent;
}

.form-container {
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
