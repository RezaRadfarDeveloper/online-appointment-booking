import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default function useStepperBar() {
  const route = useRoute()
  // const router = useRouter()
  const activeStep = computed(() => {
    if (route.path == '/') return 1
    else if (route.path == '/auth') return 2
    else if (route.path == '/confirmation') return 3
    else if (route.path == '/thank-you') return 4
    else {
      return 4
    }
  })

  return {
    activeStep,
  }
}
