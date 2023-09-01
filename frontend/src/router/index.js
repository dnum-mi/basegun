import { createWebHistory, createRouter } from 'vue-router'

import { useAppStore } from '@/stores/app.js'
import { clearLocalStorage } from '@/utils/storage-utils.js'

const HomePage = () => import('@/views/HomePage.vue')
const StartPage = () => import('@/views/StartPage.vue')
const InstructionsPage = () => import('@/views/InstructionsPage.vue')
const ErrorPage = () => import('@/views/ErrorPage.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const AboutPage = () => import('@/views/AboutPage.vue')
const LegalPage = () => import('@/views/LegalPage.vue')
const ContactPage = () => import('@/views/ContactPage.vue')

const GuideSecuringFirearm = () => import('@/views/GuideSecuringFirearm/GuideSecuringFirearm.vue')
const SecuringIntroduction = () => import('@/views/GuideSecuringFirearm/SecuringIntroduction.vue')
const SecuringInstructions = () => import('@/views/GuideSecuringFirearm/SecuringInstructions.vue')
const SecuringSelectOptionStep1 = () => import('@/views/GuideSecuringFirearm/SecuringSelectOptionStep1.vue')
const SecuringSelectOptionStep3 = () => import('@/views/GuideSecuringFirearm/SecuringSelectOptionStep3.vue')
const SecuringSelectOptionStep2 = () => import('@/views/GuideSecuringFirearm/SecuringSelectOptionStep2.vue')
const SecuringTutorialContent = () => import('@/views/GuideSecuringFirearm/SecuringTutorialContent.vue')
const SecuringRecommendations = () => import('@/views/GuideSecuringFirearm/SecuringRecommendations.vue')
const SecuringAchievement = () => import('@/views/GuideSecuringFirearm/SecuringAchievement.vue')
const GuideIdentificationFirearm = () => import('@/views/GuideIdentificationFirearm/GuideIdentificationFirearm.vue')
const IdentificationTypologyResult = () => import('@/views/GuideIdentificationFirearm/IdentificationTypologyResult.vue')
const IdentificationFinalResult = () => import('@/views/GuideIdentificationFirearm/IdentificationFinalResult.vue')
const IdentificationFurtherInformations = () => import('@/views/GuideIdentificationFirearm/IdentificationFurtherInformations.vue')
const IdentificationSelectAmmo = () => import('@/views/GuideIdentificationFirearm/IdentificationSelectAmmo.vue')

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/accueil',
    name: 'StartPage',
    component: StartPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/instructions',
    name: 'InstructionsPage',
    component: InstructionsPage,
    beforeEnter: clearLocalStorage,
  },
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
    path: '/mise-en-securite-choix-option-etape-1',
    name: 'SecuringSelectOptionStep1',
    component: SecuringSelectOptionStep1,
  },
  {
    path: '/mise-en-securite-choix-option-etape-2',
    name: 'SecuringSelectOptionStep2',
    component: SecuringSelectOptionStep2,
  },
  {
    path: '/mise-en-securite-choix-option-etape-3',
    name: 'SecuringSelectOptionStep3',
    component: SecuringSelectOptionStep3,
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
        name: 'IdentificationTypologyResult',
        meta: {
          reload: true,
        },
        component: IdentificationTypologyResult,
      },
      {
        path: 'informations-complementaires',
        name: 'IdentificationFurtherInformations',
        meta: {
          reload: true,
        },
        component: IdentificationFurtherInformations,
      },
      {
        path: 'munition-type',
        name: 'IdentificationSelectAmmo',
        meta: {
          reload: true,
        },
        component: IdentificationSelectAmmo,
      },
      {
        path: 'resultat-final',
        name: 'IdentificationFinalResult',
        meta: {
          reload: true,
        },
        component: IdentificationFinalResult,
      },
    ],
  },
  {
    path: '/a-propos',
    name: 'AboutPage',
    component: AboutPage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/mentions-legales',
    name: 'LegalPage',
    meta: {
      wholeLogo: true,
    },
    component: LegalPage,
  },
  {
    path: '/contact',
    name: 'ContactPage',
    meta: {
      wholeLogo: true,
    },
    component: ContactPage,
  },
  {
    path: '/erreur',
    name: 'ErrorPage',
    meta: {
      wholeLogo: true,
    },
    component: ErrorPage,
  },
  {
    path: '/:pathMach(.*)*',
    name: 'PageNotFound',
    meta: {
      wholeLogo: true,
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
