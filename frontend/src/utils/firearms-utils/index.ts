import { revolver } from "./revolver";
import { pistolet_semi_auto_moderne } from "./pistolet-semi-auto-moderne";
import { epaule_a_un_coup_par_canon } from "./epaule-a-un-coup-par-canon";
import { epaule_a_verrou } from "./epaule-a-verrou";
import { epaule_a_pompe } from "./epaule-a-pompe";
import { epaule_a_levier_sous_garde } from "./epaule-a-levier-sous-garde";
import { semi_auto_style_militaire_autre } from "./semi-auto-style-militaire-autre";
import { epaule_semi_auto_style_militaire_milieu_20e } from "./epaule-semi-auto-militaire-milieu-20e";
import { epaule_semi_auto_style_chasse } from "./epaule-semi-auto-style-chasse";
import { epaule_mecanisme_ancien } from "./epaule_mecanisme_ancien";
import { pistolet_mecanisme_ancien } from "./pistolet-mecanisme-ancien";
import { autre_pistolet } from "./autre-pistolet";
import { arme_alarme } from "./arme-alarme";
import { useStore } from "@/stores/result";
const store = useStore();

export const TYPOLOGIES = {
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
  semi_auto_style_militaire_autre,
  arme_alarme,
} as const;

// Tuto Mise en securité identification
const IdentificationTypologyResult = "IdentificationTypologyResult";
const IdentificationFurtherInformations = "IdentificationFurtherInformations";
const IdentificationSelectAmmo = "IdentificationSelectAmmo";
const IdentificationBlankGun = "IdentificationBlankGun";
const IdentificationFinalResult = "IdentificationFinalResult";

export const identificationGuideSteps = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationFinalResult,
] as const;

export const identificationGuideStepsWithArmeAlarme = [
  IdentificationTypologyResult,
  IdentificationFurtherInformations,
  IdentificationSelectAmmo,
  IdentificationBlankGun,
  IdentificationFinalResult,
] as const;

export const securingRoutePaths = [
  "mise-en-securite-recommandations",
  "mise-en-securite-instructions",
  "mise-en-securite-introduction",
] as const;

export const identificationRoutePaths = [
  "resultat-typologie",
  "informations-complementaires",
  "munition-type",
  "resultat-final",
] as const;

export const identificationRoutePathsWithArmeAlarme = [
  "resultat-typologie",
  "informations-complementaires",
  "munition-type",
  "armes-alarme",
  "resultat-final",
] as const;

export function isAlarmGun() {
  if (
    store.selectedOptions[0] === "revolver_black_powder" ||
    !["pistolet_semi_auto_moderne", "revolver"].includes(store.typology) ||
    store.selectedAmmo === "billes"
  ) {
    return false;
  }
  return store.selectedAlarmGun ? true : undefined;
}

export const MEASURED_GUNS_TYPOLOGIES = [
  "epaule_a_levier_sous_garde",
  "epaule_a_pompe",
  "epaule_a_un_coup_par_canon",
  "epaule_a_verrou",
  "epaule_semi_auto_style_chasse",
];

export function getEpaulLevierVerrouDisclaimer(
  category: string,
  isCardDetected: boolean,
) {
  if (
    (isCardDetected === false && ["B ou C", "C"].includes(category)) ||
    (isCardDetected && ["C"].includes(category))
  ) {
    return "<strong>Catégorie B</strong> si la capacité > 11 munitions.</li></ul>";
  }
  if (isCardDetected && ["B ou C"].includes(category)) {
    return "<ul><li><strong>Catégorie B</strong> : si la capacité > 11 munitions ou si le <strong>canon est lisse</strong></li><li><strong>Catégorie C</strong> : si la capacité < 11 munitions et le <strong>canon est rayé</strong></li></ul>";
  }
}

export function getCommonCategory(gunLength: number, gunBarrelLength: number) {
  if (gunLength && gunBarrelLength) {
    if (gunLength < 75 || gunBarrelLength < 40) {
      return "B";
    }
    if (gunLength > 75 && gunBarrelLength > 55) {
      return "C";
    }
  }
  return "B ou C";
}
