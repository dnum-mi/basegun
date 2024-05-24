import autrePistoletFusilScieImg from '@/assets/guide-mise-en-securite/photos/autre_pistolet/autre_pistolet_fusil_scie.jpg'
import autrePistoletDrulovImg from '@/assets/guide-mise-en-securite/photos/autre_pistolet/autre_pistolet_drulov.jpg'
import autrePistoletDerringerImg from '@/assets/guide-mise-en-securite/photos/autre_pistolet/autre_pistolet_derringer.jpg'
import autrePistoletThompsonImg from '@/assets/guide-mise-en-securite/photos/autre_pistolet/autre_pistolet_thompson.jpg'
import autrePistoletFusilScieVideo from '@/assets/guide-mise-en-securite/videos/autre_pistolet/autre_pistolet_fusil_scie.mp4'
import autrePistoletDrulovVideo from '@/assets/guide-mise-en-securite/videos/autre_pistolet/autre_pistolet_drulov.mp4'
import autrePistoletDerringerVideo from '@/assets/guide-mise-en-securite/videos/autre_pistolet/autre_pistolet_derringer.mp4'
import autrePistoletThompsonVideo from '@/assets/guide-mise-en-securite/videos/autre_pistolet/autre_pistolet_thompson.mp4'
/*
Autre pistolet
  Drulov
  Derringer
  Thompson contender
  Ancien fusil à crosse et canon scié
*/
export const autre_pistolet = {
  typologie: 'autre_pistolet',
  displayLabel: 'Pistolet divers',
  getCategory: () => 'A, B ou D',
  isDummyTypology: false,
  options_text: '',
  securingSteps: {
    drulov: {
      label: 'Drulov',
      value: 'drulov',
      text_steps: [
        'Analyser l’arme en  <span class="font-bold">direction sécurisée</span>',
        '<span class="font-bold">Pivoter l’arrière de la culasse</span> légèrement vers la gauche',
        '<span class="font-bold">Tirer la glissière</span> vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
        '<span class="font-bold">Actionner la culasse</span> d’avant en arrière',
        '<span class="font-bold">Contrôler visuellement</span> que la chambre est bien vide',
      ],
      img: autrePistoletDrulovImg,
      video: autrePistoletDrulovVideo,
    },
    derringer: {
      label: 'Derringer',
      value: 'derringer',
      text_steps: [
        'Analyser l’arme en  <span class="font-bold">direction sécurisée</span>',
        'Pivoter le <span class="font-bold">levier de déverrouillage</span>',
        'Casser/Basculer les canons vers le haut',
        'Pencher l’entrée des canons pour <span class="font-bold">extraire les munitions</span> éventuelles',
        'Contrôler visuellement que la chambre est bien vide',
      ],
      img: autrePistoletDerringerImg,
      video: autrePistoletDerringerVideo,
    },
    thompson_contender: {
      label: 'Thompson contender',
      value: 'thompson_contender',
      text_steps: [
        'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        'Tirer sur <span class="font-bold">le levier situé sous le pontet</span> avec la main tenant la poignée',
        'Casser/Basculer le canon vers le bas',
        'Retourner l’arme pour <span class="font-bold">extraire la munition</span> éventuelle',
        'Contrôler visuellement que la chambre est bien vide',
      ],
      img: autrePistoletThompsonImg,
      video: autrePistoletThompsonVideo,
    },
    fusil_crosse_cannon_scie: {
      label: 'Ancien fusil à crosse et canon scié',
      value: 'fusil_crosse_cannon_scie',
      text_steps: [
        'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        'Pousser sur la clef avec le pouce tenant la poignée de l’arme',
        'Casser/Basculer le canon de l’arme',
        '<span class="font-bold">Retirer les munitions</span> éventuelles',
        'Contrôler visuellement que les chambres sont bien vides',
      ],
      img: autrePistoletFusilScieImg,
      video: autrePistoletFusilScieVideo,
    },
  },
} as const
