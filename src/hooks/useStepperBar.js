import { ref } from 'vue'

const currentStep = ref(1)
const step = ref(1)

export default function useStepperBar(stepsCount) {
  const nextStep = () => {
    currentStep.value = currentStep.value + step.value
  }
  const previousStep = () => {
    currentStep.value = currentStep.value - step.value
  }
  const setStep = (val) => (step.value = val)

  return {
    currentStep,
    nextStep,
    previousStep,
    setStep,
  }
}
