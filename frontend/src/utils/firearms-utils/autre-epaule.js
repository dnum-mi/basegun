import autreEpauleCartridges from '@/assets/guide-factice/images/autre_epaule/autre-epaule-cartridges.jpg'
import autreEpauleBalls from '@/assets/guide-factice/images/autre_epaule/autre-epaule-balls.jpg'
// Autre épaule (à supprimer)
export const autre_epaule = {
  displayLabel: "arme d'épaule non manuelle",
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: false,
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
