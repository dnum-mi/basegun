import pistoletSemiAutoPontetImg from '@/assets/guide-mise-en-securite/photos/pistolet_semi_auto_moderne/pistolet_semi_auto_pontet.jpg'
import pistoletSemiAutoPontetVideo from '@/assets/guide-mise-en-securite/videos/pistolet_semi_auto_moderne/pistolet_pontet.mp4'
import pistoletSemiAutoTalonImg from '@/assets/guide-mise-en-securite/photos/pistolet_semi_auto_moderne/pistolet_semi_auto_talon.jpg'
import pistoletSemiAutoTalonVideo from '@/assets/guide-mise-en-securite/videos/pistolet_semi_auto_moderne/pistolet_talon.mp4'
import pistoletSemiAutoModerneCartridges from '@/assets/guide-identification/photos/pistolet_semi_auto_moderne/pistolet_sa_moderne_chargeur_cartouche.jpg'
import pistoletSemiAutoModerneBalls from '@/assets/guide-identification/photos/pistolet_semi_auto_moderne/pistolet_sa_moderne_chargeur_bille.jpg'
/*
Pistolets semi-auto modernes
  Bouton pontet
  Poussoir talon
*/
export const pistolet_semi_auto_moderne = {
  displayLabel: 'Pistolet semi-automatique',
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
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        2: '<span class="font-bold">Appuyer sur le bouton de déverrouillage</span> de chargeur situé à l’arrière du pontet',
        3: '<span class="font-bold">Retirer le chargeur de l’arme</span>',
        4: 'Tirer la glissière vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
        5: 'Actionner la culasse d’avant en arrière',
        6: 'Contrôler visuellement que la chambre est vide',
      },
      img: pistoletSemiAutoPontetImg,
      video: pistoletSemiAutoPontetVideo,
    },
    poussoir_talon: {
      label: 'poussoir talon',
      value: 'poussoir_talon',
      text_steps: {
        1: 'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
        2: '<span class="font-bold">Appuyer sur le bouton de déverrouillage de chargeur</span> situé sous la poignée',
        3: '<span class="font-bold">Retirer le chargeur de l’arme</span>',
        4: 'Tirer la glissière vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
        5: 'Actionner la culasse d’avant en arrière',
        6: 'Contrôler visuellement que la chambre est vide',
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
