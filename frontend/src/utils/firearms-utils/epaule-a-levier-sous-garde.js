import levierSousGardeMagasinAvant from '@/assets/guide-mise-en-securite/photos/epaule_a_levier_sous_garde/levier_sous_garde_magasin_avant.jpg'
import levierSousGardePasMagasin from '@/assets/guide-mise-en-securite/photos/epaule_a_levier_sous_garde/levier_sous_garde_pas_magasin.jpg'
/*
Armes d’épaule à levier de sous-garde
  Magasin avant
  Magasin fixe
*/
export const epaule_a_levier_sous_garde = {
  displayLabel: "arme d'épaule à levier de sous-garde",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  textOptions: '',
  options: {
    front_magazine: {
      label: 'Embout rugueux',
      value: 'front_magazine',
      text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
      text_step_2: '2 - Faites très attention à ne pas déclencher l’arme durant cette manipulation. Dévisser la baguette à l’avant du tube magasin',
      text_step_3: '3 - Retirer complètement la baguette du magasin',
      text_step_4: '4 - Vider le magasin en tapotant l’arme orientée légèrement vers le bas',
      text_step_5: '5 - Actionner le levier de sous garde jusqu’en position basse et retirer la munition éventuelle de la chambre',
      text_step_6: '6 - Contrôler visuellement que la chambre est vide',
      img: levierSousGardeMagasinAvant,
      video: '',
    },
    fixed_magazine: {
      label: 'Pas d’embout',
      value: 'fixed_magazine',
      text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
      text_step_2: '2 - Abaisser le levier de sous garde en position basse et retirer la munition éventuelle de la chambre',
      text_step_3: '3 - <span class="red font-bold">(Veiller à ne pas appuyer sur la queue de détente pendant cette manipulation!)</span> <br> Relever et abaisser le levier de sous garde tout en extrayant les munitions tant qu’il y a toujours des munitions présentes dans le tube magasin',
      text_step_4: '4 - Contrôler visuellement que la chambre est vide',
      img: levierSousGardePasMagasin,
      video: '',
    },
  },
}
