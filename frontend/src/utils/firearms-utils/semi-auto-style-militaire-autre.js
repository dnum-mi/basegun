import semiAutoMilitaireAr15Img from '@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_ar15.jpg'
import semiAutoMilitaireAr15Video from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_ar15.mp4'
import semiAutoMilitaireAkImg from '@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_ak.jpg'
import semiAutoMilitaireAkVideo from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_ak.mp4'
import semiAutoMilitaireStenImg from '@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_sten.jpg'
import semiAutoMilitaireStenVideo from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_sten.mp4'
import semiAutoMilitaireThompsonImg from '@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_thompson.jpg'
import semiAutoMilitaireThompsonVideo from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_thompson.mp4'
import semiAutoMilitairePistoletMitralleurImg from '@/assets/guide-mise-en-securite/photos/semi_auto_militaire_autre/semi_auto_mil_uzi.jpg'
import semiAutoMilitairePistoletMitralleurVideo from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_uzi.mp4'
import semiAutoMilitaireCartridges from '@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_cartouche.jpg'
import semiAutoMilitaireBalls from '@/assets/guide-identification/photos/semi_auto_militaire_autre/semi_automatique_militaire_autre_chargeur_billes.jpg'
/*
Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const semi_auto_style_militaire_autre = {
  displayLabel: 'Arme semi-automatique ou automatique',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  options_text: 'Observez la position du chargeur et sélectionnez ce que vous voyez :',
  options: {
    ar15: {
      label: 'bouton au-dessus chargeur',
      value: 'ar15',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Appuyer avec l’index de la main droite sur le bouton poussoir situé côté droit de l’arme et <span class="font-bold">extraire le chargeur de l’arme</span>',
        3: 'Tirer le levier d’armement vers l’arrière',
        4: '<span class="font-bold">Retirer la munition</span> éventuelle',
        5: 'Tout <span class="font-bold">en maintenant le levier d’armement vers l’arrière</span>, contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireAr15Img,
      video: semiAutoMilitaireAr15Video,
    },
    kalash: {
      label: 'levier derrière chargeur',
      value: 'kalash',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Vérifier que le sélecteur de tir n’est pas en position haute, et le descendre si besoin',
        3: '<span class="font-bold">Appuyer sur le levier de déverrouillage du chargeur</span> avec le pouce et extraire le chargeur en le faisant pivoter vers l’avant',
        4: 'Tirer le levier d’armement vers l’arrière',
        5: '<span class="font-bold">Retirer la munition</span> éventuelle de la chambre',
        6: '<span class="font-bold">Tout en maintenant le levier d’armement vers l’arrière</span>, contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireAkImg,
      video: semiAutoMilitaireAkVideo,
    },
    sten: {
      label: 'chargeur à angle droit',
      value: 'sten',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Appuyer sur le <span class="font-bold">bouton de verrouillage du chargeur</span>',
        3: 'Retirer le chargeur',
        4: 'Tirer le levier d’armement vers l’arrière et bloquer le levier en position arrière dans le cran arrière, en extrayant la cartouche éventuelle s’il y en a une',
        5: 'Contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireStenImg,
      video: semiAutoMilitaireStenVideo,
    },
    thompson: {
      label: 'levier au-dessus pontet',
      value: 'thompson',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Retourner l’arme',
        3: 'Actionner le <span class="font-bold">levier de verrouillage de chargeur</span>',
        4: 'Retirer le chargeur',
        5: 'Retourner l’arme',
        6: 'Tirer le levier d’armement vers l’arrière et <span class="font-bold">extraire la munition</span> éventuelle',
        7: 'Contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireThompsonImg,
      video: semiAutoMilitaireThompsonVideo,
    },
    uzi: {
      label: 'bouton poussoir à base poignée',
      value: 'uzi',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
        2: 'Retourner l’arme',
        3: 'Appuyer sur le <span class="font-bold">bouton de verrouillage du chargeur</span> en bas de la poignée',
        4: 'Retirer le chargeur',
        5: 'Tirer le levier d’armement situé sur le dessus de l’arme vers l’arrière et <span class="font-bold">retirer la munition</span> éventuelle de la chambre',
        6: '<span class="font-bold">Tout en maintenant le levier d’armement vers l’arrière</span>, contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitairePistoletMitralleurImg,
      video: semiAutoMilitairePistoletMitralleurVideo,
    },
  },
  guideFactice: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: semiAutoMilitaireCartridges,
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: semiAutoMilitaireBalls,
    },
  },
}
