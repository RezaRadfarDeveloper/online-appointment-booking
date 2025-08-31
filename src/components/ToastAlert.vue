<script>
import { watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'App',
  props: {
    message: String,
  },
  setup(props) {
    const notify = () => {
      toast(props.message, {
        theme: 'colored',
        type: 'error',
        autoClose: 2000,
        transition: 'zoom',
        dangerouslyHTMLString: true,
      }) // ToastOptions
    }
    watch(
      () => props.message,
      (message) => {
        if (message) notify()
      },
    )

    return { notify }
  },
}
</script>
