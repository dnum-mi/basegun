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
  category: 'A, B ou D',
  mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  isDummyTypology: false,
  isSecuringOptions: true,
  options_text: '',
  options: {
    drulov: {
      label: 'Drulov',
      value: 'drulov',
      text_steps: {
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span>',
        2: '<span class="font-bold">Pivoter l’arrière de la culasse</span> légèrement vers la gauche',
        3: '<span class="font-bold">Tirer la glissière</span> vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
        4: '<span class="font-bold">Actionner la culasse</span> d’avant en arrière',
        5: '<span class="font-bold">Contrôler visuellement</span> que la chambre est bien vide',
      },
      img: autrePistoletDrulovImg,
      video: autrePistoletDrulovVideo,
    },
    derringer: {
      label: 'Derringer',
      value: 'derringer',
      text_steps: {
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span>',
        2: 'Pivoter le <span class="font-bold">levier de déverrouillage</span>',
        3: 'Casser/Basculer les canons vers le haut',
        4: 'Pencher l’entrée des canons pour <span class="font-bold">extraire les munitions</span> éventuelles',
        5: 'Contrôler visuellement que la chambre est bien vide',
      },
      img: autrePistoletDerringerImg,
      video: autrePistoletDerringerVideo,
    },
    thompson_contender: {
      label: 'Thompson contender',
      value: 'thompson_contender',
      text_steps: {
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        2: 'Tirer sur <span class="font-bold">le levier situé sous le pontet</span> avec la main tenant la poignée',
        3: 'Casser/Basculer le canon vers le bas',
        4: 'Retourner l’arme pour <span class="font-bold">extraire la munition</span> éventuelle',
        5: 'Contrôler visuellement que la chambre est bien vide',
      },
      img: autrePistoletThompsonImg,
      video: autrePistoletThompsonVideo,
    },
    fusil_crosse_cannon_scie: {
      label: 'Ancien fusil à crosse et canon scié',
      value: 'fusil_crosse_cannon_scie',
      text_steps: {
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        2: 'Pousser sur la clef avec le pouce tenant la poignée de l’arme',
        3: 'Casser/Basculer le canon de l’arme',
        4: '<span class="font-bold">Retirer les munitions</span> éventuelles',
        5: 'Contrôler visuellement que les chambres sont bien vides',
      },
      img: autrePistoletFusilScieImg,
      video: autrePistoletFusilScieVideo,
    },
  },
}
