import epaulePompeSimpleVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_simple.mp4'
// import epaulePompeCompliqueVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_complique.mp4'
/*
3 - Armes d’épaule à pompe
*/
export const epaule_a_pompe = {
  displayLabel: "Arme d'épaule à pompe",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  options_text: '',
  text_steps: {
    1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
    2: 'Si la pompe est bloquée, <span class="font-bold">appuyer sur le bouton de déverrouillage</span> situé à l’avant ou sous le pontet',
    3: 'Actionner la pompe doucement d’arrière en avant afin d’<span class="font-bold">extraire toutes les munitions</span>',
    4: '<span class="font-bold">Verrouiller l’arme</span> en avançant légèrement la pompe vers l’avant',
    5: 'Contrôler visuellement que la chambre est vide',
    6: '<span class="font-bold">Contrôler l’orifice du tube magasin</span>p et constater que celui-ci est bien vide',
  },
  video: epaulePompeSimpleVideo,
  // text_steps: {
  //   1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
  //   2: 'Retourner l’arme et appuyer sur la planchette élévatrice',
  //   3: 'Appuyer sur l’ergot/crochet maintenant les cartouches afin de vider le magasin',
  //   4: 'Vérifier que le magasin est vide en appuyant sur le poussoir',
  //   5: 'Si la pompe est bloquée, appuyer sur le bouton de déverrouillage situé à l’avant ou sous le pontet',
  //   6: 'Actionner la pompe pour <span class="font-bold">extraire la munition</span> par la fenêtre d’éjection',
  //   7: 'Contrôler visuellement que la chambre est vide',
  //   8: 'Verrouiller l’arme en actionnant la pompe vers l’avant',
  // },
  // video: epaulePompeCompliqueVideo,
}
