<template>
  <div class="login-box">
    <h2>Login</h2>
    <form @submit.prevent="AuthLogin">
      <div class="user-box">
        <input type="email" name="" v-model="email" required="" />
        <label>Email</label>
      </div>
      <div class="user-box">
        <input type="password" name="" v-model="password" required="" />
        <label>Password</label>
      </div>
      <div class="user-box btn-action">
        <ButtonAction :isLoading="isLoading">
          <span v-if="isLoading"><MiniLoaderIcon /></span>
          <span v-else><p class="loading">Login</p></span>
        </ButtonAction>
        <ToastAlert :message="err" />
      </div>
    </form>
    <router-link class="router-link" @click.native="previousStep" to="/"
      >Back to doctors' list</router-link
    >
  </div>
</template>
<script>
import { useAuth } from '@/hooks/useAuth'
import ButtonAction from '@/ui/ButtonAction.vue'
import ToastAlert from '@/components/ToastAlert.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStepperBar from '@/hooks/useStepperBar'
import MiniLoaderIcon from '@/ui/MiniLoaderIcon.vue'

export default {
  components: {
    ButtonAction,
    MiniLoaderIcon,
    ToastAlert,
  },
  setup() {
    const { login, err, isLoading, isLoggedIn } = useAuth()
    const { nextStep, previousStep, setStep } = useStepperBar(4)

    const router = useRouter()

    const email = ref('')
    const password = ref('')

    const AuthLogin = async () => {
      await login({ email: email.value, password: password.value })

      setStep(1)
      nextStep()
      email.value = ''
      password.value = ''
      router.push('/confirmation')
    }

    return {
      AuthLogin,
      email,
      password,
      router,
      previousStep,
      isLoading,
      err,
      isLoggedIn,
    }
  },
}
</script>
<style>
.login-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 24rem;
  padding: 40px;
  background: white;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 0px 0px 10px 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #7d7c7b;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #7d7c7b;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #7d7c7b;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #7d7c7b;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #7d7c7b;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #7d7c7b;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.btn-action {
  text-align: center;
  margin-top: 1rem;
}
.router-link {
  align-self: center;
  margin-top: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  margin: 1.75px;
}
</style>
