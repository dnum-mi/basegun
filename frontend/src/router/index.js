import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import Informations from '../views/Informations.vue'
import Error from '../views/Error.vue'
import PageNotFound from '../views/PageNotFound.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accueil',
    name: 'Start',
    component: Start
  },
  {
    path: '/informations',
    name: 'Informations',
    component: Informations
  },
  {
    path: '/erreur',
    name: 'Error',
    component: Error
  },
  {
    path: '/:pathMach(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
