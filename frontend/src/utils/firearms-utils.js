import revolver1Img from '@/assets/guide-factice/images/revolver/revolver-1_arrow.jpg'
import revolver1Video from '@/assets/guide-factice/videos/revolver-1_sm.mp4'
import revolver2Img from '@/assets/guide-factice/images/revolver/revolver-2_arrow.jpg'
import revolver2Video from '@/assets/guide-factice/videos/revolver-2_sm.mp4'
import revolverCartridges from '@/assets/guide-factice/images/revolver/revolver-cartridges-arrow.jpg'
import revolverBalls from '@/assets/guide-factice/images/revolver/revolver-balls-arrow.jpg'
import pistoletSemiAutoModerne1Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-1_arrow1.jpg'
import pistoletSemiAutoModerne1Video from '@/assets/guide-factice/videos/pistol-1_sm.mp4'
import pistoletSemiAutoModerne2Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-2_arrow1.jpg'
import pistoletSemiAutoModerne2Video from '@/assets/guide-factice/videos/pistol-2_sm.mp4'
import pistoletSemiAutoModerneCartridges from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-cartridges.jpg'
import pistoletSemiAutoModerneBalls from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-balls.jpg'
import autreEpauleAr15Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ar_arrow1.jpg'
import autreEpauleAr15Video from '@/assets/guide-factice/videos/ar_sm.mp4'
import autreEpauleAkImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ak_arrow1.jpg'
import autreEpauleAkVideo from '@/assets/guide-factice/videos/ak_sm.mp4'
import autreEpauleBullpupImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-bullpup_arrow1.jpg'
import autreEpauleBullpupVideo from '@/assets/guide-factice/videos/bullpup_sm.mp4'
import autreEpauleThompsonImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-thompson_arrow1.jpg'
import autreEpauleThompsonVideo from '@/assets/guide-factice/videos/thompson_sm.mp4'
import autreEpauleP90Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-p90_arrow1.jpg'
import autreEpauleP90Video from '@/assets/guide-factice/videos/p90_sm.mp4'
import autreEpaulePistoletMitralleurImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-pistolet-mitrailleur-arrow.jpg'
import autreEpaulePistoletMitralleurVideo from '@/assets/guide-factice/videos/pistolet_mitrailleur_sm.mp4'
import autreEpauleCartridges from '@/assets/guide-factice/images/autre_epaule/autre-epaule-cartridges.jpg'
import autreEpauleBalls from '@/assets/guide-factice/images/autre_epaule/autre-epaule-balls.jpg'

export const results = {
  autre_pistolet: {
    displayLabel: 'pistolet divers',
    category: 'A, B ou D',
    mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isDummyTypology: false,
  },
  epaule_a_levier_sous_garde: {
    displayLabel: "arme d'épaule à levier de sous-garde",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_a_pompe: {
    displayLabel: "arme d'épaule à pompe",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_a_un_coup_par_canon: {
    displayLabel: "arme d'épaule à un coup ou un coup par canon",
    category: 'C',
    mention: 'Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_a_verrou: {
    displayLabel: "arme d'épaule à verrou",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
    stepsNumber: 4,
  },
  epaule_mecanisme_ancien: {
    displayLabel: "arme d'épaule à mécanisme ancien",
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isDummyTypology: false,
  },
  epaule_semi_auto_style_chasse: {
    displayLabel: "arme d'épaule semi-automatique",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_semi_auto_style_militaire_milieu_20e: {
    displayLabel: "arme d'épaule semi-automatique ou automatique",
    category: 'A, B ou C',
    mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  pistolet_semi_auto_moderne: {
    displayLabel: 'pistolet semi-automatique',
    category: 'B',
    mention: 'Soumise à autorisation',
    isDummyTypology: true,
    stepsNumber: 4,
  },
  pistolet_mecanisme_ancien: {
    displayLabel: 'pistolet à mécanisme ancien',
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isDummyTypology: false,
  },
  revolver: {
    displayLabel: 'revolver',
    category: 'B ou D',
    mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isDummyTypology: true,
    stepsNumber: 4,
  },
  semi_auto_style_militaire_autre: {
    displayLabel: "arme semi-automatique ou automatique",
    category: 'A, B ou C',
    mention: 'A - Interdite<br>B - Soumise à autoriszation<br>C - Soumise à déclaration',
    isDummyTypology: true,
    stepsNumber: 4,
  },
}

export const guideFacticeSelectOption = {
  pistolet_semi_auto_moderne_text_option: 'Sélectionner ce que vous voyez sur votre arme : <span class="font-bold">bouton à proximité du pontet du côté gauche de la poignée</span>, OU <span class="font-bold">bouton sur le talon</span> de la crosse.',
  pistolet_semi_auto_moderne: {
    pontet: {
      label: 'bouton pontet',
      value: 'pontet',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold">extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne1Img,
      video: pistoletSemiAutoModerne1Video,
    },
    talon: {
      label: 'poussoir talon',
      value: 'talon',
      text: '<span class="font-bold">Pousser le  bouton vers l’arrière</span>  avec le pouce de l’autre main, puis <span class="font-bold">extraire le chargeur</span> de la même main en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne2Img,
      video: pistoletSemiAutoModerne2Video,
    },
  },
  semi_auto_style_militaire_autre_text_option: 'Sélectionner ce que vous voyez sur l’arme',
  semi_auto_style_militaire_autre: {
    bouton_dessus: {
      label: 'bouton au-dessus chargeur',
      value: 'bouton_dessus',
      text: '<span class="font-bold">Tenir l’arme</span> de la main droite. Avec l’index de cette main, <span class="font-bold">appuyer sur le bouton</span>. Avec l’autre main, <span class="font-bold">tirer le chargeur</span> vers le bas pour l’<span class="font-bold">extraire de la carcasse</span>.',
      img: autreEpauleAr15Img,
      video: autreEpauleAr15Video,
    },
    levier_derriere: {
      label: 'levier derrière chargeur',
      value: 'levier_derriere',
      text: 'A l’aide de la main qui ne tient pas l’arme, <span class="font-bold">appuyer avec le pouce sur le levier en maintenant le chargeur. Faire pivoter le chargeur</span> en le poussant légèrement vers l’avant pour l’extraire de la carcasse. Puis <span class="font-bold">relâcher le levier</span>.',
      img: autreEpauleAkImg,
      video: autreEpauleAkVideo,
    },
    chargeur_derriere: {
      label: 'chargeur derrière la poignée',
      value: 'chargeur_derriere',
      text: 'De la main qui ne tient pas l’arme, <span class="font-bold">appuyer</span> avec le pouce <span class="font-bold">sur le bouton situé à l\'arrière du chargeur</span>. En même temps, <span class="font-bold">tirer avec cette même main le chargeur vers le bas pour l\'extraire</span>.',
      img: autreEpauleBullpupImg,
      video: autreEpauleBullpupVideo,
    },
    levier_dessus: {
      label: 'levier au-dessus pontet',
      value: 'levier_dessus',
      text: 'Avec la main qui ne tient pas l’arme, <span class="font-bold">soulever du pouce le levier au-dessus du pontet</span>, et <span class="font-bold">extraire le chargeur</span> avec la même main en le faisant glisser vers le bas.',
      img: autreEpauleThompsonImg,
      video: autreEpauleThompsonVideo,
    },
    chargeur_dessus: {
      label: 'chargeur sur le dessus  de l’arme',
      value: 'chargeur_dessus',
      text: 'De la main qui ne tient pas l’arme, <span class="font-bold">pousser simultanément sur les deux boutons</span> de part et d’autre du chargeur <span class="font-bold">vers l’arrière</span>. Puis, <span class="font-bold">tirer sur le chargeur vers le haut pour l’extraire</span> de la carcasse.',
      img: autreEpauleP90Img,
      video: autreEpauleP90Video,
    },
    bouton_poignee: {
      label: 'poussoir à la base poignée',
      value: 'bouton_poignee',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold"> extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: autreEpaulePistoletMitralleurImg,
      video: autreEpaulePistoletMitralleurVideo,
    },
  },
  revolver_text_option: 'Sélectionner ce que vous voyez à côté du barillet',
  revolver: {
    bouton_tirer: {
      label: 'bouton à tirer',
      value: 'bouton_tirer',
      text: 'Tenir de la main droite la crosse du revolver. Avec votre pouce droit, <span class="font-bold"> tirer vers l’arrière le bouton situé entre le chien et le barillet</span>. Placer la main gauche sur le côté droit de l’arme, et avec vos doigts <span class="font-bold">pousser le barillet pour le faire basculer hors de l’arme</span>. Puis <span class="font-bold">pousser la tige à l’extrémité du barillet</span> pour <span class="font-bold">faciliter l’extraction</span> des munitions.',
      img: revolver1Img,
      video: revolver1Video,
    },
    bouton_pousser: {
      label: 'bouton à pousser',
      value: 'bouton_pousser',
      text: 'Tenir de la main droite la crosse du revolver. Avec votre pouce droit, <span class="font-bold"> pousser vers l’arrière le bouton situé entre le chien et le barillet</span>. Placer la main gauche sur le côté droit de l’arme, et avec vos doigts <span class="font-bold">pousser le barillet pour le faire basculer hors de l’arme</span>. Puis <span class="font-bold">pousser la tige à l’extrémité du barillet</span> pour <span class="font-bold">faciliter l’extraction</span> des munitions.',
      img: revolver2Img,
      video: revolver2Video,
    },
  },
}
export const guideFacticeSelectAmmo = {
  pistolet_semi_auto_moderne: {
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
  semi_auto_style_militaire_autre: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: autreEpauleCartridges,
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: autreEpauleBalls,
    },
  },
  revolver: {
    cartouches: {
      label: 'balles',
      value: 'cartouches',
      img_ammo: revolverCartridges,
    },
    billes: {
      label: 'bille ou \ntrou pour billes',
      value: 'billes',
      img_ammo: revolverBalls,
    },
  },
}

const firearmDirection = 'FirearmDirection'
const selectOption = 'SelectOption'
const extractMag = 'ExtractMag'
const selectAmmo = 'SelectAmmo'

export const guideSteps = [
  firearmDirection,
  selectOption,
  extractMag,
  selectAmmo,
]

export const routePaths = [
  'consigne-arme',
  'option-arme',
  'extract-mag',
  'munition-type',
]
