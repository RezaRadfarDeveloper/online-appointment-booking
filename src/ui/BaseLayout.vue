<template>
  <div class="container">
    <header>
      <NavBar />
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
import NavBar from '@/components/NavBar.vue'
import ProgressBar from '@/components/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
    NavBar,
  },
  setup() {
    return {}
  },
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
