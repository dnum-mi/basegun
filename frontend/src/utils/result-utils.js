export const results={
  revolver: {
      displayLabel: "revolver",
      category: "B ou D",
      mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  },
  pistolet_semi_auto_moderne: {
      displayLabel: "pistolet semi-automatique moderne",
      category: "B",
      mention: "Soumise à autorisation",
  },
  pistolet_a_percussion_silex: {
      displayLabel: "pistolet à mécanisme ancien",
      category: "D",
      mention: "Libre d'acquisition et de détention",
  },
  autre_pistolet: {
      displayLabel: "pistolet divers",
      category: "A, B ou D",
      mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  },
  epaule_a_percussion_silex: {
      displayLabel: "arme d'épaule à mécanisme ancien",
      category: "D",
      mention: "Libre d'acquisition et de détention",
  },
  epaule_a_un_coup: {
      displayLabel: "arme d'épaule à un coup par canon",
      category: "C",
      mention: "Soumise à déclaration",
  },
  epaule_a_levier_sous_garde: {
      displayLabel: "arme d'épaule à levier de sous-garde",
      category: "B ou C",
      mention: "B - Soumise à autorisation<br>C - Soumise à déclaration",
  },
  epaule_a_verrou: {
      displayLabel: "arme d'épaule à verrou",
      category: "B ou C",
      mention: "B - Soumise à autorisation<br>C - Soumise à déclaration",
  },
  epaule_a_pompe: {
      displayLabel: "arme d'épaule à pompe",
      category: "B ou C",
      mention: "B - Soumise à autorisation<br>C - Soumise à déclaration",
  },
  autre_epaule: {
      displayLabel: "arme d'épaule non manuelle",
      category: "A, B ou C",
      mention: "A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration",
  },
}

export const GuideFactice= [{
    pistolet_semi_auto_moderne: {
        step: {

            },
        },
    
    
}]

// const WEAPON_TYPE = 'WEAPON_TYPE' // Type d’armes : pistolet semi-automatique, autre pistolet, épaule à verrou, autre épaule

const firearmDirection = 'FirearmDirection,'
const selectOption = 'SelectOption,'
const extractMag = 'ExtractMag,'
const ammoType = ' AmmoType,'


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
    'munition',

]


// GUIDE_OPTION Pour les boutons radio

//Deux variable typologie et option


