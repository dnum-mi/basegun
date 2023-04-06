import revolver1Img from '@/assets/guide-factice/images/revolver/revolver-1_arrow.jpg'
import revolver1Video from '@/assets/guide-factice/videos/revolver-1_sm.mp4'
import revolver2Img from '@/assets/guide-factice/images/revolver/revolver-2_arrow.jpg'
import revolver2Video from '@/assets/guide-factice/videos/revolver-2_sm.mp4'
import revolverCartridges from '@/assets/guide-factice/images/revolver/revolver-cartridges.jpg'
import revolverBalls from '@/assets/guide-factice/images/revolver/revolver-balls.jpg'
import pistoletSemiAutoModerne1Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-1_arrow1.jpg'
import pistoletSemiAutoModerne1Video from '@/assets/guide-factice/videos/pistol-1_sm.mp4'
import pistoletSemiAutoModerne2Img from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-2_arrow1.jpg'
import pistoletSemiAutoModerne2Video from '@/assets/guide-factice/videos/pistol-2_sm.mp4'
import pistoletSemiAutoModerneCartridges from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-cartridges.jpg'
import pistoletSemiAutoModerneBalls from '@/assets/guide-factice/images/pistolet_semi_auto_moderne/pistolet-semi-auto-moderne-balls.jpg'
import autreEpauleAr15Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ar_arrow2.jpg'
import autreEpauleAr15Video from '@/assets/guide-factice/videos/ar_sm.mp4'
import autreEpauleAkImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ak_arrow2.jpg'
import autreEpauleAkVideo from '@/assets/guide-factice/videos/ak_sm.mp4'
import autreEpauleBullpupImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-bullpup_arrow2.jpg'
import autreEpauleBullpupVideo from '@/assets/guide-factice/videos/bullpup_sm.mp4'
import autreEpauleThompsonImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-thompson_arrow2.jpg'
import autreEpauleThompsonVideo from '@/assets/guide-factice/videos/thompson_sm.mp4'
import autreEpauleP90Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-p90_arrow2.jpg'
import autreEpauleP90Video from '@/assets/guide-factice/videos/p90_sm.mp4'
import autreEpaulePistoletMitralleurImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-pistolet-mitrailleur.png'
import autreEpaulePistoletMitralleurVideo from '@/assets/guide-factice/videos/pistolet_mitrailleur_sm.mp4'
import autreEpauleCartridges from '@/assets/guide-factice/images/autre_epaule/autre-epaule-cartridges.jpg'
import autreEpauleBalls from '@/assets/guide-factice/images/autre_epaule/autre-epaule-balls.jpg'

export const results = {
  revolver: {
    displayLabel: 'revolver',
    category: 'B ou D',
    mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isDummyTypology: true,
    stepsNumber: 4,
  },
  pistolet_semi_auto_moderne: {
    displayLabel: 'pistolet semi-automatique moderne',
    category: 'B',
    mention: 'Soumise à autorisation',
    isDummyTypology: true,
    stepsNumber: 4,
  },
  pistolet_a_percussion_silex: {
    displayLabel: 'pistolet à mécanisme ancien',
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isDummyTypology: false,
  },
  autre_pistolet: {
    displayLabel: 'pistolet divers',
    category: 'A, B ou D',
    mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isDummyTypology: false,
    // isDummyTypology: true,
    // stepsNumber: 3,
  },
  epaule_a_percussion_silex: {
    displayLabel: "arme d'épaule à mécanisme ancien",
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isDummyTypology: false,
  },
  epaule_a_un_coup: {
    displayLabel: "arme d'épaule à un coup par canon",
    category: 'C',
    mention: 'Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_a_levier_sous_garde: {
    displayLabel: "arme d'épaule à levier de sous-garde",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  epaule_a_verrou: {
    displayLabel: "arme d'épaule à verrou",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: true,
    stepsNumber: 4,
  },
  epaule_a_pompe: {
    displayLabel: "arme d'épaule à pompe",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: false,
  },
  autre_epaule: {
    displayLabel: "arme d'épaule non manuelle",
    category: 'A, B ou C',
    mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
    isDummyTypology: true,
    stepsNumber: 4,
  },
}

export const guideFacticeSelectOption = {
  pistolet_semi_auto_moderne_text_option: "Sélectionner ce que vous voyez sur votre arme : bouton à proximité <span class='font-bold'>du pontet du côté gauche de la poignée</span>, ou <span class='font-bold'>bouton sur le talon</span> de la crosse.",
  pistolet_semi_auto_moderne: {
    pontet: {
      label: 'bouton \npontet',
      value: 'pontet',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold">extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne1Img,
      video: pistoletSemiAutoModerne1Video,
    },
    talon: {
      label: 'bouton \ntalon',
      value: 'talon',
      text: '<span class="bold-highlight">Pousser le  bouton vers l’arrière</span>  avec le pouce de l’autre main, puis <span class="bold-highlight">extraire le chargeur</span> de la même main en le tirant ou en le laissant glisser.',
      img: pistoletSemiAutoModerne2Img,
      video: pistoletSemiAutoModerne2Video,
    },
  },
  autre_epaule_text_option: 'Sélectionner ce que vous voyez sur l’arme',
  autre_epaule: {
    bouton_dessus: {
      label: 'bouton \nau-dessus \nchargeur',
      value: 'bouton_dessus',
      text: 'Tenir l’arme de la main droite. Avec l’index de cette main, <span class="bold-highlight">appuyer sur le bouton</span>. Avec l’autre main, <span class="bold-highlight">tirer le chargeur vers le bas</span> pour l’extraire de la carcasse.',
      img: autreEpauleAr15Img,
      video: autreEpauleAr15Video,
    },
    levier_derriere: {
      label: 'levier \nderrière \nchargeur',
      value: 'levier_derriere',
      text: 'A l’aide de la main qui ne tient pas l’arme, <span class="bold-highlight">appuyer avec le pouce</span> sur le levier en maintenant le chargeur. <span class="bold-highlight">Faire pivoter le chargeur</span> en le poussant légèrement vers l’avant pour l’extraire de la carcasse. Puis <span class="bold-highlight">relâcher le levier</span>.',
      img: autreEpauleAkImg,
      video: autreEpauleAkVideo,
    },
    chargeur_derriere: {
      label: 'chargeur \nderrière \nla poignée',
      value: 'chargeur_derriere',
      text: 'Avec la main qui ne tient pas l’arme, <span class="bold-highlight">pousser sur le bouton</span> derrière le chargeur à l’aide du pouce et <span class="bold-highlight">extraire</span> ce dernier en le faisant <span class="bold-highlight">glisser vers le bas</span>.',
      img: autreEpauleBullpupImg,
      video: autreEpauleBullpupVideo,
    },
    levier_dessus: {
      label: 'levier \nau-dessus \npontet',
      value: 'levier_dessus',
      text: 'A l’aide du pouce de la main droite <span class="bold-highlight">pousser le levier</span> présent au dessus de la détente et <span class="bold-highlight">extraire le chargeur</span> avec la main gauche en le faisant <span class="bold-highlight">glisser vers le bas</span>.',
      img: autreEpauleThompsonImg,
      video: autreEpauleThompsonVideo,
    },
    chargeur_dessus: {
      label: 'chargeur \nau-dessus \n de l’arme',
      value: 'chargeur_dessus',
      text: 'De la main qui ne tient pas l’arme, <span class="bold-highlight">pousser simultanément sur les deux boutons</span> de part et d’autre du chargeur vers l’arrière, puis, <span class="bold-highlight">tirer sur le chargeur</span> vers le haut pour l’extraire de la carcasse.',
      img: autreEpauleP90Img,
      video: autreEpauleP90Video,
    },
    bouton_poignee: {
      label: 'bouton \nà la base de \nla poignée',
      value: 'bouton_poignee',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold"> extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: autreEpaulePistoletMitralleurImg,
      video: autreEpaulePistoletMitralleurVideo,
    },
  },
  revolver_text_option: 'Sélectionner ce que vous voyez sur l’arme',
  revolver: {
    bouton_tirer: {
      label: 'bouton \nà tirer',
      value: 'bouton_tirer',
      text: 'Tenir de la main droite la crosse du revolver. Avec votre pouce droit, <span class="font-bold"> tirer vers l’arrière le bouton situé entre le chien et le barillet</span>. Placer la main gauche sur le côté droit de l’arme, et avec vos doigts <span class="font-bold">pousser le barillet pour le faire basculer</span> hors de l’arme. <span class="font-bold">Puis pousser la tige à l’extrémité du barillet</span> pour faciliter l’extraction des munitions.',
      img: revolver1Img,
      video: revolver1Video,
    },
    bouton_pousser: {
      label: 'bouton \nà pousser',
      value: 'bouton_pousser',
      text: 'Tenir de la main droite la crosse du revolver. Avec votre pouce droit, <span class="font-bold"> pousser vers l’arrière le bouton situé entre le chien et le barillet</span>. Placer la main gauche sur le côté droit de l’arme, et avec vos doigts <span class="font-bold">pousser le barillet pour le faire basculer</span> hors de l’arme. <span class="font-bold">Puis pousser la tige à l’extrémité du barillet</span> pour faciliter l’extraction des munitions.',
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
  autre_epaule: {
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
      label: 'bille ou \ntrou à billes',
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
