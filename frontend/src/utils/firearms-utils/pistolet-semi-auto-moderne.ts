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
  getCategory: () => 'B',
  pistolet_semi_auto_moderne_text_option: 'Sélectionner ce que vous voyez sur votre arme : <span class="font-bold">bouton à proximité du pontet du côté gauche de la poignée</span>, OU <span class="font-bold">bouton sur le talon</span> de la crosse.',
  textOptions: '',
  securingSteps: [
    {
      options: [
        {
          label: 'Bouton à côté du pontet',
          value: 'bouton_pontet',
          text_steps: [
            'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
            '<span class="font-bold">Appuyer sur le bouton de déverrouillage</span> de chargeur situé à l’arrière du pontet',
            '<span class="font-bold">Retirer le chargeur de l’arme</span>',
            'Tirer la glissière vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
            'Actionner la culasse d’avant en arrière',
            'Contrôler visuellement que la chambre est vide',
          ],
          timeVideo: '30 sec',
          img: pistoletSemiAutoPontetImg,
          video: pistoletSemiAutoPontetVideo,
        },
        {
          label: 'Poussoir sous le talon',
          value: 'poussoir_talon',
          text_steps: [
            'Analyser l’arme en  <span class="font-bold">direction sécurisée</span> ',
            '<span class="font-bold">Appuyer sur le bouton de déverrouillage de chargeur</span> situé sous la poignée',
            '<span class="font-bold">Retirer le chargeur de l’arme</span>',
            'Tirer la glissière vers l’arrière pour <span class="font-bold">extraire la munition</span> éventuelle',
            'Actionner la culasse d’avant en arrière',
            'Contrôler visuellement que la chambre est vide',
          ],
          timeVideo: '25 sec',
          img: pistoletSemiAutoTalonImg,
          video: pistoletSemiAutoTalonVideo,
        },
      ],
    },
  ],
  dummyOptions: [
    {
      label: 'Cartouches',
      value: 'cartouches',
      img_ammo: pistoletSemiAutoModerneCartridges,
    },
    {
      label: 'Billes',
      value: 'billes',
      img_ammo: pistoletSemiAutoModerneBalls,
    },
  ],
  getDisclaimer: (category: string) => {
    if (category === 'D') {
      return 'Les <strong>armes d’alarmes</strong> sont susceptibles d’être <strong>modifiées pour tirer des munitions létales</strong>. Pour des raisons de sécurité, <strong>faites si possible expertiser l’arme.</strong>'
    }
  },
} as const
