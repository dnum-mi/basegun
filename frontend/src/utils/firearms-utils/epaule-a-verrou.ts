import epauleAVerrouCartridges from '@/assets/guide-identification/photos/epaule_a_verrou/epaule_a_verrou_chargeur_cartouche.jpg'
import epauleAVerrouBalls from '@/assets/guide-identification/photos/epaule_a_verrou/epaule_a_verrou_chargeur_bille.jpg'
import epauleAVerrouVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_verrou/epaule_verrou_chargeur-video.mp4'

/*
Armes d’épaule à verrou
*/
export const epaule_a_verrou = {
  displayLabel: 'Arme d’épaule à verrou',
  category: 'B ou C',
  isDummyTypology: true,
  isSecuringOptions: true,
  text_steps: {
    1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
    2: 'Ouvrez la culasse en tirant le levier vers le haut puis en la tirant la culasse vers l’arrière',
  },
  video: epauleAVerrouVideo,
  guideFactice: {
    cartouches: {
      label: 'Balles',
      value: 'cartouches',
      img_ammo: epauleAVerrouCartridges,
    },
    billes: {
      label: 'Billes ou trou pour billes',
      value: 'billes',
      img_ammo: epauleAVerrouBalls,
    },
  },
} as const
