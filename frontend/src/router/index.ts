import { type RouteLocation, type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import { clearLocalStorage } from '@/utils/storage-utils.js'

import MissingCardPage from '@/views/MissingCardPage.vue'

const HomePage = () => import('@/views/HomePage.vue')
const StartPage = () => import('@/views/StartPage.vue')
const InstructionsPage = () => import('@/views/InstructionsPage.vue')
const ErrorPage = () => import('@/views/ErrorPage.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const AboutPage = () => import('@/views/AboutPage.vue')
const LegalPage = () => import('@/views/LegalPage.vue')
const ContactPage = () => import('@/views/ContactPage.vue')
const AccessibilityPage = () => import('@/views/AccessibilityPage.vue')

const GuideSecuringFirearm = () => import('@/views/GuideSecuringFirearm/GuideSecuringFirearm.vue')
const SecuringSelectOptionContent = () => import('@/views/GuideSecuringFirearm/SecuringSelectOptionContent.vue')
const SecuringTutorialContent = () => import('@/views/GuideSecuringFirearm/SecuringTutorialContent.vue')
const SecuringAchievement = () => import('@/views/GuideSecuringFirearm/SecuringAchievement.vue')
const GuideIdentificationFirearm = () => import('@/views/GuideIdentificationFirearm/GuideIdentificationFirearm.vue')
const IdentificationTypologyResult = () => import('@/views/GuideIdentificationFirearm/IdentificationTypologyResult.vue')
const IdentificationFinalResult = () => import('@/views/GuideIdentificationFirearm/IdentificationFinalResult.vue')
const IdentificationFurtherInformations = () => import('@/views/GuideIdentificationFirearm/IdentificationFurtherInformations.vue')
const IdentificationSelectAmmo = () => import('@/views/GuideIdentificationFirearm/IdentificationSelectAmmo.vue')
const IdentificationBlankGun = () => import('@/views/GuideIdentificationFirearm/IdentificationBlankGun.vue')
const ExpertSituation = () => import('@/views/GuideContactExpert/ExpertSituation.vue')

const routes: RouteRecordRaw[] = [
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
    path: '/carte-manquante',
    name: 'MissingCard',
    component: MissingCardPage,
  },
  {
    path: '/accueil',
    name: 'StartPage',
    component: StartPage,
    beforeEnter: <RouteRecordRaw['beforeEnter']>clearLocalStorage,
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
  },
  {
    path: '/mise-en-securite-choix-option-etape/:step',
    name: 'SecuringSelectOption',
    component: SecuringSelectOptionContent,
    props: (route: RouteLocation) => ({ step: +route.params.step }),
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
        path: 'armes-alarme',
        name: 'IdentificationBlankGun',
        component: IdentificationBlankGun,
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
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/mentions-legales',
    name: 'LegalPage',
    component: LegalPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/erreur',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/accessibilite',
    name: 'AccessibilityPage',
    component: AccessibilityPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
    },
  },
  {
    path: '/:pathMach(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      wholeLogo: true,
    },
  },

  // tutorial to contact expert
  {
    path: '/guide-contact-pn',
    name: 'ExpertSituationPN',
    component: ExpertSituation,
  },
  {
    path: '/guide-contact-gn',
    name: 'ExpertSituationGN',
    component: ExpertSituation,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
