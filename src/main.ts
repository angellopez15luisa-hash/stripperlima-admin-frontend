import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

/* --- FontAwesome --- */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faSearch,
  faSun,
  faMoon,
  faBell,
  faCheck,
  faLayerGroup,
  faPenToSquare,
  faTags,
  faSquareCheck,
  faUpload,
  faArrowRightFromBracket,
  faXmark,
  faBagShopping,
  faBoxesStacked,
  faChevronRight,
  faUser,
  faHeading,
  faImage,
  faShareNodes,
  faCloudArrowUp,
  faImages,
  faSync,
  faPlus,
  faTrash,
  faMagnifyingGlass,
  faChevronDown,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
// 2. Importa los iconos de marcas ('fab' para redes sociales)
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

import { faBell as faRegularBell } from '@fortawesome/free-regular-svg-icons'

// Añadimos los iconos que usamos en el layout, sidebar y header
library.add(
  faBars,
  faSearch,
  faSun,
  faMoon,
  faBell,
  faCheck,
  faLayerGroup,
  faPenToSquare,
  faTags,
  faSquareCheck,
  faUpload,
  faArrowRightFromBracket,
  faXmark,
  faRegularBell,
  faBagShopping,
  faBoxesStacked,
  faChevronRight,
  faChevronDown,
  faUser,
  faInstagram,
  faFacebook,
  faTiktok,
  faHeading,
  faImage,
  faShareNodes,
  faFloppyDisk,
  faCloudArrowUp,
  faImages,
  faMagnifyingGlass,
  faSync,
  faPlus,
  faTrash,
  faTwitter,
  faWhatsapp,
)

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
// Registramos el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
