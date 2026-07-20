<template>
  <div class="loader-content">
    <span class="loader"></span>
  </div>
</template>
<style scoped>
.loader-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 100%;
  padding: 10px;
  color: #888;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid rgb(var(--background-color-secondary));
  border-bottom-color: var(--background-color-ternary);
  margin-top: 3rem;
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
