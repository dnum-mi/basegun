export const results = {
  revolver: {
    displayLabel: 'revolver',
    category: 'B ou D',
    mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isFacticeTypology: true,
    stepsNumber: 4,
  },
  pistolet_semi_auto_moderne: {
    displayLabel: 'pistolet semi-automatique moderne',
    category: 'B',
    mention: 'Soumise à autorisation',
    isFacticeTypology: true,
    stepsNumber: 4,
  },
  pistolet_a_percussion_silex: {
    displayLabel: 'pistolet à mécanisme ancien',
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isFacticeTypology: false,
  },
  autre_pistolet: {
    displayLabel: 'pistolet divers',
    category: 'A, B ou D',
    mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isFacticeTypology: false,
    // isFacticeTypology: true,
    // stepsNumber: 3,
  },
  epaule_a_percussion_silex: {
    displayLabel: "arme d'épaule à mécanisme ancien",
    category: 'D',
    mention: "Libre d'acquisition et de détention",
    isFacticeTypology: false,
  },
  epaule_a_un_coup: {
    displayLabel: "arme d'épaule à un coup par canon",
    category: 'C',
    mention: 'Soumise à déclaration',
    isFacticeTypology: false,
  },
  epaule_a_levier_sous_garde: {
    displayLabel: "arme d'épaule à levier de sous-garde",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isFacticeTypology: false,
  },
  epaule_a_verrou: {
    displayLabel: "arme d'épaule à verrou",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isFacticeTypology: true,
    stepsNumber: 4,
  },
  epaule_a_pompe: {
    displayLabel: "arme d'épaule à pompe",
    category: 'B ou C',
    mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
    isFacticeTypology: false,
  },
  autre_epaule: {
    displayLabel: "arme d'épaule non manuelle",
    category: 'A, B ou C',
    mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
    isFacticeTypology: true,
    stepsNumber: 4,
  },
}

export const guideFacticeSelectOption = {
  pistolet_semi_auto_moderne_text_option: "Sélectionner ce que vous voyez sur votre arme : <br> bouton à proximité <span class='bold-highlight'>du pontet du côté gauche de la poignée</span>,ou <span class='bold-highlight'>bouton sur le talon</span> de la crosse.",
  pistolet_semi_auto_moderne: {
    pontet: {
      label: 'bouton pontet',
      value: 'pontet',
      text: '<span class="bold-highlight">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="bold-highlight">extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: 'pistolet-semi-auto-moderne-1_arrow1.jpg',
      video: 'pistol-1_sm.mp4',
    },
    talon: {
      label: 'bouton talon',
      value: 'talon',
      text: 'Pousser le  bouton vers l’arrière  avec le pouce de l’autre main, puis extraire le chargeur de la même main en le tirant ou en le laissant glisser.',
      img: 'pistolet-semi-auto-moderne-2_arrow1.jpg',
      video: 'pistol-2_sm.mp4',
    },
  },
  autre_epaule_text_option: 'Sélectionner ce que vous voyez sur votre arme',
  autre_epaule: {
    bouton_dessus: {
      label: 'bouton au-dessus \n chargeur',
      value: 'bouton_dessus',
      text: 'Tenir l’arme de la main droite. Avec l’index de cette main, appuyer sur le bouton. Avec l’autre main, tirer le chargeur vers le bas pour l’extraire de la carcasse.',
      img: 'autre-epaule-ar_arrow2.jpg',
      video: 'ar_sm.mp4',
    },
    levier_derriere: {
      label: 'levier derrière \n chargeur',
      value: 'levier_derriere',
      text: 'A l’aide de la main qui ne tient pas l’arme, appuyer avec le pouce sur le levier en maintenant le chargeur. Faire pivoter le chargeur en le poussant légèrement vers l’avant pour l’extraire de la carcasse. Puis relâcher le levier.',
      img: 'autre-epaule-ak_arrow2.jpg',
      video: 'ak_sm.mp4',
    },
    chargeur_derriere: {
      label: 'chargeur derrière \n la poignée',
      value: 'chargeur_derriere',
      text: 'Avec la main qui ne tient pas l’arme, pousser sur le bouton derrière le chargeur à l’aide du pouce et extraire ce dernier en le faisant glisser vers le bas.',
      img: 'autre-epaule-bullpup_arrow2.jpg',
      video: 'bullpup_sm.mp4',
    },
    levier_dessus: {
      label: 'levier au-dessus \n pontet',
      value: 'levier_dessus',
      text: 'A l’aide du pouce de la main droite pousser le levier présent au dessus de la détente et extraire le chargeur avec la main gauche en le faisant glisser vers le bas.',
      img: 'autre-epaule-thompson_arrow2.jpg',
      video: 'thompson_sm.mp4',
    },
    chargeur_dessus: {
      label: 'chargeur au-dessus \n de l’arme',
      value: 'chargeur_dessus',
      text: 'De la main qui ne tient pas l’arme, pousser simultanément sur les deux boutons de part et d’autre du chargeur vers l’arrière, puis, tirer sur le chargeur vers le haut pour l’extraire de la carcasse.',
      img: 'autre-epaule-p90_arrow2.jpg',
      video: 'p90_sm.mp4',
    },
  },
  autre_pistolet:
    {
      text: '<span class="bold-highlight">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="bold-highlight"> extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      video: 'pistolet_mitrailleur_sm.mp4',
    },
  epaule_a_verrou_text_option: 'Sélectionner le type de chargeur sur l’arme',
  epaule_a_verrou: {
    avec_chargeur: {
      label: 'un chargeur est \n présent',
      value: 'avec_chargeur',
      text: '<span class="bold-highlight">Appuyer sur le levier</span> avec le pouce de la main droite, puis <span class="bold-highlight"> extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: 'verrou_avec_chargeur_arrow2.jpg',
      video: 'verrou_sm.mp4',
    },
    sans_chargeur: {
      label: 'pas de chargeur présent',
      value: 'sans_chargeur',
      img: 'verrou_sans_chargeur_arrow2.jpg',
      text: '/!\\ info -  Ce tutoriel n’est valable que pour les armes à verrou avec chargeur externe',
    },
  },
  revolver_text_option: '[TEXTE A MODIFIER]',
  revolver: {
    option_1: {
      label: 'option_1',
      value: 'option_1',
      text: 'Tenir de la main droite la crosse du revolver. Avec votre pouce droit, tirer vers l’arrière le bouton situé entre le chien et le barillet. Placer la main gauche sur le côté droit de l’arme, et avec vos doigts pousser le barillet pour le faire basculer hors de l’arme. Puis pousser la tige à l’extrémité du barillet pour faciliter l’extraction des munitions.',
      img: 'revolver-1_arrow.jpg',
      video: 'revolver-1_sm.mp4',
    },
    option_2: {
      label: 'option_2',
      value: 'option_2',
      text: '[TEXTE A MODIFIER]',
      img: 'revolver-2_arrow.jpg',
      video: 'revolver-2_sm.mp4',
    },
  },
}

export const guideFacticeSelectAmmo = {
  pistolet_semi_auto_moderne: {
    cartouche: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: 'pistolet-semi-auto-moderne-cartridge.jpg',
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: 'pistolet-semi-auto-moderne-balls.jpg',
    },
  },
  autre_epaule: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: 'autre-epaule-cartridge.jpg',
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: 'autre-epaule-balls.jpg',
    },
  },
  autre_pistolet: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: 'autre-pistolet-cartridge.jpg',
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: 'autre-pistolet-balls.jpg',
    },
  },
  epaule_a_verrou: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: 'epaule-a-verrou-cartridge.jpg',
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: 'epaule-a-verrou-balls.jpg',
    },
  },
  revolver: {
    cartouches: {
      label: 'la cartouche \n possède ou peut \n posséder une ogive',
      value: 'cartouches',
      img_ammo: 'revolver-cartridge.jpg',
    },
    billes: {
      label: 'la cartouche \n contient ou peut \n contenir des billes',
      value: 'billes',
      img_ammo: 'revolver-balls.jpg',
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
