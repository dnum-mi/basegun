import { createWebHistory, createRouter } from 'vue-router'

import { useAppStore } from '@/stores/app.js'
import { clearLocalStorage } from '@/utils/storage-utils.js'
import { useResultStore } from '@/stores/result.js'

const Home = () => import('@/views/Home.vue')
const Start = () => import('@/views/Start.vue')
const Informations = () => import('@/views/Informations.vue')
const Instructions = () => import('@/views/Instructions.vue')
const Result = () => import('@/views/Result.vue')
const Error = () => import('@/views/Error.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const About = () => import('@/views/About.vue')
const Legal = () => import('@/views/Legal.vue')
const Contact = () => import('@/views/Contact.vue')

const GuideFactice = () => import('@/views/GuideFactice/GuideFactice.vue')
const FirearmDirection = () => import('@/views/GuideFactice/FirearmDirection.vue')
const SafetyRecommendation = () => import('@/views/SafetyRecommendation.vue')
const SelectOption = () => import('@/views/GuideFactice/SelectOption.vue')
const ExtractMag = () => import('@/views/GuideFactice/ExtractMag.vue')
const SelectAmmo = () => import('@/views/GuideFactice/SelectAmmo.vue')
const EndTutorial = () => import('@/views/GuideFactice/EndTutorial.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      displayHeader: true,
    },
    beforeEnter: clearLocalStorage,
  },
  {
    path: '/accueil',
    name: 'Start',
    component: Start,
    meta: {
      displayHeader: true,
    },
    beforeEnter: clearLocalStorage,
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions,
    meta: {
      displayHeader: true,
    },
    beforeEnter: clearLocalStorage,
  },
  {
    path: '/consignes-de-securite',
    name: 'SafetyRecommendation',
    component: SafetyRecommendation,
  },
  {
    path: '/guide-factice',
    name: 'GuideFactice',
    component: GuideFactice,
    children: [
      {
        path: 'consignes-arme',
        name: 'FirearmDirection',
        component: FirearmDirection,
      },
      {
        path: 'option-arme',
        name: 'SelectOption',
        component: SelectOption,
      },
      {
        path: 'extract-mag',
        name: 'ExtractMag',
        component: ExtractMag,
      },
      {
        path: 'munition-type',
        name: 'SelectAmmo',
        component: SelectAmmo,
      },
      {
        path: 'end-tutorial',
        name: 'EndTutorial',
        component: EndTutorial,
      },
    ],
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
    beforeEnter (to) {
      const resultStore = useResultStore()
      if (resultStore.img !== null) {
        return true
      }
      return { name: 'Start' }
    },
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
    meta: {
      displayHeader: true,
    },
    component: Error,
  },
  {
    path: '/:pathMach(.*)*',
    name: 'PageNotFound',
    meta: {
      displayHeader: true,
    },
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const appStore = useAppStore()
  appStore.setDisplayHeader(to.meta.displayHeader)
})

export default router
