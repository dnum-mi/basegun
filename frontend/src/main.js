import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker.js'


axios.defaults.withCredentials = true;

// the FastAPI backend
if (import.meta.env.PROD) {
  axios.defaults.baseURL = '/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:5000/';
}

const app = createApp(App)
app.use(router).mount('#app')