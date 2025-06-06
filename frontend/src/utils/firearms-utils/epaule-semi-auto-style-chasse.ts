import { getCommonCategory } from "@/utils/firearms-utils/index";
import epaulePompeCartridges from "@/assets/guide-identification/photos/epaule_a_pompe/epaule_a_pompe_chargeur_cartouche.jpeg";
import epaulePompeModerneBalls from "@/assets/guide-identification/photos/epaule_a_pompe/epaule_a_pompe_chargeur_bille.jpg";

const DISCLAIMERS = {
  short:
    "<strong>Catégorie B</strong> si la <strong>capacité > à 3 munitions</strong>, ou si le <strong>chargeur est amovible</strong>.",
  long: "<ul><li><strong>Catégorie B</strong> si la <strong>capacité > à 3 munitions</strong>, ou si le <strong>canon est lisse</strong>, ou si le <strong>chargeur est amovible</strong>.</li><li><strong>Catégorie C</strong> si le <strong>canon est rayé</strong>.</li></ul>",
};

/*
Armes d’épaule semi-automatiques ou automatiques type chasse
*/
export const epaule_semi_auto_style_chasse = {
  displayLabel: "Arme d’épaule semi-automatique",
  getCategory: getCommonCategory,
  dummyOptions: [
    {
      label: "Cartouches",
      value: "cartouches",
      img_ammo: epaulePompeCartridges,
    },
    {
      label: "Billes",
      value: "billes",
      img_ammo: epaulePompeModerneBalls,
    },
  ],
  getDisclaimer: (category: string, isCardDetected: boolean) => {
    if (["B ou C", "C"].includes(category)) {
      if (isCardDetected === false) {
        return DISCLAIMERS.short;
      } else {
        if (["C"].includes(category)) {
          return DISCLAIMERS.short;
        }
        if (["B ou C"].includes(category)) {
          return DISCLAIMERS.long;
        }
      }
    }
  },
} as const;
