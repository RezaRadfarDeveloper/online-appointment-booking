<template>
  <div class="container">
    <header>
      <ProgressBar />
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
  },
  setup() {
    return {}
  },
}
</script>
