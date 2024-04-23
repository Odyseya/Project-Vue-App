import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import router from './router/index.js'

//v ue-toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
// vue-toastification
app.use(Toast)
app.use(createPinia())
app.use(router)

app.mount('#app')
