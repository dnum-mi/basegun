import { createWebHistory, createRouter } from 'vue-router'

import { useAppStore } from '@/stores/app.js'
import { clearLocalStorage } from '@/utils/storage-utils.js'
import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

const HomePage = () => import('@/views/HomePage.vue')
const StartPage = () => import('@/views/StartPage.vue')
const Instructions = () => import('@/views/Instructions.vue')
const Result = () => import('@/views/Result.vue')
const Error = () => import('@/views/Error.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const About = () => import('@/views/About.vue')
const Legal = () => import('@/views/Legal.vue')
const Contact = () => import('@/views/Contact.vue')

const GuideFactice = () => import('@/views/GuideFactice/GuideFactice.vue')
const SafetyRecommendation = () => import('@/views/SafetyRecommendation.vue')
const FirearmDirection = () => import('@/views/GuideFactice/FirearmDirection.vue')
const SelectOption = () => import('@/views/GuideFactice/SelectOption.vue')
const ExtractMag = () => import('@/views/GuideFactice/ExtractMag.vue')
const SelectAmmo = () => import('@/views/GuideFactice/SelectAmmo.vue')
const GuideSecuringFirearm = () => import('@/views/GuideSecuringFirearm/GuideSecuringFirearm.vue')
const SecuringIntroduction = () => import('@/views/GuideSecuringFirearm/SecuringIntroduction.vue')
const SecuringInstructions = () => import('@/views/GuideSecuringFirearm/SecuringInstructions.vue')
const SecuringRecommendations = () => import('@/views/GuideSecuringFirearm/SecuringRecommendations.vue')

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      displayHeader: true,
    },
    beforeEnter: clearLocalStorage,
  },
  {
    path: '/accueil',
    name: 'StartPage',
    component: StartPage,
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
      return { name: 'StartPage' }
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
    path: '/guide-mise-en-securite',
    name: 'GuideSecuringFirearm',
    component: GuideSecuringFirearm,
    // beforeEnter (to) {
    //   const stepsStore = useStepsStore()
    //   const resultStore = useResultStore()
    //   if (stepsStore.currentStep !== 0 && resultStore.img) {
    //     return true
    //   }
    //   return { name: 'StartPage' }
    // },
    children: [
      {
        path: 'securing-introduction',
        name: 'SecuringIntroduction',
        component: SecuringIntroduction,
      },
      {
        path: 'securing-instructions',
        name: 'SecuringInstructions',
        component: SecuringInstructions,
      },
      {
        path: 'securing-recommendations',
        name: 'SecuringRecommendations',
        component: SecuringRecommendations,
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
      return { name: 'StartPage' }
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
