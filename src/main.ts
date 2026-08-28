import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const app = createApp(App)

// Crea una instancia del cliente de Vue Query
const queryClient = new QueryClient()

// Instala el plugin en Vue
app.use(VueQueryPlugin, { queryClient })

// Registra el componente Devtools para inspeccionar peticiones
app.component('VueQueryDevtools', VueQueryDevtools)

app.use(Vue3Toastify, {
  autoClose: 4000,
  theme: 'colored',
  pauseOnHover: false,
  pauseOnFocusLoss: false,

  // ...
} as ToastContainerOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')
