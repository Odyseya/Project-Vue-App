import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import router from './router/index.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// CHECK
// import Toast from 'vue-toastification';
// import 'vue-toastification/dist/index.css';
// app.use(Toast)
//END CHECK
