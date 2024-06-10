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
import revolver2PortiereVideoDebut from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_FR_debut.mp4'
import revolver2PortiereVideoFin from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1873_portiere_FR_fin.mp4'
import revolver2SwBrisureImg from '@/assets/guide-mise-en-securite/photos/revolver/revolver_2_sw_brisure.jpg'
import revolver2SwBrisureVideo from '@/assets/guide-mise-en-securite/videos/revolver/revolver_sw_brisure.mp4'
import revolver31892Img from '@/assets/guide-mise-en-securite/photos/revolver/revolver_3_1892.jpg'
import revolver31892Video from '@/assets/guide-mise-en-securite/videos/revolver/revolver_1892.mp4'
import revolverCartridges from '@/assets/guide-identification/photos/revolver/revolver_cartouche_pleine.jpg'
import revolverBalls from '@/assets/guide-identification/photos/revolver/revolver_cartouche_bille.jpg'

import { isAlarmGun } from '@/utils/firearms-utils/index'
import { useStore } from '@/stores/result'
const store = useStore()

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
  getCategory: () => {
    if (isAlarmGun() || store.selectedOptions[0] === 'revolver_black_powder') return 'D'
    else if (store.selectedOptions[0] === undefined || ['revolver_ancien_brisure', 'revolver_1873_us', 'revolver_enfield'].includes(store.selectedOptions[1])) return 'B ou D'
    else return 'B'
  },
  securingSteps: [
    {
      text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span> , sélectionnez ce que vous voyez.',
      options: [
        {
          label: 'Petites Cheminées',
          value: 'revolver_black_powder',
          img: revolver1ChemineesImg,
        },
        {
          label: 'Arrière plat',
          value: 'revolver_bullets',
          img: revolver2CartouchesImg,
        },
      ],
    },
    {
      text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span>, tournez-la pour observer l’arrière du barillet. Sélectionnez ce que vous voyez.',
      options: [
        {
          label: 'Bouton à côté du barillet',
          value: 'revolver_bouton_barillet',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Tirer ou pousser le <span class="font-bold">bouton de déverrouillage</span> du barillet situé côté gauche vers l’avant',
            '<span class="font-bold">Basculer le barillet</span> sur le côté',
            'Pencher l’arme légèrement vers l’arrière',
            '<span class="font-bold">Vider les munitions</span> éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barillet',
            'Contrôler visuellement que les chambres sont vides',
          ],
          timeVideo: '25 sec',
          img: revolver2BoutoneBarilletImg,
          video: revolver2BoutoneBarilletVideo,
        },
        {
          label: 'Portière qui cache le côté droit du barillet',
          value: 'revolver_portiere',
          img: revolver2PortiereImg,
        },
        {
          label: 'Encoche près du chien sur côté droit barillet',
          value: 'revolver_1873_us',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Tirer légèrement le chien/marteau vers l’arrière jusqu’à <span class="font-bold">entendre un premier clic</span>',
            'Ouvrir la portière pivotante sur la droite',
            'Actionner la tringle d’extraction vers l’arrière pour chaque chambre du barillet',
            'Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
          ],
          timeVideo: '45 sec',
          img: revolver21873USImg,
          video: revolver21873USVideo,
        },
        {
          label: 'Levier côté gauche du barillet',
          value: 'revolver_enfield',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Appuyer sur le levier de déverrouillage côté gauche de l’arme',
            'Casser/basculer l’ensemble canon et barillet',
            'Retourner l’arme et <span class="font-bold">vider les munitions</span> éventuelles du barillet',
            'Contrôler visuellement que les chambres sont vides',
          ],
          timeVideo: '25 sec',
          img: revolver2EwBrisureImg,
          video: revolver2EwBrisureVideo,
        },
        {
          label: 'Verrou en T à l’avant du chien',
          value: 'revolver_ancien_brisure',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Soulever le verrou en appuyant sur son petit bouton poussoir et casser/basculer l’ensemble canon et barillet',
            'Retourner l’arme afin de disposer l’arrière du barillet vers le bas et <span class="font-bold">vider les munitions</span>',
            'Contrôler visuellement les chambres du barillet',
          ],
          timeVideo: '25 sec',
          img: revolver2SwBrisureImg,
          video: revolver2SwBrisureVideo,
        },
        {
          label: 'Aucun des systèmes précédents',
          value: 'revolver_axe_barillet',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Tirer l’axe du barillet vers l’avant et basculer le barillet sur le côté',
            'Pencher l’arme légèrement vers l’arrière',
            'Appuyer sur l’axe du barillet vers l’arrière pour <span class="font-bold">extraire les cartouches</span>',
            'Contrôler visuellement que les chambres sont bien vides',
          ],
          timeVideo: '25 sec',
          img: revolver2AxeBarilletImg,
          video: revolver2AxeBarilletVideo,
        },
      ],
    },
    {
      text: 'En maintenant l’arme dans une  <span class="font-bold">direction sécurisée</span>, tirez la portière vers l’arrière avec le pouce, puis essayez de pousser sur un côté du barillet pour le faire basculer.',
      video_post_text: 'Sélectionner le comportement de votre barillet : le barillet <span class="font-bold"> ne bascule pas</span>, ou le barillet <span class="font-bold">bascule.</span>',
      video_title: 'Titre de la vidéo',
      video: revolver2PortiereVideoDebut,
      options: [
        {
          label: 'Le barillet ne bascule pas',
          value: 'revolver_1873_fr',
          text_steps: [
            '<span class="font-bold">Faire tourner le barillet</span> jusqu’à trouver une munition',
            '<span class="font-bold">Déverrouiller la tringle d’éjection</span> en tournant son extrémité d’un quart de tour',
            '<span class="font-bold">Actionner la tringle d’extraction vers l’arrière</span> pour chaque chambre du barillet contenant une munition',
            'Contrôler que chaque chambre est bien vide en faisant tourner le barillet',
          ],
          timeVideo: '25 sec',
          img: revolver3PortiereImg,
          video: revolver2PortiereVideoFin,
        },
        {
          label: 'Le barillet bascule',
          value: 'revolver_verrou_1892',
          text_steps: [
            '<span class="font-bold">Basculer le barillet</span> sur le côté',
            'Pencher l’arme légèrement vers l’arrière',
            '<span class="font-bold">Vider les munitions</span> éventuelles du barillet en appuyant sur la tige d’extraction située à l’avant du barillet',
            'Contrôler visuellement que les chambres sont vides',
          ],
          timeVideo: '20 sec',
          img: revolver31892Img,
          video: revolver31892Video,
        },
      ],
    },
  ],
  dummyOptions: [
    {
      label: 'Balles',
      value: 'cartouches',
      img_ammo: revolverCartridges,
    },
    {
      label: 'Billes ou trou pour billes',
      value: 'billes',
      img_ammo: revolverBalls,
    },
  ],
  getDisclaimer: () => {
    if (isAlarmGun()) {
      return 'Les <strong>armes d’alarmes</strong> sont susceptibles d’être <strong>modifiées pour tirer des munitions létales</strong>. Pour des raisons de sécurité, <strong>faites si possible expertiser l’arme.</strong>'
    }
  },
} as const
