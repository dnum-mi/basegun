import epaulePompeSimpleVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_simple.mp4'
// import epaulePompeCompliqueVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_complique.mp4'
/*
3 - Armes d’épaule à pompe
*/
export const epaule_a_pompe = {
  displayLabel: "arme d'épaule à pompe",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  textOptions: '',
  text_steps: {
    text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
    text_step_2: '2 - Si la pompe est bloquée, appuyer sur le bouton de déverrouillage situé à l’avant ou sous le pontet',
    text_step_3: '3 - Actionner la pompe doucement d’arrière en avant afin d’extraire toutes les munitions',
    text_step_4: '4 - Verrouiller l’arme en avançant légèrement la pompe vers l’avant',
    text_step_5: '5 - Contrôler visuellement que la chambre est vide',
    text_step_6: '6 - Contrôler l’orifice du tube magasin et constater que celui-ci est bien vide',
  },
  video: epaulePompeSimpleVideo,
  // text_steps: {
  //   text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
  //   text_step_2: '2 - Retourner l’arme et appuyer sur la planchette élévatrice',
  //   text_step_3: '3 - Appuyer sur l’ergot/crochet maintenant les cartouches afin de vider le magasin',
  //   text_step_4: '4 - Vérifier que le magasin est vide en appuyant sur le poussoir',
  //   text_step_5: '5 - Si la pompe est bloquée, appuyer sur le bouton de déverrouillage situé à l’avant ou sous le pontet',
  //   text_step_6: '6 - Actionner la pompe pour extraire la munition par la fenêtre d’éjection',
  //   text_step_7: '7 - Contrôler visuellement que la chambre est vide',
  //   text_step_8: '8 - Verrouiller l’arme en actionnant la pompe vers l’avant',
  // },
  // video: epaulePompeCompliqueVideo,
}
