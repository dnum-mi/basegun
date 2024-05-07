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

export const ALARM_GUNS_TYPOLOGIES = ['pistolet_semi_auto_moderne', 'revolver']
export const MEASURED_GUNS_TYPOLOGIES = [
  'epaule_a_levier_sous_garde',
  'epaule_a_pompe',
  'epaule_a_un_coup_par_canon',
  'epaule_a_verrou',
  'epaule_semi_auto_style_chasse',
]
export const DISCLAIMERS = {
  epaule_a_levier_verrou: '<ul><li>Catégorie B : si la capacité > 11 munitions OU si le canon est lisse</li><li>Catégorie C : si la capacité < 11 munitions ET le canon est rayé</li></ul>',
  semi_auto_style_chasse: 'Si la <strong>capacité est supérieure à 3 munitions</strong>, ou si le <strong>canon est lisse</strong> : <strong>Catégorie B</strong>. Si le <strong>canon est rayé</strong> : <strong>Catégorie C</strong>.',
  epaule_a_pompe: 'Attention : Si la <strong>capacité maximale (chambre comprise) est supérieure à 5</strong>, ou si <strong>la crosse n’est pas fixe</strong>, ou si le <strong>canon est lisse</strong> : <strong>Catégorie B</strong>.',
  epaule_semi_auto_style_militaire: 'Attention : Si à l’origine l’arme était à répétition automatique puis a été transformée en arme semi automatique, alors elle est de catégorie A. Si l’arme possède <strong>une crosse rétractable / pliable</strong> et qu’en configuration la plus courte elle mesure <strong>moins de 60 cm</strong> : <strong>Catégorie A</strong>.',
  alarm_guns: 'Les <strong>armes d’alarmes</strong> sont susceptibles d’être <strong>modifiées pour tirer des munitions létales</strong>. Pour des raisons de sécurité, <strong>faites si possible expertiser l’arme.</strong>',
}
