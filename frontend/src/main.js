import 'bootstrap/dist/css/bootstrap.css'
import '@/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@gouvminint/vue-dsfr/dist/vue-dsfr.css' // Import des styles globaux
import VueDsfr from '@gouvminint/vue-dsfr' // Import (par défaut) de la bibliothèque

import * as icons from './icons.js'
import App from './App.vue'
import router from '@/router/index.js'
const pinia = createPinia()

axios.defaults.withCredentials = true

// the FastAPI backend
axios.defaults.baseURL = '/api/'

const app = createApp(App)

app
  .use(pinia)
  .use(VueDsfr, { icons: Object.values(icons) })
  .use(router)
  .mount('#app')
