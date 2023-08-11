import epauleAVerrouCartridges from '@/assets/guide-factice/images/epaule_a_verrou/epaule-a-verrou-cartridges-arrow.jpg'
import epauleAVerrouBalls from '@/assets/guide-factice/images/epaule_a_verrou/epaule-a-verrou-balls-arrow.jpg'
import revolver2Video from '@/assets/guide-factice/videos/revolver-2_sm.mp4'

/*
Armes d’épaule à verrou
*/
export const epaule_a_verrou = {
  displayLabel: "arme d'épaule à verrou",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
  text_step_2: '2 - Ouvrez la culasse en tirant le levier vers le haut puis en la tirant la culasse vers l’arrière',
  text_step_3: '3 - Retourner l’arme et chercher la présence éventuelle de levier ou bouton devant le pontent indiquant la présence d’un chargeur externe. Si tel est le cas, extraire le chargeur en appuyant ou en tirant sur ces derniers',
  text_step_4: '4 - Si vous n’avez pas enlevé de chargeur, vider le magasin des munitions éventuelles en les faisant glisser vers l’avant à l’aide de votre pouce',
  text_step_5: '5 - Contrôler visuellement la chambre',
  video: revolver2Video,
  guideFactice: {
    cartouches: {
      label: 'balles',
      value: 'cartouches',
      img_ammo: epauleAVerrouCartridges,
    },
    billes: {
      label: 'bille ou trou pour billes',
      value: 'billes',
      img_ammo: epauleAVerrouBalls,
    },
  },
}
