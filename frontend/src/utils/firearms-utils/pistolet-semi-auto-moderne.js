import pistoletSemiAutoModerne1Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-1_arrow1.jpg'
import pistoletSemiAutoModerne1Video from '@/assets/guide-factice/videos/pistol-1_sm.mp4'
import pistoletSemiAutoModerne2Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-2_arrow1.jpg'
import pistoletSemiAutoModerne2Video from '@/assets/guide-factice/videos/pistol-2_sm.mp4'
import pistoletSemiAutoModerneCartridges from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-cartridges.jpg'
import pistoletSemiAutoModerneBalls from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-balls.jpg'
/*
Pistolets semi-auto modernes
  Bouton pontet
  Poussoir talon
*/
export const pistolet_semi_auto_moderne = {
  displayLabel: 'pistolet semi-automatique moderne',
  category: 'B',
  mention: 'Soumise à autorisation',
  isDummyTypology: true,
  isSecuringOptions: true,
  pistolet_semi_auto_moderne_text_option: 'Sélectionner ce que vous voyez sur votre arme : <span class="font-bold">bouton à proximité du pontet du côté gauche de la poignée</span>, OU <span class="font-bold">bouton sur le talon</span> de la crosse.',
  options: {
    bouton_pontet: {
      label: 'bouton pontet',
      value: 'pontet',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold">extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne1Img,
      video: pistoletSemiAutoModerne1Video,
    },
    poussoir_talon: {
      label: 'poussoir talon',
      value: 'talon',
      text: '<span class="font-bold">Pousser le  bouton vers l’arrière</span>  avec le pouce de l’autre main, puis <span class="font-bold">extraire le chargeur</span> de la même main en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne2Img,
      video: pistoletSemiAutoModerne2Video,
    },
  },
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
}
