import autreEpauleCartridges from '@/assets/guide-factice/images/autre_epaule/autre-epaule-cartridges.jpg'
import autreEpauleBalls from '@/assets/guide-factice/images/autre_epaule/autre-epaule-balls.jpg'
/*
Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const semi_auto_style_militaire_autre = {
  displayLabel: 'arme d’épaule semi-automatiques ou automatiques type militaire moderne',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  options: {
    ar15: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    kalash: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    sten: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    thompson: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    uzi: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
  guideFactice: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: autreEpauleCartridges,
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: autreEpauleBalls,
    },
  },
}
