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
  getCategory: (gunLength: number, gunBarrelLength: number) => {
    if (gunLength && gunBarrelLength) { return (gunLength > 75 && gunBarrelLength > 40) ? 'C' : 'B' } else { return 'B ou C' }
  },
  options_text: 'Sélectionnez ce que vous voyez sur la <span class="font-bold">zone centrale de l’arme</span>',
  securingSteps: [
    {
      text: 'Observez la position de la clé et sélectionnez ce que vous voyez :',
      options: [
        {
          label: 'Clé supérieure',
          value: 'cle_pouce',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Pousser sur la clef d’ouverture à l’aide de votre pouce, et ouvrir l’arme en la cassant tout en restant appuyé sur la clef',
            '<span class="font-bold">Retirer les munitions</span> éventuelles',
            'Contrôler visuellement les chambres',
          ],
          timeVideo: '30 sec',
          img: epauleAUnCoupParCanonClePouceImg,
          video: epauleAUnCoupParCanonClePouceVideo,
        },
        {
          label: 'Grande clé sous le canon',
          value: 'cle_lefaucheux',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Repérer la clef présente sous les canons',
            '<span class="font-bold"></span>Tourner la clef vers la droite',
            'Ouvrir l’arme en la cassant',
            '<span class="font-bold">Retirer les munitions</span> éventuelles',
            'Contrôler visuellement les chambres',
          ],
          timeVideo: '40 sec',
          img: epauleAUnCoupParCanonCleLechaufeuxImg,
          video: epauleAUnCoupParCanonCleLefaucheuxVideo,
        },
        {
          label: 'Clé à oreilles',
          value: 'cle_darne',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Tirer sur les oreilles vers l’arrière',
            'Tirez pour faire coulisser la culasse vers l’arrière',
            '<span class="font-bold">Retirer les munitions</span> éventuelles',
            'Contrôler visuellement que la chambre est vide',
          ],
          timeVideo: '30 sec',
          img: epauleAUnCoupParCanonCleDarneImg,
          video: epauleAUnCoupParCanonCleDarneVideo,
        },
      ],
    },
  ],
} as const
