import { revolver, revolver_black_powder } from './revolver.js'
import { pistolet_semi_auto_moderne } from './pistolet-semi-auto-moderne.js'
import { epaule_a_un_coup_par_canon } from './epaule-a-un-coup-par-canon.js'
import { epaule_a_verrou } from './epaule-a-verrou.js'
import { epaule_a_pompe } from './epaule-a-pompe.js'
import { epaule_a_levier_sous_garde } from './epaule-a-levier-sous-garde.js'
import { semi_auto_style_militaire_autre } from './semi-auto-style-militaire-autre.js'
import { epaule_semi_auto_style_militaire_milieu_20e } from './epaule-semi-auto-militaire-milieu-20e.js'
import { epaule_semi_auto_style_chasse } from './epaule-semi-auto-style-chasse.js'
import { epaule_mecanisme_ancien } from './epaule_mecanisme_ancien.js'
import { pistolet_mecanisme_ancien } from './pistolet-mecanisme-ancien.js'
import { autre_pistolet } from './autre-pistolet.js'

export const resultTree = {
  autre_pistolet,
  epaule_a_levier_sous_garde,
  epaule_a_pompe,
  epaule_a_un_coup_par_canon,
  epaule_a_verrou,
  epaule_mecanisme_ancien,
  epaule_semi_auto_style_chasse,
  epaule_semi_auto_style_militaire_milieu_20e,
  pistolet_mecanisme_ancien,
  pistolet_semi_auto_moderne,
  revolver,
  revolver_black_powder,
  semi_auto_style_militaire_autre,
}

// Tuto Mise en sécurité
const securingInstructions = 'SecuringInstructions'
const securingRecommendations = 'SecuringRecommendations'
const securingIntroduction = 'SecuringIntroduction'

// Tuto Mise en securité identification
const IdentificationTypologyResult = 'IdentificationTypologyResult'
const IdentificationFurtherInformations = 'IdentificationFurtherInformations'
const IdentificationSelectAmmo = 'IdentificationSelectAmmo'
const IdentificationFinalResult = 'IdentificationFinalResult'

export const securingGuideSteps = [
  securingRecommendations,
  securingInstructions,
  securingIntroduction,
]

export const identificationGuideSteps = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationFinalResult,
]

export const securingRoutePaths = [
  'mise-en-securite-recommandations',
  'mise-en-securite-instructions',
  'mise-en-securite-introduction',
]

export const identificationRoutePaths = [
  'resultat-typologie',
  'informations-complementaires',
  'munition-type',
  'resultat-final',
]
