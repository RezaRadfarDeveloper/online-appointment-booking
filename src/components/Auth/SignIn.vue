<template>
  <div>sign up form</div>
  <button @click="signIn">Sign In</button>
</template>
<script>
export default {
  emits: ['signedIn'],
  setup(props, { emit }) {
    const signIn = () => {
      emit('signedIn')
    }

    return {
      signIn,
    }
  },
}
</script>
