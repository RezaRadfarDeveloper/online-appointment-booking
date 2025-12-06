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
  padding: 0.5rem 2rem;
  border-radius: 10px;
  border: none;
  background-color: var(--background-color-ternary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 15rem;
  }
  @media screen and (max-width: 640px) {
    width: 10rem;
  }
}

.inActive {
  cursor: not-allowed;
  background-color: var(--background-color-loading);
}
</style>
