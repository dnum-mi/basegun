import pistoletSemiAutoPontetImg from '@/assets/guide-mise-en-securite/photos/pistolet_semi_auto_moderne/pistolet_pontet.jpg'
import pistoletSemiAutoPontetVideo from '@/assets/guide-mise-en-securite/videos/pistolet_semi_auto_moderne/pistolet_pontet.mp4'
import pistoletSemiAutoTalonImg from '@/assets/guide-mise-en-securite/photos/pistolet_semi_auto_moderne/pistolet_talon.jpg'
import pistoletSemiAutoTalonVideo from '@/assets/guide-mise-en-securite/videos/pistolet_semi_auto_moderne/pistolet_talon.mp4'
import pistoletSemiAutoModerneCartridges from '@/assets/guide-factice/photos/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-cartridges.jpg'
import pistoletSemiAutoModerneBalls from '@/assets/guide-factice/photos/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-balls.jpg'
/*
Pistolets semi-auto modernes
  Bouton pontet
  Poussoir talon
*/
export const pistolet_semi_auto_moderne = {
  displayLabel: 'pistolet semi-automatique',
  category: 'B',
  mention: 'Soumise à autorisation',
  isDummyTypology: true,
  isSecuringOptions: true,
  pistolet_semi_auto_moderne_text_option: 'Sélectionner ce que vous voyez sur votre arme : <span class="font-bold">bouton à proximité du pontet du côté gauche de la poignée</span>, OU <span class="font-bold">bouton sur le talon</span> de la crosse.',
  textOptions: '',
  options: {
    bouton_pontet: {
      label: 'bouton pontet',
      value: 'bouton_pontet',
      text_steps: {
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Appuyer sur le bouton de déverrouillage de chargeur situé à l’arrière du pontet',
        text_step_3: 'Retirer le chargeur de l’arme',
        text_step_4: 'Tirer la glissière vers l’arrière pour extraire  la munition éventuelle',
        text_step_5: 'Actionner la culasse d’avant en arrière',
        text_step_6: 'Contrôler visuellement que la chambre est vide',
      },
      img: pistoletSemiAutoPontetImg,
      video: pistoletSemiAutoPontetVideo,
    },
    poussoir_talon: {
      label: 'poussoir talon',
      value: 'poussoir_talon',
      text_steps: {
        text_step_1: 'Analyser l’arme en direction sécurisée',
        text_step_2: 'Appuyer sur le bouton de déverrouillage de chargeur situé sous la poignée',
        text_step_3: 'Retirer le chargeur de l’arme',
        text_step_4: 'Tirer la glissière vers l’arrière pour extraire  la munition éventuelle',
        text_step_5: 'Actionner la culasse d’avant en arrière',
        text_step_6: 'Contrôler visuellement que la chambre est vide',
      },
      img: pistoletSemiAutoTalonImg,
      video: pistoletSemiAutoTalonVideo,
    },
  },
  guideFactice: {
    cartouche: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: pistoletSemiAutoModerneCartridges,
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: pistoletSemiAutoModerneBalls,
    },
  },
}
