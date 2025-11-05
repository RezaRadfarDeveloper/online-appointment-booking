<template>
  <BaseLayout>
    <h2>Thank you!!!</h2>
    <router-link class="router-link" to="/" @click.native="handleNavigation"
      >Back to home</router-link
    >
  </BaseLayout>
</template>
<script>
import useStepperBar from '@/hooks/useStepperBar'
import BaseLayout from '@/ui/BaseLayout.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    BaseLayout,
  },
  setup() {
    const { setStep, previousStep } = useStepperBar(4)
    const router = useRouter()

    const handleNavigation = () => {
      console.log('thank you')
      setStep(3)
      previousStep()
      router.push('/')
    }
    return {
      router,
      handleNavigation,
    }
  },
}
</script>
