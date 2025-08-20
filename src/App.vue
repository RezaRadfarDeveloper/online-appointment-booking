<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',

  computed: {
    auth() {
      return this.$store.getters.auth
    },
    user() {
      return this.$store.getters['user/getUsers']
    },
  },
}
</script>

<style>
#app {
  display: block;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}
</style>
