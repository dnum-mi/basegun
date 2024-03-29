import { revolver, revolver_black_powder } from './revolver'
import { pistolet_semi_auto_moderne } from './pistolet-semi-auto-moderne'
import { epaule_a_un_coup_par_canon } from './epaule-a-un-coup-par-canon'
import { epaule_a_verrou } from './epaule-a-verrou'
import { epaule_a_pompe } from './epaule-a-pompe'
import { epaule_a_levier_sous_garde } from './epaule-a-levier-sous-garde'
import { semi_auto_style_militaire_autre } from './semi-auto-style-militaire-autre'
import { epaule_semi_auto_style_militaire_milieu_20e } from './epaule-semi-auto-militaire-milieu-20e'
import { epaule_semi_auto_style_chasse } from './epaule-semi-auto-style-chasse'
import { epaule_mecanisme_ancien } from './epaule_mecanisme_ancien'
import { pistolet_mecanisme_ancien } from './pistolet-mecanisme-ancien'
import { autre_pistolet } from './autre-pistolet'
import { arme_alarme } from './arme-alarme'

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
  arme_alarme,
} as const

// Tuto Mise en sécurité
const securingInstructions = 'SecuringInstructions'
const securingRecommendations = 'SecuringRecommendations'
const securingIntroduction = 'SecuringIntroduction'

// Tuto Mise en securité identification
const IdentificationTypologyResult = 'IdentificationTypologyResult'
const IdentificationFurtherInformations = 'IdentificationFurtherInformations'
const IdentificationSelectAmmo = 'IdentificationSelectAmmo'
const IdentificationBlankGun = 'IdentificationBlankGun'
const IdentificationFinalResult = 'IdentificationFinalResult'

export const securingGuideSteps = [
  securingRecommendations,
  securingInstructions,
  securingIntroduction,
] as const

export const identificationGuideSteps = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationFinalResult,
] as const

export const identificationGuideStepsWithArmeAlarme = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationBlankGun,
  IdentificationFinalResult,
] as const

export const securingRoutePaths = [
  'mise-en-securite-recommandations',
  'mise-en-securite-instructions',
  'mise-en-securite-introduction',
] as const

export const identificationRoutePaths = [
  'resultat-typologie',
  'informations-complementaires',
  'munition-type',
  'resultat-final',
] as const

export const identificationRoutePathsWithArmeAlarme = [
  'resultat-typologie',
  'informations-complementaires',
  'munition-type',
  'armes-alarme',
  'resultat-final',
] as const
