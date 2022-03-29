import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VueDsfr from '@laruiss/vue-dsfr'
import '@laruiss/vue-dsfr/dist/vue-dsfr.css'
import '@laruiss/vue-dsfr/dist/vue-dsfr-fonts.css'

import { registerSW } from 'virtual:pwa-register'


axios.defaults.withCredentials = true;

// the FastAPI backend
if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = '/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:5000/';
}

registerSW({ immediate: true })

const app = createApp(App)
app.use(router).use(VueDsfr).mount('#app')