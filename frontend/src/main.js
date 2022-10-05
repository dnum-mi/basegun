import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@gouvminint/vue-dsfr/dist/vue-dsfr.css' // Import des styles globaux
import VueDsfr from '@gouvminint/vue-dsfr'      // Import (par défaut) de la bibliothèque
import { registerSW } from 'virtual:pwa-register'


axios.defaults.withCredentials = true;

// the FastAPI backend
axios.defaults.baseURL = '/api/';

registerSW({ immediate: true })

const app = createApp(App)
app.use(router)
.use(VueDsfr)
.mount('#app')