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
        <span class="error" v-if="errors.password && !isPasswordValid">{{ errors.password }}</span>
      </div>
      <div class="user-box btn-action">
        <ButtonAction :isLoading="isLoading">
          {{ isLoading ? 'Registering...' : 'Sign up' }}
        </ButtonAction>
        <ToastAlert :message="error" />
      </div>
    </form>

    <router-link class="router-link" to="/">Back to doctors' list</router-link>
  </div>
</template>

<script>
import { useAuth } from '@/hooks/useAuth'
import ButtonAction from '@/ui/ButtonAction.vue'
import { ref, computed } from 'vue'
import ToastAlert from '../ToastAlert.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    ButtonAction,
    ToastAlert,
  },
  emits: ['signedUp'],

  setup() {
    const { isLoading, isLoggedIn, error, user, signUp } = useAuth()
    const router = useRouter()

    const form = {
      username: ref(''),
      email: ref(''),
      password: ref(''),
    }

    const errors = ref({})

    const isUsernameValid = computed(() => form.username.value.trim() !== '')
    const isEmailValid = computed(() => form.email.value.includes('@'))
    const isPasswordValid = computed(() => form.password.value.trim(''))

    const validateField = (fieldName) => {
      if (fieldName === 'username' && !isUsernameValid.value) {
        errors.value.username = 'Username is required.'
      }

      if (fieldName === 'email' && !isEmailValid.value) {
        errors.value.email = 'Invalid email address.'
      }

      if (fieldName === 'password' && !isPasswordValid.value) {
        errors.value.password = 'password is required.'
      }
    }

    const submitForm = async () => {
      errors.value = {}
      validateField('username')
      validateField('email')
      validateField('password')

      if (Object.keys(errors.value).length === 0) {
        await signUp({ email: form.email.value, password: form.password.value })
        router.push('/confirmation')
      } else {
        console.log('Form has validation errors. Please correct them.')
      }
    }

    return {
      form,
      isUsernameValid,
      // isMobileValid,
      isPasswordValid,
      isEmailValid,
      error,
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
