<template>
  <div class="container">
    <header>
      <NavBar />
      <ProgressBar v-if="route.path != '/account'" />
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
import { useRoute } from 'vue-router'

export default {
  components: {
    ProgressBar,
    NavBar,
  },
  setup() {
    const route = useRoute()
    return {
      route,
    }
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
