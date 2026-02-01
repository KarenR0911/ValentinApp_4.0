import '../node_modules/sweetalert2/dist/sweetalert2.min.js'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import '../node_modules/aos/dist/aos.css'
import AOS from 'aos'
import './assets/tailwind.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

AOS.init()
