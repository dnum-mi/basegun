import semiAutoMilitaireAr15Img from "@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_ar15.jpg";
import semiAutoMilitaireAr15Video from "@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_ar15.mp4";
import semiAutoMilitaireAkImg from "@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_ak.jpg";
import semiAutoMilitaireAkVideo from "@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_ak.mp4";
import semiAutoMilitaireStenImg from "@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_sten.jpg";
import semiAutoMilitaireStenVideo from "@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_sten.mp4";
import semiAutoMilitaireThompsonImg from "@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_thompson.jpg";
import semiAutoMilitaireThompsonVideo from "@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_thompson.mp4";
import semiAutoMilitairePistoletMitralleurImg from "@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_uzi.jpg";
import semiAutoMilitairePistoletMitralleurVideo from "@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_uzi.mp4";
import semiAutoMilitaireCartridges from "@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_cartouche.jpg";
import semiAutoMilitaireBalls from "@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_billes.jpg";
import PopupVideo from "@/components/PopupVideo.vue";
/*
Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const semi_auto_style_militaire_autre = {
  displayLabel: "Arme semi-automatique ou automatique",
  getCategory: () => "A ou B",
  securingSteps: [
    {
      text: "Observez la position du chargeur et sélectionnez ce que vous voyez :",
      options: [
        {
          label: "Bouton au-dessus du chargeur",
          value: "ar15",
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Appuyer avec l’index de la main droite sur le bouton poussoir situé côté droit de l’arme et <span class="font-bold">extraire le chargeur de l’arme</span>',
            "Tirer le levier d’armement vers l’arrière",
            '<span class="font-bold">Retirer la munition</span> éventuelle',
            'Tout <span class="font-bold">en maintenant le levier d’armement vers l’arrière</span>, contrôler visuellement que la chambre est vide',
          ],
          timeVideo: "30 sec",
          img: semiAutoMilitaireAr15Img,
          video: semiAutoMilitaireAr15Video,
        },
        {
          label: "Levier derrière le chargeur",
          value: "kalash",
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            "Vérifier que le sélecteur de tir n’est pas en position haute, et le descendre si besoin",
            '<span class="font-bold">Appuyer sur le levier de déverrouillage du chargeur</span> avec le pouce et extraire le chargeur en le faisant pivoter vers l’avant',
            "Tirer le levier d’armement vers l’arrière",
            '<span class="font-bold">Retirer la munition</span> éventuelle de la chambre',
            '<span class="font-bold">Tout en maintenant le levier d’armement vers l’arrière</span>, contrôler visuellement que la chambre est vide',
          ],
          timeVideo: "35 sec",
          img: semiAutoMilitaireAkImg,
          video: semiAutoMilitaireAkVideo,
        },
        {
          label: "Chargeur à angle droit",
          value: "sten",
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            'Appuyer sur le <span class="font-bold">bouton de verrouillage du chargeur</span>',
            "Retirer le chargeur",
            "Tirer le levier d’armement vers l’arrière et bloquer le levier en position arrière dans le cran arrière, en extrayant la cartouche éventuelle s’il y en a une",
            "Contrôler visuellement que la chambre est vide",
          ],
          timeVideo: "25 sec",
          img: semiAutoMilitaireStenImg,
          video: semiAutoMilitaireStenVideo,
        },
        {
          label: "Levier au-dessus du pontet",
          value: "thompson",
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            "Retourner l’arme",
            'Actionner le <span class="font-bold">levier de verrouillage de chargeur</span>',
            "Retirer le chargeur",
            "Retourner l’arme",
            'Tirer le levier d’armement vers l’arrière et <span class="font-bold">extraire la munition</span> éventuelle',
            "Contrôler visuellement que la chambre est vide",
          ],
          timeVideo: "25 sec",
          img: semiAutoMilitaireThompsonImg,
          video: semiAutoMilitaireThompsonVideo,
        },
        {
          label: "Bouton poussoir à la base de la poignée",
          value: "uzi",
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
            "Retourner l’arme",
            'Appuyer sur le <span class="font-bold">bouton de verrouillage du chargeur</span> en bas de la poignée',
            "Retirer le chargeur",
            'Tirer le levier d’armement situé sur le dessus de l’arme vers l’arrière et <span class="font-bold">retirer la munition</span> éventuelle de la chambre',
            PopupVideo,
          ],
          timeVideo: "35 sec",
          img: semiAutoMilitairePistoletMitralleurImg,
          video: semiAutoMilitairePistoletMitralleurVideo,
        },
      ],
    },
  ],
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
