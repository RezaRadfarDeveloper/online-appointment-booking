<template>
  <button :disabled="isLoading" class="submit" type="submit" :class="isLoading ? 'inActive' : ''">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['isLoading'],
  setup() {},
}
</script>
<style scoped>
.submit {
  width: 20rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  border: none;
  background-color: #ff8c00;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.inActive {
  cursor: not-allowed;
  background-color: #b0aeae;
}
</style>
