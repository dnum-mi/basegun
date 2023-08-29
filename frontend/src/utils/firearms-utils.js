import { revolver, revolver_black_powder } from './firearms-utils/revolver.js'
import { pistolet_semi_auto_moderne } from './firearms-utils/pistolet-semi-auto-moderne.js'
import { epaule_a_un_coup_par_canon } from './firearms-utils/epaule-a-un-coup-par-canon.js'
import { epaule_a_verrou } from './firearms-utils/epaule-a-verrou.js'
import { epaule_a_pompe } from './firearms-utils/epaule-a-pompe.js'
import { epaule_a_levier_sous_garde } from './firearms-utils/epaule-a-levier-sous-garde.js'
import { semi_auto_style_militaire_autre } from './firearms-utils/semi-auto-style-militaire-autre.js'
import { epaule_semi_auto_style_militaire_milieu_20e } from './firearms-utils/epaule-semi-auto-militaire-milieu-20e.js'
import { epaule_semi_auto_style_chasse } from './firearms-utils/epaule-semi-auto-style-chasse.js'
import { epaule_mecanisme_ancien } from './firearms-utils/epaule_mecanisme_ancien.js'
import { pistolet_mecanisme_ancien } from './firearms-utils/pistolet_mecanisme_ancien.js'
import { autre_pistolet } from './firearms-utils/autre-pistolet.js'

export const result = {
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
const securingIntroduction = 'SecuringIntroduction'
const securingInstructions = 'SecuringInstructions'
const securingRecommendations = 'SecuringRecommendations'

// Tuto Mise en securité identification
const IdentificationTypologyResult = 'IdentificationTypologyResult'
const IdentificationFurtherInformations = 'IdentificationFurtherInformations'
const IdentificationSelectAmmo = 'IdentificationSelectAmmo'
const IdentificationFinalResult = 'IdentificationFinalResult'

export const securingGuideSteps = [
  securingIntroduction,
  securingInstructions,
  securingRecommendations,
]

export const identificationGuideSteps = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationFinalResult,
]

export const securingRoutePaths = [
  'mise-en-securite-introduction',
  'mise-en-securite-instructions',
  'mise-en-securite-recommandations',
]

export const identificationRoutePaths = [
  'resultat-typologie',
  'informations-complementaires',
  'munition-type',
  'resultat-final',
]

