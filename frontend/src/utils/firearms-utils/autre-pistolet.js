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
  displayLabel: 'pistolet divers',
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
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Pivoter l’arrière de la culasse légèrement vers la gauche',
        text_step_3: 'Tirer la glissière vers l’arrière pour extraire  la munition éventuelle',
        text_step_4: 'Actionner la culasse d’avant en arrière',
        text_step_5: 'Contrôler visuellement que la chambre est bien vide',
      },
      img: autrePistoletDrulovImg,
      video: autrePistoletDrulovVideo,
    },
    derringer: {
      label: 'Derringer',
      value: 'derringer',
      text_steps: {
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Pivoter le levier de déverrouillage',
        text_step_3: 'Casser/Basculer les canons vers le haut',
        text_step_4: 'Pencher l’entrée des canons pour extraire les munitions éventuelles',
        text_step_5: 'Contrôler visuellement que la chambre est bien vide',
      },
      img: autrePistoletDerringerImg,
      video: autrePistoletDerringerVideo,
    },
    thompson_contender: {
      label: 'Thompson contender',
      value: 'thompson_contender',
      text_steps: {
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Tirer sur le levier situé sous le pontet avec la main tenant la poignée',
        text_step_3: 'Casser/Basculer le canon vers le bas',
        text_step_4: 'Retourner l’arme pour extraire la munition éventuelle',
        text_step_5: 'Contrôler visuellement que la chambre est bien vide',
      },
      img: autrePistoletThompsonImg,
      video: autrePistoletThompsonVideo,
    },
    fusil_crosse_cannon_scie: {
      label: 'Ancien fusil à crosse et canon scié',
      value: 'fusil_crosse_cannon_scie',
      text_steps: {
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Pousser sur la clef avec le pouce tenant la poignée de l’arme',
        text_step_3: 'Casser/Basculer le canon de l’arme',
        text_step_4: 'Retirer les munitions éventuelles',
        text_step_5: 'Contrôler visuellement que les chambres sont bien vides',
      },
      img: autrePistoletFusilScieImg,
      video: autrePistoletFusilScieVideo,
    },
  },
}
