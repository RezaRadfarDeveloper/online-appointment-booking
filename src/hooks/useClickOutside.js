import { onBeforeMount, onMounted } from 'vue'

export default function useClickOutside(target_ref, callback_function, val) {
  console.log(target_ref.value)

  if (!target_ref) {
    return
  }

  const handleEvent = (e) => {
    if (e.target == target_ref.value || e.composedPath().includes(target_ref.value)) {
      return //we have clicked inside target --here modal box--
    }

    // we have clicked outside of the target so:
    if (typeof callback_function == 'function' && val.value) {
      callback_function(!val)
    }
  }

  onMounted(() => {
    console.log('on mounted hook')
    window.addEventListener('click', handleEvent, true)
  })

  onBeforeMount(() => {
    console.log('on before mounted')
    window.removeEventListener('click', handleEvent, true)
  })

  return {
    handleEvent,
  }
}
