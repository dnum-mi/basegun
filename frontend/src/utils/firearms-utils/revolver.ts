import revolver1ChemineesImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_1_cheminees.jpg'
import revolver2CartouchesImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_cartouches.jpg'
import revolver21873USImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_1873_US.jpg'
import revolver21873USVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_US.mp4'
import revolver2AxeBarilletImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_axe_barillet.jpg'
import revolver2AxeBarilletVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_axe_barillet.mp4'
import revolver2BoutoneBarilletImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_bouton_barillet.jpg'
import revolver2BoutoneBarilletVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_bouton_barillet.mp4'
import revolver2EwBrisureImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_ew_brisure.jpg'
import revolver2EwBrisureVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_ew_brisure.mp4'
import revolver2PortiereImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_portiere.jpg'
import revolver3PortiereImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_3_1873_FR.jpg'
import revolver2PortiereVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_FR.mp4'
import revolver2SwBrisureImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_sw_brisure.jpg'
import revolver2SwBrisureVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_sw_brisure.mp4'
import revolver31892Img from '@/assets/guide-mise-en-securite/photos/revolver/revolver_3_1892.jpg'
import revolver31892Video from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1892.mp4'
import revolverCartridges from '@/assets/guide-identification/photos/revolver/revolver_cartouche_pleine.jpg'
import revolverBalls from '@/assets/guide-identification/photos/revolver/revolver_cartouche_bille.jpg'
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
  displayLabel: 'Revolver',
  category: 'B',
  categoryWithoutSecuring: 'B ou D',
  isDummyTypology: true,
  options_step_1_text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span> , sélectionnez ce que vous voyez.',
  options_step_1: {
    black_powder: {
      label: 'Petites Cheminées',
      value: 'revolver_black_powder',
      img: revolver1ChemineesImg,
    },
    bullets: {
      label: 'Arrière plat',
      value: 'revolver_bullets',
      img: revolver2CartouchesImg,
    },
  },
  options_step_2_text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span>, tournez-la pour observer l’arrière du barillet. Sélectionnez ce que vous voyez.',
  options_step_2: {
    revolver_bouton_barillet: {
      label: 'Bouton à côté du barillet',
      value: 'revolver_bouton_barillet',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Tirer ou pousser le <span class="font-bold">bouton de déverrouillage</span> du barillet situé côté gauche vers l’avant',
        3: '<span class="font-bold">Basculer le barillet</span> sur le côté',
        4: 'Pencher l’arme légèrement vers l’arrière',
        5: '<span class="font-bold">Vider les munitions</span> éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barillet',
        6: 'Contrôler visuellement que les chambres sont vides',
      },
      img: revolver2BoutoneBarilletImg,
      video: revolver2BoutoneBarilletVideo,
    },
    revolver_portiere: {
      label: 'Portière qui cache le côté droit du barillet',
      value: 'revolver_portiere',
      img: revolver2PortiereImg,
    },
    revolver_1873_us: {
      label: 'Encoche près du chien sur côté droit barillet',
      value: 'revolver_1873_us',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Tirer légèrement le chien/marteau vers l’arrière jusqu’à <span class="font-bold">entendre un premier clic</span>',
        3: 'Ouvrir la portière pivotante sur la droite',
        4: 'Actionner la tringle d’extraction vers l’arrière pour chaque chambre du barillet',
        5: 'Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
      },
      img: revolver21873USImg,
      video: revolver21873USVideo,
    },
    revolver_enfield: {
      label: 'Levier côté gauche du barillet',
      value: 'revolver_enfield',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Appuyer sur le levier de déverrouillage côté gauche de l’arme',
        3: 'Casser/basculer l’ensemble canon et barillet',
        4: 'Retourner l’arme et <span class="font-bold">vider les munitions</span> éventuelles du barillet',
        5: 'Contrôler visuellement que les chambres sont vides',
      },
      img: revolver2EwBrisureImg,
      video: revolver2EwBrisureVideo,
    },
    revolver_ancien_brisure: {
      label: 'Verrou en T à l’avant du chien',
      value: 'revolver_ancien_brisure',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Soulever le verrou en appuyant sur son petit bouton poussoir et casser/basculer l’ensemble canon et barillet',
        3: 'Retourner l’arme afin de disposer l’arrière du barillet vers le bas et <span class="font-bold">vider les munitions</span>',
        4: 'Contrôler visuellement les chambres du barillet',
      },
      img: revolver2SwBrisureImg,
      video: revolver2SwBrisureVideo,
    },
    revolver_axe_barillet: {
      label: 'Aucun des systèmes précédents',
      value: 'revolver_axe_barillet',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Tirer l’axe du barillet vers l’avant et basculer le barillet sur le côté',
        3: 'Pencher l’arme légèrement vers l’arrière',
        4: 'Appuyer sur l’axe du barillet vers l’arrière pour <span class="font-bold">extraire les cartouches</span>',
        5: 'Contrôler visuellement que les chambres sont bien vides',
      },
      img: revolver2AxeBarilletImg,
      video: revolver2AxeBarilletVideo,
    },
  },
  // options_step_3_text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span>, tirez la portière vers l’arrière avec le pouce, puis essayez de pousser sur un côté du barillet pour le faire basculer.',
  // options_step_3_video_pre_text: 'Texte à afficher avant la vidéo',
  options_step_3_video_post_text: 'Sélectionner le comportement de votre barillet : le barillet <span class="font-bold"> ne bascule pas</span>, ou le barillet <span class="font-bold">bascule.</span>',
  options_step_3_video_title: 'Titre de la vidéo',
  options_step_3_video: revolver2PortiereVideo,
  options_step_3: {
    revolver_1873_fr: {
      label: 'Le barillet ne bascule pas',
      value: 'revolver_1873_fr',
      text_steps: {
        1: '<span class="font-bold">Faire tourner le barillet</span> jusqu’à trouver une munition',
        2: '<span class="font-bold">Déverrouiller la tringle d’éjection</span> en tournant son extrémité d’un quart de tour',
        3: '<span class="font-bold">Actionner la tringle d’extraction vers l’arrière</span> pour chaque chambre du barillet contenant une munition',
        4: 'Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
      },
      img: revolver3PortiereImg,
      video: revolver2PortiereVideo,
    },
    revolver_verrou_1892: {
      label: 'Le barillet bascule',
      value: 'revolver_verrou_1892',
      text_steps: {
        1: '<span class="font-bold">Basculer le barillet</span> sur le côté',
        2: 'Pencher l’arme légèrement vers l’arrière',
        3: '<span class="font-bold">Vider les munitions</span> éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barillet',
        4: 'Contrôler visuellement que les chambres sont vides',
      },
      img: revolver31892Img,
      video: revolver31892Video,
    },
  },
  guideFactice: {
    cartouches: {
      label: 'Balles',
      value: 'cartouches',
      img_ammo: revolverCartridges,
    },
    billes: {
      label: 'Billes ou trou pour billes',
      value: 'billes',
      img_ammo: revolverBalls,
    },
  },
  getDisclaimer: (category: string) => {
    if (category === 'D') {
      return 'Les <strong>armes d’alarmes</strong> sont susceptibles d’être <strong>modifiées pour tirer des munitions létales</strong>. Pour des raisons de sécurité, <strong>faites si possible expertiser l’arme.</strong>'
    }
  },
} as const

export const revolver_black_powder = {
  displayLabel: 'Revolver à poudre noire',
  category: 'D',
  isDummyTypology: false,
} as const
