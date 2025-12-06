<template>
  <BaseLayout>
    <div class="thank-you">
      <h2>Thank you for choosing us.</h2>
    </div>
    <!-- <router-link class="router-link" to="/" @click.native="handleNavigation"
      >Back to home</router-link
    > -->
  </BaseLayout>
</template>
<script>
// import useStepperBar from '@/hooks/useStepperBar'
import BaseLayout from '@/ui/BaseLayout.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    BaseLayout,
  },
  setup() {
    // const { setStep, previousStep } = useStepperBar(4)
    const router = useRouter()

    // const handleNavigation = () => {
    //   console.log('thank you')
    //   setStep(3)
    //   previousStep()
    //   router.push('/')
    // }
    return {
      router,
      // handleNavigation,
    }
  },
}
</script>

<style scoped>
.thank-you {
  display: flex;
  height: 60vh;
  width: 60vw;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 1.6rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }
}
</style>
