import epauleAVerrouCartridges from '@/assets/guide-identification/photos/epaule_a_verrou/epaule_a_verrou_chargeur_cartouche.jpg'
import epauleAVerrouBalls from '@/assets/guide-identification/photos/epaule_a_verrou/epaule_a_verrou_chargeur_bille.jpg'
import epauleAVerrouVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_verrou/epaule_verrou_chargeur-video.mp4'
import { getEpaulLevierVerrouDisclaimer, getCommonCategory } from '@/utils/firearms-utils/index'
import PopupVideo from '@/components/PopupVideo.vue'

/*
Armes d’épaule à verrou
*/
export const epaule_a_verrou = {
  displayLabel: 'Arme d’épaule à verrou',
  getCategory: getCommonCategory,
  isDummyTypology: true,
  securingSteps: [
    {
      options: [
        {
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Ouvrez la culasse en tirant le levier vers le haut puis en la tirant la culasse vers l’arrière',
            PopupVideo,
            'Retourner l’arme et chercher la présence éventuelle de levier ou bouton devant le pontet en indiquant la présence d’un chargeur externe. Si tel est le cas, <span class="font-bold">extraire le chargeur</span> en appuyant ou en tirant sur ces derniers<br>',
            'Si vous n’avez pas enlevé de chargeur, <span class="font-bold">vider le magasin des munitions</span> éventuelles en les faisant glisser vers l’avant à l’aide de votre pouce<br>',
            'Contrôler visuellement la chambre',
          ],
          timeVideo: '1 min',
          video: epauleAVerrouVideo,
        },
      ],
    },
  ],
  guideFactice: {
    cartouches: {
      label: 'Balles',
      value: 'cartouches',
      img_ammo: epauleAVerrouCartridges,
    },
    billes: {
      label: 'Billes ou trou pour billes',
      value: 'billes',
      img_ammo: epauleAVerrouBalls,
    },
  },
  getDisclaimer: getEpaulLevierVerrouDisclaimer,
} as const
