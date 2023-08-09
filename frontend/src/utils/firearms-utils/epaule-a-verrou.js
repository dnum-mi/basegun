import epauleAVerrouCartridges from '@/assets/guide-factice/images/epaule_a_verrou/epaule-a-verrou-cartridges-arrow.jpg'
import epauleAVerrouBalls from '@/assets/guide-factice/images/epaule_a_verrou/epaule-a-verrou-balls-arrow.jpg'
/*
Armes d’épaule à verrou
*/
export const epaule_a_verrou = {
  displayLabel: "arme d'épaule à verrou",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  options: {},
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
