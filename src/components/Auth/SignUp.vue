<template>
  <div class="form-card">
    <form @submit.prevent="submitForm" novalidate>
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="form.username.value"
          @blur="validateField('username')"
        />
        <span class="error" v-if="errors.username && !isUsernameValid">{{ errors.username }}</span>

        <label for="email">Email:</label>
        <input
          type="email"
          required="false"
          id="email"
          v-model="form.email.value"
          @blur="validateField('email')"
        />
        <span class="error" v-if="errors.email && !isEmailValid">{{ errors.email }}</span>

        <label for="mobile">mobile:</label>
        <input
          type="text"
          id="mobile"
          v-model="form.mobile.value"
          @blur="validateField('mobile')"
        />
        <span class="error" v-if="errors.mobile && !isMobileValid">{{ errors.mobile }}</span>
      </div>

      <button type="submit">Sign up</button>
      <router-link to="/">main page</router-link>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()

    const form = {
      username: ref(''),
      email: ref(''),
      mobile: ref(''),
      // Add more form fields as needed
    }
    const errors = ref({})

    const isUsernameValid = computed(() => form.username.value.trim() !== '')
    const isMobileValid = computed(() => form.mobile.value !== '')
    const isEmailValid = computed(() => form.email.value.includes('@'))

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

      // Add more validation checks for other form fields as needed
    }
    const submitForm = () => {
      errors.value = {}
      // Clear previous errors
      validateField('username')
      validateField('email')
      validateField('mobile')

      // Add more validation checks for other form fields as needed

      if (Object.keys(errors.value).length === 0) {
        //if no errors are found
        // Validation passed, handle form submission
        console.log('Form submitted successfully!', form)
        // Add logic to send data to the server if needed
        router.push('/confirmation')
      } else {
        console.log('Form has validation errors. Please correct them.')
      }
    }

    return { form, isUsernameValid, isMobileValid, isEmailValid, errors, submitForm, validateField }
  },
}
</script>

<style scoped>
.form-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;

  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
