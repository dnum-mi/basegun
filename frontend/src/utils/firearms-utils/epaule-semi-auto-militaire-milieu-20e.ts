/*
Armes d’épaule semi-automatiques ou automatiques type militaire milieu 20e
*/
export const epaule_semi_auto_style_militaire_milieu_20e = {
  displayLabel: "Arme d’épaule semi-automatique ou automatique",
  getCategory: () => "A ou B",
  getDisclaimer: () =>
    "<strong>Catégorie A</strong> si à l'origine l’arme était à <strong>répétition automatique</strong> puis a été <strong>transformée</strong> en arme <strong>semi automatique</strong>, ou si l’arme possède <strong>une crosse rétractable / pliable</strong> et qu’en configuration la plus courte elle <strong>mesure moins de 60 cm</strong>.",
} as const;
