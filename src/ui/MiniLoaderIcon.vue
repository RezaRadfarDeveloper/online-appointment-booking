<template>
  <span class="loader"></span>
</template>
<style scoped>
.loader {
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid #fff;
  border-bottom-color: #505050;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.6s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
