import { createWebHistory, createRouter } from 'vue-router'

import { useAppStore } from '@/stores/app.js'
import { clearLocalStorage } from '@/utils/storage-utils.js'
import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

const HomePage = () => import('@/views/HomePage.vue')
const StartPage = () => import('@/views/StartPage.vue')
const Instructions = () => import('@/views/Instructions.vue')
const Error = () => import('@/views/Error.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const About = () => import('@/views/About.vue')
const Legal = () => import('@/views/Legal.vue')
const Contact = () => import('@/views/Contact.vue')

// const GuideFactice = () => import('@/views/GuideFactice/GuideFactice.vue')
// const SafetyRecommendation = () => import('@/views/SafetyRecommendation.vue')
// const FirearmDirection = () => import('@/views/GuideFactice/FirearmDirection.vue')
// const SelectOption = () => import('@/views/GuideFactice/SelectOption.vue')
// const ExtractMag = () => import('@/views/GuideFactice/ExtractMag.vue')
// const SelectAmmo = () => import('@/views/GuideFactice/SelectAmmo.vue')
const GuideSecuringFirearm = () => import('@/views/GuideSecuringFirearm/GuideSecuringFirearm.vue')
const SecuringIntroduction = () => import('@/views/GuideSecuringFirearm/SecuringIntroduction.vue')
const SecuringInstructions = () => import('@/views/GuideSecuringFirearm/SecuringInstructions.vue')
const SecuringTutorialContent = () => import('@/views/GuideSecuringFirearm/SecuringTutorialContent.vue')
const SecuringRecommendations = () => import('@/views/GuideSecuringFirearm/SecuringRecommendations.vue')
const SecuringAchievement = () => import('@/views/GuideSecuringFirearm/SecuringAchievement.vue')
const GuideIdentificationFirearm = () => import('@/views/GuideIdentificationFirearm/GuideIdentificationFirearm.vue')
const TypologyResult = () => import('@/views/GuideIdentificationFirearm/TypologyResult.vue')
const FinalResult = () => import('@/views/GuideIdentificationFirearm/FinalResult.vue')
const FurtherInformations = () => import('@/views/GuideIdentificationFirearm/FurtherInformations.vue')
const SelectAmmo = () => import('@/views/GuideIdentificationFirearm//SelectAmmo.vue')

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
  // {
  //   path: '/consignes-de-securite',
  //   name: 'SafetyRecommendation',
  //   component: SafetyRecommendation,
  //   beforeEnter (to) {
  //     const stepsStore = useStepsStore()
  //     stepsStore.currentStep = 0
  //   },
  // },
  // Tutorial for detecting airsofts
  // {
  //   path: '/guide-factice',
  //   name: 'GuideFactice',
  //   component: GuideFactice,
  //   beforeEnter (to) {
  //     const stepsStore = useStepsStore()
  //     const resultStore = useResultStore()
  //     if (stepsStore.currentStep !== 0 && resultStore.img) {
  //       return true
  //     }
  //     return { name: 'StartPage' }
  //   },
  //   children: [
  //     {
  //       path: 'consignes-arme',
  //       name: 'FirearmDirection',
  //       component: FirearmDirection,
  //     },
  //     {
  //       path: 'option-arme',
  //       name: 'SelectOption',
  //       component: SelectOption,
  //     },
  //     {
  //       path: 'extract-mag',
  //       name: 'ExtractMag',
  //       component: ExtractMag,
  //     },
  //     {
  //       path: 'munition-type',
  //       name: 'SelectAmmo',
  //       component: SelectAmmo,
  //     },
  //   ],
  // },

  // tutorial to secure a firearm
  {
    path: '/guide-mise-en-securite',
    name: 'GuideSecuringFirearm',
    component: GuideSecuringFirearm,
    children: [
      {
        path: 'mise-en-securite-introduction',
        name: 'SecuringIntroduction',
        component: SecuringIntroduction,
      },
      {
        path: 'mise-en-securite-instructions',
        name: 'SecuringInstructions',
        component: SecuringInstructions,
      },
      {
        path: 'mise-en-securite-recommandations',
        name: 'SecuringRecommendations',
        component: SecuringRecommendations,
      },
    ],
  },
  {
    path: '/mise-en-securite-tutoriel',
    name: 'SecuringTutorialContent',
    component: SecuringTutorialContent,
  },
  {
    path: '/fin-mise-en-securite',
    name: 'SecuringAchievement',
    component: SecuringAchievement,
  },
  // Tutorial to identificate a firearm
  {
    path: '/guide-identification',
    name: 'GuideIdenticationFirearm',
    component: GuideIdentificationFirearm,
    children: [
      {
        path: 'resultat-typologie',
        name: 'TypologyResult',
        meta: {
          reload: true,
        },
        component: TypologyResult,
      },
      {
        path: 'informations-complementaires',
        name: 'FurtherInformations',
        meta: {
          reload: true,
        },
        component: FurtherInformations,
      },
      {
        path: 'munition-type',
        name: 'SelectAmmo',
        meta: {
          reload: true,
        },
        component: SelectAmmo,
      },
      {
        path: 'resultat-final',
        name: 'FinalResult',
        meta: {
          reload: true,
        },
        component: FinalResult,
      },
    ],
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
