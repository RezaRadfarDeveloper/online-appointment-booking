<template>
  <div class="login-box">
    <h2>Register</h2>
    <form @submit.prevent="submitForm" novalidate>
      <div class="user-box">
        <input
          type="text"
          id="username"
          required=""
          v-model="form.username.value"
          @blur="validateField('username')"
        />
        <label>Username</label>

        <span class="error" v-if="errors.username && !isUsernameValid">{{ errors.username }}</span>
      </div>
      <div class="user-box">
        <input
          type="email"
          required=""
          id="email"
          v-model="form.email.value"
          @blur="validateField('email')"
        />
        <label>Email</label>
        <span class="error" v-if="errors.email && !isEmailValid">{{ errors.email }}</span>
      </div>
      <div class="user-box">
        <input
          type="password"
          required=""
          id="password"
          v-model="form.password.value"
          @blur="validateField('password')"
        />
        <label>password</label>
        <span class="error" v-if="errors.password && !true">{{ errors.password }}</span>
      </div>
      <div class="user-box">
        <input
          type="number"
          id="mobile"
          required=""
          v-model="form.mobile.value"
          @blur="validateField('mobile')"
        />
        <label>mobile</label>
        <span class="error" v-if="errors.mobile && !isMobileValid">{{ errors.mobile }}</span>
      </div>
      <div class="user-box">
        <button :disabled="isLoading" type="submit" :class="isLoading ? 'inActive' : ''">
          {{ isLoading ? 'Registering...' : 'Sign up' }}
        </button>
      </div>
      <router-link to="/">main page</router-link>
    </form>
  </div>
</template>

<script>
import { useAuth } from '@/hooks/useAuth'
import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
export default {
  setup() {
    const { isLoading, isLoggedIn, user, signUp } = useAuth()
    // const router = useRouter()

    const form = {
      username: ref(''),
      email: ref(''),
      mobile: ref(''),
      password: ref(''),
      // Add more form fields as needed
    }
    const errors = ref({})

    const isUsernameValid = computed(() => form.username.value.trim() !== '')
    const isMobileValid = computed(() => form.mobile.value !== '')
    const isEmailValid = computed(() => form.email.value.includes('@'))
    const isPasswordValid = computed(() => form.password.value.trim(''))

    const validateField = (fieldName) => {
      if (fieldName === 'username' && !isUsernameValid.value) {
        errors.value.username = 'Username is required.'
      }
      if (fieldName === 'email' && !isEmailValid.value) {
        errors.value.email = 'Invalid email address.'
      }
      if (fieldName === 'mobile' && !isMobileValid.value) {
        errors.value.mobile = 'Mobile is required.'
      }
      if (fieldName === 'password' && !isPasswordValid.value) {
        errors.value.password = 'password is required.'
      }
    }

    const submitForm = async () => {
      // Clear previous errors
      errors.value = {}
      validateField('username')
      validateField('email')
      validateField('mobile')
      validateField('password')

      // Add more validation checks for other form fields as needed

      if (Object.keys(errors.value).length === 0) {
        await signUp({ email: form.email.value, password: form.password.value })
        // router.push('/confirmation')
      } else {
        console.log('Form has validation errors. Please correct them.')
      }
    }

    return {
      form,
      isUsernameValid,
      isMobileValid,
      isEmailValid,
      errors,
      submitForm,
      validateField,
      isLoggedIn,
      isLoading,
      user,
    }
  },
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.inActive {
  cursor: not-allowed;
}
</style>
