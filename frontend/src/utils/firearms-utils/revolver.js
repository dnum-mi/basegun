import revolver1ChemineesImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_1_cheminees.jpg'
import revolver21873USImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_1873_US.jpg'
import revolver21873USVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_US.mp4'
import revolver2AxeBarilletImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_axe_barillet.jpg'
import revolver2AxeBarilletVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_axe_barillet.mp4'
import revolver2CartouchesImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_cartouches.jpg'
// import revolver2EwBrisureImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_ew_brisure.jpg'
// import revolver2EwBrisureVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_ew_brisure.mp4'
import revolver2PortiereImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_portiere.jpg'
import revolver2PortiereVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_FR.mp4'
import revolver2SwBrisureImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_sw_brisure.jpg'
import revolver2SwBrisureVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_sw_brisure.mp4'
import revolver31892Img from '@/assets/guide-mise-en-securite/photos/revolver/revolver_3_1892.jpg'
import revolver31892Video from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1892.mp4'
import revolverCartridges from '@/assets/guide-factice/images/revolver/revolver-cartridges-arrow.jpg'
import revolverBalls from '@/assets/guide-factice/images/revolver/revolver-balls-arrow.jpg'
/*
Revolvers
  Revolver Enfield - Webley - brisure
  Revolver type 1873 à portière FR
  Revolver type 1873 à portière US
  Revolvers à axe de barillet
  Revolvers bouton côté barillet
  Revolvers ouverture Smith & Wesson ancien H&R brisure
  Revolvers verrou MOD 1892
*/
export const revolver = {
  displayLabel: 'revolver',
  category: 'B ou D',
  mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  isDummyTypology: true,
  isSecuringOptions: true,
  revolver_text_option: '',
  textOptions: 'En maintenant l’arme dans une <span class="font-bold">direction sécurisée</span>, tournez-la pour observer l’arrière du barillet. Sélectionnez ce que vous voyez.',
  pre_select: {
    black_powder: {
      label: 'Petites Cheminées',
      value: 'revolver_black_powder',
    },
    bullets: {
      label: 'Arrière plat',
      value: 'revolver_bullets',
    },
  },
  options: {
    revolver_enfield: {
      label: 'Revolver Enfield',
      value: 'revolver_enfield',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - appuyer sur le levier de déverrouillage côté gauche de l’arme (pouce main droite)',
        text_step_3: '3 - Casser/basculer l’ensemble canon et barillet',
        text_step_4: '4 - Retourner l’arme et vider les munitions éventuelles du barillet',
        text_step_5: '5 - Contrôler visuellement que les chambres sont vides',
      },
      img: revolver1ChemineesImg,
    },
    revolver_1873_fr: {
      label: 'Revolver 1873 fr',
      value: 'revolver_1873_fr',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Tirer le haut du levier de verrouillage de barillet vers l’arrière',
        text_step_3: '3 - Tirer légèrement le chien/marteau vers l’arrière jusqu’à entendre un premier clic',
        text_step_4: '4 - Faire tourner le barillet jusqu’à trouver une munition',
        text_step_5: '5 - Déverrouiller la tringle d’éjection en tournant son extrémité d’un quart de tour',
        text_step_6: '6 - Actionner la tringle d’extraction vers l’arrière pour chaque chambre du barillet contenant une munition',
        text_step_7: '7 - Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
      },
      img: revolver2CartouchesImg,
    },
    revolver_1873_us: {
      label: 'Revolver 1873 us',
      value: 'revolver_1873_us',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Tirer légèrement le chien/marteau vers l’arrière jusqu’à entendre un premier clic',
        text_step_3: '3 - Ouvrir la portière pivotante sur la droite',
        text_step_4: '4 - Actionner la tringle d’extraction vers l’arrière pour chaque chambre du barillet',
        text_step_5: '5 - Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
      },
      img: revolver21873USImg,
      video: revolver21873USVideo,
    },
    revolver_axe_barillet: {
      label: 'Revolver axe barillet',
      value: 'revolver_axe_barillet',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Tirer l’axe du barillet vers l’avant et basculer le barillet sur le côté',
        text_step_3: '3 - Pencher l’arme légèrement vers l’arrière',
        text_step_4: '4 - Appuyer sur l’axe du barillet vers l’arrière pour extraire les cartouches',
        text_step_5: '5 - Contrôler visuellement que les chambres sont bien vides',
      },
      img: revolver2AxeBarilletImg,
      video: revolver2AxeBarilletVideo,
    },
    revolver_bouton_barillet: {
      label: 'Revolver bouton barillet',
      value: 'revolver_bouton_barillet',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Tirer ou pousser le bouton de déverrouillage du barillet situé côté gauche vers l’avant',
        text_step_3: '3 - Basculer le barillet sur le côté',
        text_step_4: '4 - Pencher l’arme légèrement vers l’arrière',
        text_step_5: '5 - Vider les munitions éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barillet',
        text_step_6: '6 - Contrôler visuellement que les chambres sont vides',
      },
      img: revolver2PortiereImg,
      video: revolver2PortiereVideo,
    },
    revolver_ancien_brisure: {
      label: 'Revolver ancien brisure',
      value: 'revolver_ancien_brisure',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Soulever le verrou en appuyant sur son petit bouton poussoir et casser/basculer l’ensemble canon et barille',
        text_step_3: '3 - Retourner l’arme afin de disposer l’arrière du barillet vers le bas et vider les munitions',
        text_step_4: '4 - Contrôler visuellement les chambres du barillet',
      },
      img: revolver2SwBrisureImg,
      video: revolver2SwBrisureVideo,
    },
    revolver_verrou_1892: {
      label: 'Revolver verrou 1892',
      value: 'revolver_verrou_1892',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Tirer le haut du levier de verrouillage de barillet vers l’arrière',
        text_step_3: '3 - Basculer le barillet sur le côté',
        text_step_4: '4 - Pencher l’arme légèrement vers l’arrière',
        text_step_5: '5 - Vider les munitions éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barille',
        text_step_6: '6 - Contrôler visuellement que les chambres sont vides',
      },
      img: revolver31892Img,
      video: revolver31892Video,
    },
  },
  guideFactice: {
    cartouches: {
      label: 'balles',
      value: 'cartouches',
      img_ammo: revolverCartridges,
    },
    billes: {
      label: 'bille ou trou pour billes',
      value: 'billes',
      img_ammo: revolverBalls,
    },
  },
}
