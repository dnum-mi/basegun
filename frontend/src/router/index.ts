import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
  type RouteLocation,
} from "vue-router";

import { clearLocalStorage } from "@/utils/storage-utils.js";
import { mgr } from "@/utils/authentication";

import MissingCardPage from "@/views/MissingCardPage.vue";
import ExpertiseForm from "@/views/GuideAskingExpertise/ExpertiseForm.vue";

const HomePage = () => import("@/views/HomePage.vue");
const StartPage = () => import("@/views/StartPage.vue");
const InstructionsPage = () => import("@/views/InstructionsPage.vue");
const ErrorPage = () => import("@/views/ErrorPage.vue");
const PageNotFound = () => import("@/views/PageNotFound.vue");
const AboutPage = () => import("@/views/AboutPage.vue");
const LegalPage = () => import("@/views/LegalPage.vue");
const ContactPage = () => import("@/views/ContactPage.vue");
const AccessibilityPage = () => import("@/views/AccessibilityPage.vue");

const GuideSecuringFirearm = () =>
  import("@/views/GuideSecuringFirearm/GuideSecuringFirearm.vue");
const SecuringSelectOptionContent = () =>
  import("@/views/GuideSecuringFirearm/SecuringSelectOptionContent.vue");
const SecuringTutorialContent = () =>
  import("@/views/GuideSecuringFirearm/SecuringTutorialContent.vue");
const SecuringAchievement = () =>
  import("@/views/GuideSecuringFirearm/SecuringAchievement.vue");
const GuideIdentificationFirearm = () =>
  import("@/views/GuideIdentificationFirearm/GuideIdentificationFirearm.vue");
const IdentificationTypologyResult = () =>
  import("@/views/GuideIdentificationFirearm/IdentificationTypologyResult.vue");
const IdentificationFinalResult = () =>
  import("@/views/GuideIdentificationFirearm/IdentificationFinalResult.vue");
const IdentificationFurtherInformations = () =>
  import(
    "@/views/GuideIdentificationFirearm/IdentificationFurtherInformations.vue"
  );
const IdentificationSelectAmmo = () =>
  import("@/views/GuideIdentificationFirearm/IdentificationSelectAmmo.vue");
const IdentificationBlankGun = () =>
  import("@/views/GuideIdentificationFirearm/IdentificationBlankGun.vue");
const ExpertSituation = () =>
  import("@/views/GuideContactExpert/ExpertSituation.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "Informations",
    },
  },
  {
    path: "/carte-manquante",
    name: "MissingCard",
    component: MissingCardPage,
  },
  {
    path: "/accueil",
    name: "StartPage",
    component: StartPage,
    beforeEnter: <RouteRecordRaw["beforeEnter"]>clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "Accueil",
    },
  },
  {
    path: "/instructions",
    name: "InstructionsPage",
    component: InstructionsPage,
    beforeEnter: clearLocalStorage,
    meta: { title: "Instructions" },
  },
  // tutorial to secure a firearm
  {
    path: "/guide-mise-en-securite",
    name: "GuideSecuringFirearm",
    component: GuideSecuringFirearm,
    meta: { title: "Mise en sécurité" },
  },
  {
    path: "/mise-en-securite-choix-option-etape/:step",
    name: "SecuringSelectOption",
    component: SecuringSelectOptionContent,
    props: (route: RouteLocation) => ({ step: +route.params.step }),
    meta: { title: "Choix du type d'arme" },
  },
  {
    path: "/mise-en-securite-tutoriel",
    name: "SecuringTutorialContent",
    component: SecuringTutorialContent,
    meta: { title: "Tutoriel" },
  },
  {
    path: "/fin-mise-en-securite",
    name: "SecuringAchievement",
    component: SecuringAchievement,
    meta: { title: "Fin mise en sécurité" },
  },
  // Tutorial to identificate a firearm
  {
    path: "/guide-identification",
    name: "GuideIdenticationFirearm",
    component: GuideIdentificationFirearm,
    meta: { title: "Identification" },
    children: [
      {
        path: "resultat-typologie",
        name: "IdentificationTypologyResult",
        component: IdentificationTypologyResult,
      },
      {
        path: "informations-complementaires",
        name: "IdentificationFurtherInformations",
        component: IdentificationFurtherInformations,
      },
      {
        path: "munition-type",
        name: "IdentificationSelectAmmo",
        component: IdentificationSelectAmmo,
      },
      {
        path: "armes-alarme",
        name: "IdentificationBlankGun",
        component: IdentificationBlankGun,
        meta: { title: "Identification" },
      },
      {
        path: "resultat-final",
        name: "IdentificationFinalResult",
        meta: {
          title: "Résultat final",
        },
        component: IdentificationFinalResult,
      },
    ],
  },
  {
    path: "/a-propos",
    name: "AboutPage",
    component: AboutPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "A propos",
    },
  },
  {
    path: "/mentions-legales",
    name: "LegalPage",
    component: LegalPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "Mentions légales",
    },
  },
  {
    path: "/contact",
    name: "ContactPage",
    component: ContactPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "Contact",
    },
  },
  {
    path: "/erreur",
    name: "ErrorPage",
    component: ErrorPage,
    meta: {
      wholeLogo: true,
      title: "Erreur",
    },
  },
  {
    path: "/accessibilite",
    name: "AccessibilityPage",
    component: AccessibilityPage,
    beforeEnter: clearLocalStorage,
    meta: {
      wholeLogo: true,
      title: "Accessibilité",
    },
  },
  {
    path: "/:pathMach(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      wholeLogo: true,
      title: "Page non trouvée",
    },
  },
  {
    path: "/guide-contact",
    name: "ExpertSituation",
    component: ExpertSituation,
    beforeEnter: (to, from, next) => {
      mgr.getUser().then((user) => {
        if (user === null) {
          mgr.signinRedirect();
        } else {
          next();
        }
      });
    },
    meta: { title: "Contact expert" },
  },
  {
    path: "/guide-demande-expertise",
    name: "ExpertiseForm",
    component: ExpertiseForm,
    beforeEnter: (to, from, next) => {
      mgr.getUser().then((user) => {
        if (user === null) {
          mgr.signinRedirect();
        } else {
          next();
        }
      });
    },
    meta: { title: "Formulaire contact" },
  },
  {
    path: "/auth",
    children: [
      {
        path: "redirect",
        name: "AuthRedirect",
        beforeEnter: (to, from) => {
          mgr.signinRedirect();
        },
      },
      {
        path: "callback",
        name: "AuthCallback",
        beforeEnter: async (to, from, next) => {
          try {
            await mgr.signinCallback();
            const user = await mgr.getUser();
            if (user !== null) {
              next({ name: "ExpertSituation" });
            } else {
              next({ name: "AuthRedirect" });
            }
          } catch (error) {
            console.error("Erreur signin callback:", error);
            next({ name: "AuthRedirect" });
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = "Basegun | " + to.meta.title;
  next();
});

export default router;
