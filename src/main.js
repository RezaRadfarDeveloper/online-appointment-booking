import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// To avoid transition effect on initial load for homepage
router.isReady().then(() => {
  app.mount('#app')
})
