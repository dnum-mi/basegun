import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import Instructions from '../views/Instructions.vue'
import Informations from '../views/Informations.vue'
import Result from '../views/Result.vue'
import Error from '../views/Error.vue'
import PageNotFound from '../views/PageNotFound.vue'
import About from '../views/About.vue'
import Legal from '../views/Legal.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/accueil',
    name: 'Start',
    component: Start,
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions,
  },
  {
    path: '/informations',
    name: 'Informations',
    component: Informations,
  },
  {
    path: '/resultat',
    name: 'Result',
    meta: {
      reload: true,
    },
    component: Result,
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About,
  },
  {
    path: '/mentions-legales',
    name: 'Legal',
    component: Legal,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/erreur',
    name: 'Error',
    component: Error,
  },
  {
    path: '/:pathMach(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
