import epauleAUnCoupParCanonCleDarneImg from '@/assets/guide-mise-en-securite/photos/epaule_a_un_coup_par_canon/epaule_un_coup_cle_darne.jpg'
import epauleAUnCoupParCanonClePouceImg from '@/assets/guide-mise-en-securite/photos/epaule_a_un_coup_par_canon/epaule_un_coup_cle_pouce.jpg'
import epauleAUnCoupParCanonCleLechaufeuxImg from '@/assets/guide-mise-en-securite/photos/epaule_a_un_coup_par_canon/epaule_un_coup_cle_lefaucheux.jpg'
import epauleAUnCoupParCanonCleDarneVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_un_coup_par_canon/cle-darne.mp4'
import epauleAUnCoupParCanonClePouceVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_un_coup_par_canon/cle-pouce.mp4'
import epauleAUnCoupParCanonCleLefaucheuxVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_un_coup_par_canon/cle-lefaucheux.mp4'
/*
Armes d’épaule à un coup par canon
  Clé de pouce
  Clé Lefaucheux
  Clé Darne
  */
export const epaule_a_un_coup_par_canon = {
  displayLabel: "Arme d'épaule à un coup par canon",
  category: 'C',
  mention: 'Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  options_text: 'Sélectionnez ce que vous voyez sur la <span class="font-bold">zone centrale de l’arme</span>',
  options: {
    cle_pouce: {
      label: 'Clé supérieure',
      value: 'cle_pouce',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Pousser sur la clef d’ouverture à l’aide de votre pouce, et ouvrir l’arme en la cassant tout en restant appuyé sur la clef',
        3: '<span class="font-bold">Retirer les munitions</span> éventuelles',
        4: 'Contrôler visuellement les chambres',
      },
      img: epauleAUnCoupParCanonClePouceImg,
      video: epauleAUnCoupParCanonClePouceVideo,
    },
    cle_lefaucheux: {
      label: 'Grande clé sous le canon',
      value: 'cle_lefaucheux',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Repérer la clef présente sous les canons',
        3: '<span class="font-bold"></span>Tourner la clef vers la droite',
        4: 'Ouvrir l’arme en la cassant',
        5: '<span class="font-bold">Retirer les munitions</span> éventuelles',
        6: 'Contrôler visuellement les chambres',
      },
      img: epauleAUnCoupParCanonCleLechaufeuxImg,
      video: epauleAUnCoupParCanonCleLefaucheuxVideo,
    },
    cle_darne: {
      label: 'Clé à oreilles',
      value: 'cle_darne',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Tirer sur les oreilles vers l’arrière',
        3: 'Tirez pour faire coulisser la culasse vers l’arrière',
        4: '<span class="font-bold">Retirer les munitions</span> éventuelles',
        5: 'Contrôler visuellement que la chambre est vide',
      },
      img: epauleAUnCoupParCanonCleDarneImg,
      video: epauleAUnCoupParCanonCleDarneVideo,
    },
  },
}
