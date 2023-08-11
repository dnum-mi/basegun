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
  textOptions: '',
  options: {
    drulov: {
      label: 'Drulov',
      value: 'drulov',
      text_step_1: '1 - Analyser l’arme en direction sécurisée',
      text_step_2: '2 - Pivoter l’arrière de la culasse légèrement vers la gauche',
      text_step_3: '3 - Tirer la glissière vers l’arrière pour extraire  la munition éventuelle',
      text_step_4: '4 - Actionner la culasse d’avant en arrière',
      text_step_5: '5 - Contrôler visuellement que la chambre est bien vide',
      img: '',
      video: '',
    },
    derringer: {
      label: 'Derringer',
      value: 'derringer',
      text_step_1: '1 - Analyser l’arme en direction sécurisée',
      text_step_2: '2 - Pivoter le levier de déverrouillage',
      text_step_3: '3 - Casser/Basculer les canons vers le haut',
      text_step_4: '4 - Pencher l’entrée des canons pour extraire les munitions éventuelles',
      text_step_5: '5 - Contrôler visuellement que la chambre est bien vide',
      img: '',
      video: '',
    },
    thompson_contender: {
      label: 'Thompson contender',
      value: 'thompson_contender',
      text_step_1: '1 - Analyser l’arme en direction sécurisée',
      text_step_2: '2 - Tirer sur le levier situé sous le pontet avec la main tenant la poignée',
      text_step_3: '3 - Casser/Basculer le canon vers le bas',
      text_step_4: '4 - Retourner l’arme pour extraire la munition éventuelle',
      text_step_5: '5 - Contrôler visuellement que la chambre est bien vide',
      img: '',
      video: '',
    },
    fusil_crosse_cannon_scie: {
      label: 'Ancien fusil à crosse et canon scié',
      value: 'fusil_crosse_cannon_scie',
      text_step_1: '1 - Analyser l’arme en direction sécurisée',
      text_step_2: '2 - Pousser sur la clef avec le pouce tenant la poignée de l’arme',
      text_step_3: '3 - Casser/Basculer le canon de l’arme',
      text_step_4: '4 - Retirer les munitions éventuelles',
      text_step_5: '5 - Contrôler visuellement que les chambres sont bien vides',
      img: '',
      video: '',
    },
  },
}
