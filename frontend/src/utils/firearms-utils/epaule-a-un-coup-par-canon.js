import epauleAUnCoupParCanonCleDarne from '@/assets/guide-mise-en-securite/photos/epaule_a_un_coup_par_canon/epaule_a_un_coup_par_canon_cle_darne.jpg'
/*
Armes d’épaule à un coup par canon
  Clé de pouce
  Clé Lefaucheux
  Clé Darne
  */
export const epaule_a_un_coup_par_canon = {
  displayLabel: "arme d'épaule à un coup par canon",
  category: 'C',
  mention: 'Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  textOptions: 'Sélectionnez ce que vous voyez <span class="font-bold">à la base du canon</span> sur le haut de la crosse',
  options: {
    cle_pouce: {
      label: 'Clé supérieure',
      value: 'cle-pouce',
      text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
      text_step_2: '2 - Pousser sur la clef d’ouverture à l’aide de votre pouce, et ouvrir l’arme en la cassant tout en restant appuyé sur la clef',
      text_step_3: '3 - Retirer les munitions éventuelles',
      text_step_4: '4 - Contrôler visuellement les chambres',
      img: epauleAUnCoupParCanonCleDarne,
      video: 'test',
    },
    cle_lefaucheux: {
      label: 'Grande clé sous le canon',
      value: 'cle_lefaucheux',
      text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
      text_step_2: '2 - Repérer la clef présente sous les canons',
      text_step_3: '3 - Tourner la clef vers la droite',
      text_step_4: '4 - Ouvrir l’arme en la cassant',
      text_step_5: '5 - Retirer les munitions éventuelles',
      text_step_6: '6 - Contrôler visuellement les chambres',
      img: epauleAUnCoupParCanonCleDarne,
      video: 'test',
    },
    cle_darne: {
      label: 'Clé à oreilles',
      value: 'cle_darne',
      text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
      text_step_2: '2 - Tirer sur les oreilles vers l’arrière',
      text_step_3: '3 - Tirez pour faire coulisser la culasse vers l’arrière',
      text_step_4: '4 - Retirer les munitions éventuelles',
      text_step_5: '5 - Contrôler visuellement que la chambre est vide',
      img: epauleAUnCoupParCanonCleDarne,
      video: 'test',
    },
  },
}
