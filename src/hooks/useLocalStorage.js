import { ref, watch } from 'vue'

export default function useLocalStorage(key) {
  let storedValue = read()

  const val = ref(storedValue)

  function read() {
    // console.log('read from useLocalStorage')
    if (localStorage.getItem(key) != undefined) {
      // console.log(key)

      return JSON.parse(localStorage.getItem(key))
    }
  }

  const write = () => {
    // console.log('write uselocalstorage')

    if (storedValue === '' || val.value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(val.value))
  }
  watch(val, write)

  return val
}
