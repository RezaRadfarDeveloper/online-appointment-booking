<template>
  <div class="form-card">
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <span class="error" v-if="errors.username && !isUsernameValid">{{
          errors.username
        }}</span>
        <input
          type="text"
          id="username"
          v-model="form.username.value"
          @blur="validateField('username')"
        />

        <label for="email">Email:</label>
        <span class="error" v-if="errors.email && !isEmailValid">{{
          errors.email
        }}</span>
        <input
          type="email"
          id="email"
          v-model="form.email.value"
          @blur="validateField('email')"
        />

        <label for="mobile ">mobile:</label>
        <span class="error" v-if="errors.mobile && !isMobileValid">{{
          errors.mobile
        }}</span>
        <input
          type="text"
          id="mobile"
          v-model="form.mobile.value"
          @blur="validateField('mobile')"
        />
      </div>
      <!-- Add more form fields with onBlur validation -->

      <button type="submit">Submit</button>
      <router-link to="/">main page</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const form = {
  username: ref(""),
  email: ref(""),
  mobile: ref(""),
  // Add more form fields as needed
};

const errors = ref({});

const isUsernameValid = computed(() => form.username.value.trim() !== "");
const isMobileValid = computed(() => form.mobile.value !== "");
const isEmailValid = computed(() => form.email.value.includes("@"));

const validateField = (fieldName) => {
  errors.value[fieldName] = "";
  if (fieldName === "username" && !isUsernameValid.value) {
    errors.value.username = "Username is required.";
  }
  if (fieldName === "email" && !isEmailValid.value) {
    errors.value.email = "Invalid email address.";
  }
  if (fieldName === "mobile" && !isMobileValid.value) {
    errors.value.mobile = "Mobile is required.";
  }
  // Add more validation checks for other form fields as needed
};

const submitForm = () => {
  errors.value = {}; // Clear previous errors
  validateField("username");
  validateField("email");
  validateField("mobile");
  // Add more validation checks for other form fields as needed

  if (Object.keys(errors.value).length === 0) {
    //if no errors are found
    // Validation passed, handle form submission
    console.log("Form submitted successfully!", form);
    // Add logic to send data to the server if needed
  } else {
    console.log("Form has validation errors. Please correct them.");
  }
};
</script>

<style scoped>
.form-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;

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
