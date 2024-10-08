import "@gouvfr/dsfr/dist/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons.min.css"; // Facultatif : Si des icônes sont utilisées avec <span class="fr-icon-..." />
import "@gouvfr/dsfr/dist/component/component.main.min.css";
import "@gouvfr/dsfr/dist/utility/utility.main.min.css";
import "@gouvminint/vue-dsfr/styles"; // Import des styles globaux
import "uno.css";
import "@/main.css";

import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "@/router/index";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// the FastAPI backend
axios.defaults.baseURL = "/api/";

const app = createApp(App);

app.use(pinia).use(router).mount("#app");
