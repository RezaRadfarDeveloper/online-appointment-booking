<template>
  <div class="progressbar-steps">
    <div class="progressbar-step" v-for="item in 3" :key="item">
      <button
        class="progressbar-step-button"
        :class="{ active: activeStep == item, completed: activeStep > item }"
      >
        <span class="progressbar-step-indicator">
          <span v-if="activeStep > item" class="checked-icon"><CheckSvg /></span>
          <span v-else class="number">{{ item }}</span>
        </span>
        <span class="progressbar-step-label"> Step {{ item }}</span>
      </button>
      <div class="progressbar-step-connector"></div>
    </div>
  </div>
</template>

<script>
import useStepperBar from '@/hooks/useStepperBar'
import CheckSvg from './icons/CheckSvg.vue'
import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import { useRoute } from 'vue-router'

export default {
  components: {
    CheckSvg,
  },
  setup() {
    // const router = useRouter()
    const { activeStep } = useStepperBar()

    onMounted(() => {
      console.log(activeStep, 'mounted')
    })
    return {
      activeStep,
    }
  },
}
</script>
<style scoped>
.progressbar-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 5px;
}

.progressbar-step-button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #252b36ae;
  font-size: 1rem;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border: 0;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
}

.progressbar-step-button.active .progressbar-step-indicator {
  color: var(--background-color-ternary);
  border-color: var(--background-color-ternary);
  background-color: var(--connector-color);
}

.checked-icon {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  transition: all 1s ease-in-out;
}

.progressbar-step-button.completed .checked-icon {
  opacity: 1;
  transform: scale(1);
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
}

.progressbar-step-button.completed .progressbar-step-indicator {
  color: white;
  border-color: var(--background-color-ternary);
  background-color: var(--background-color-ternary);
}

.progressbar-step-button.completed ~ .progressbar-step-connector {
  background-color: var(--background-color-ternary);
}

.progressbar-step {
  display: flex;
  position: relative;
  align-items: center;
  gap: 0.5rem;
  &:not(:last-child) {
    flex: 1;
  }
}
.progressbar-step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7785;
  height: 2rem;
  width: 2rem;
  border: 1px solid gray;
  border-radius: 30rem;
  background: transparent;
  transition:
    color 1s ease-in-out,
    background-color 1s ease-in-out,
    border-color 1s ease-in-out,
    box-shadow 1s ease-in-out;
}
.progressbar-step-connector {
  flex: 1;
  height: 2px;
  background: gray;
  transition: background-color 1s ease-in-out;
}

.progressbar-step-label {
  color: #6b7785;
}
.progressbar-step-button.active,
.progressbar-step-button.completed .progressbar-step-label {
  color: var(--background-color-ternary);
}
.progressbar-step-button.completed .progressbar-step-label {
  font-weight: 600;
}
</style>
