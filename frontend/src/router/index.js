import { createWebHistory, createRouter } from 'vue-router'

import { useAppStore } from '@/stores/app.js'
import { clearLocalStorage } from '@/utils/storage-utils.js'
import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

const Home = () => import('@/views/Home.vue')
const Start = () => import('@/views/Start.vue')
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
    beforeEnter (to) {
      const stepsStore = useStepsStore()
      stepsStore.currentStep = 0
    },
  },
  {
    path: '/guide-factice',
    name: 'GuideFactice',
    component: GuideFactice,
    beforeEnter (to) {
      const stepsStore = useStepsStore()
      const resultStore = useResultStore()
      if (stepsStore.currentStep !== 0 && resultStore.img) {
        return true
      }
      return { name: 'Start' }
    },
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
    ],
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
      if (resultStore.img) {
        return true
      }
      return { name: 'Start' }
    },
  },
  {
    path: '/a-propos',
    name: 'About',
    meta: {
      displayHeader: true,
    },
    component: About,
  },
  {
    path: '/mentions-legales',
    name: 'Legal',
    meta: {
      displayHeader: true,
    },
    component: Legal,
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      displayHeader: true,
    },
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
