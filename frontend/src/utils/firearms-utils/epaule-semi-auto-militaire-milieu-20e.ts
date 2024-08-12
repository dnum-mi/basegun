import semiAutoMilitaireCartridges from "@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_cartouche.jpg";
import semiAutoMilitaireBalls from "@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_billes.jpg";
/*
Armes d’épaule semi-automatiques ou automatiques type militaire milieu 20e
*/
export const epaule_semi_auto_style_militaire_milieu_20e = {
  displayLabel: "Arme d’épaule semi-automatique ou automatique",
  getCategory: () => "A ou B",
  dummyOptions: [
    {
      label: "Cartouches",
      value: "cartouches",
      img_ammo: semiAutoMilitaireCartridges,
    },
    {
      label: "Billes",
      value: "billes",
      img_ammo: semiAutoMilitaireBalls,
    },
  ],
  getDisclaimer: () =>
    "<strong>Catégorie A</strong> si à l'origine l’arme était à <strong>répétition automatique</strong> puis a été <strong>transformée</strong> en arme <strong>semi automatique</strong>, ou si l’arme possède <strong>une crosse rétractable / pliable</strong> et qu’en configuration la plus courte elle <strong>mesure moins de 60 cm</strong>.",
} as const;
