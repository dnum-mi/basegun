import { createWebHistory, createRouter } from 'vue-router'

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
const AmmoType = () => import('@/views/GuideFactice/AmmoType.vue')

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
        name: 'SelectOption', // renommer SelectOption
        component: SelectOption,
      },
      {
        path: 'extract-mag',
        name: 'ExtractMag',
        component: ExtractMag,
      },
      {
        path: 'munition-type',
        name: 'AmmoType',
        component: AmmoType,
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
