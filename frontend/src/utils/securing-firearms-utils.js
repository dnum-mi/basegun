import { revolver } from './firearms-utils/revolver.js'
import { pistolet_semi_auto_moderne } from './firearms-utils/pistolet-semi-auto-moderne.js'
import { epaule_a_un_coup } from './firearms-utils/epaule-a-un-coup-par-canon.js'
import { epaule_a_verrou } from './firearms-utils/epaule-a-verrou.js'
import { epaule_a_pompe } from './firearms-utils/epaule-a-pompe.js'
import { epaule_a_levier_sous_garde } from './firearms-utils/epaule-a-levier-sous-garde.js'
import { semi_auto_style_militaire_autre } from './firearms-utils/semi-auto-style-militaire-autre.js'
import { epaule_semi_auto_style_militaire_milieu_20e } from './firearms-utils/epaule-semi-auto-militaire-milieu-20e.js'
import { epaule_semi_auto_style_chasse } from './firearms-utils/epaule-semi-auto-style-chasse.js'
import { epaule_a_percussion_silex } from './firearms-utils/epaule-a-percussion-silex.js'
import { pistolet_a_percussion_silex } from './firearms-utils/pistolet-a-percussion-silex.js'
import { autre_pistolet } from './firearms-utils/autre-pistolet.js'
import { autre_epaule } from './firearms-utils/autre-epaule.js'

export const resultats = {
  autre_pistolet,
  epaule_a_levier_sous_garde,
  epaule_a_pompe,
  epaule_a_un_coup, // epaule_a_un_coup_par_canon,
  epaule_a_verrou,
  epaule_a_percussion_silex, // epaule_mecanisme_ancien,
  epaule_semi_auto_style_chasse,
  epaule_semi_auto_style_militaire_milieu_20e,
  pistolet_a_percussion_silex, // pistolet_mecanisme_ancien,
  pistolet_semi_auto_moderne,
  revolver,
  semi_auto_style_militaire_autre,
  autre_epaule, // à supprimer
}
