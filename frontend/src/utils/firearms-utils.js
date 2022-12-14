export const results = {
  revolver: {
    displayLabel: 'revolver',
    category: 'B ou D',
    mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
    isFacticeTypology: false,
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
    isFacticeTypology: true,
    stepsNumber: 3,
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
    stepsNumber: 3,
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

export const titleOptionsSemiAuto = [
  {
    label: 'levier',
    value: 'levier',
  }, {
    label: 'bouton',
    value: 'bouton',
  },
]

export const titleOptionsAutreEpaule = [
  {
    label: 'chargeur devant poignée, levier derrière chargeur',
    value: 'levier-derriere',
    video: '',
  },
  {
    label: 'chargeur devant poignée, bouton au-dessus chargeur',
    value: 'bouton-dessus',
    video: '',
  },
  {
    label: 'chargeur devant poignée, levier au-dessus pontet',
    value: 'levier-dessus',
    video: '',
  },
  {
    label: 'chargeur derrière poignée',
    value: 'chargeur-derriere',
    video: '',
  },
  {
    label: 'chargeur au-dessus',
    value: 'chargeur-dessus',
    video: '',
  },
]

const firearmDirection = 'FirearmDirection'
const selectOption = 'SelectOption'
const extractMag = 'ExtractMag'
const ammoType = 'AmmoType'

export const guideSteps = [
  firearmDirection,
  selectOption,
  extractMag,
  ammoType,
]

export const routePath = [
  'consigne-arme',
  'option-arme',
  'extract-mag',
  'munition-type',
]

export const displayGuideContentOptions = [
  //
]
