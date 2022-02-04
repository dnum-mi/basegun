import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import './registerServiceWorker.js'


axios.defaults.withCredentials = true;

// the FastAPI backend
if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = '/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:5000/';
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');