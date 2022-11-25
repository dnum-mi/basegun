import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { createApp } from 'vue';

import '@gouvminint/vue-dsfr/dist/vue-dsfr.css' // Import des styles globaux
import VueDsfr from '@gouvminint/vue-dsfr'      // Import (par défaut) de la bibliothèque

import * as icons from './icons.js'
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

axios.defaults.withCredentials = true;

// the FastAPI backend
axios.defaults.baseURL = '/api/';

const app = createApp(App)

app
  .use(VueDsfr,  { icons: Object.values(icons) })
  .use(router)
  .use(store)
  .mount('#app')