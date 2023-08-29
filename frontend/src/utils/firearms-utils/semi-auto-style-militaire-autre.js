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
import semiAutoMilitaireCartridges from '@/assets/guide-factice/photos/autre_epaule/autre-epaule-cartridges.jpg'
import semiAutoMilitaireBalls from '@/assets/guide-factice/photos/autre_epaule/autre-epaule-balls.jpg'
/*
Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const semi_auto_style_militaire_autre = {
  displayLabel: 'arme semi-automatique ou automatique',
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
        1: 'Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        2: 'Appuyer avec l’index de la main droite sur le bouton poussoir situé côté droit de l’arme et extraire le chargeur de l’arme',
        3: 'Tirer le levier d’armement vers l’arrière (idée Antoine : rajouter une incrustation du bouton du levier qui permet de tirer ?)',
        4: 'Retirer la munition éventuelle',
        5: 'Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireAr15Img,
      video: semiAutoMilitaireAr15Video,
    },
    kalash: {
      label: 'levier derrière chargeur',
      value: 'kalash',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        2: 'Vérifier que le sélecteur de tir n’est pas en position haute, et le descendre si besoin (incruster flèche)',
        3: 'Appuyer sur le levier de déverrouillage du chargeur avec le pouce et extraire le chargeur en le faisant pivoter vers l’avant',
        4: 'Tirer le levier d’armement vers l’arrière',
        5: 'Retirer la munition éventuelle de la chambre',
        6: 'Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireAkImg,
      video: semiAutoMilitaireAkVideo,
    },
    sten: {
      label: 'chargeur à angle droit',
      value: 'sten',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        2: 'Appuyer sur le bouton de verrouillage du chargeur',
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
        1: 'Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        2: 'Retourner l’arme',
        3: 'Actionner le levier de verrouillage de chargeur',
        4: 'Retirer le chargeur',
        5: 'Retourner l’arme',
        6: 'Tirer le levier d’armement vers l’arrière et extraire la munition éventuelle',
        7: 'Contrôler visuellement que la chambre est vide',
      },
      img: semiAutoMilitaireThompsonImg,
      video: semiAutoMilitaireThompsonVideo,
    },
    uzi: {
      label: 'bouton poussoir à base poignée',
      value: 'uzi',
      text_steps: {
        1: 'Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        2: 'Retourner l’arme',
        3: 'Appuyer sur le bouton de verrouillage de chargeur en bas de la poignée (pouce main gauche)',
        4: 'Retirer le chargeur',
        5: 'Tirer le levier d’armement situé sur le dessus de l’arme vers l’arrière et retirer la munition éventuelle de la chambre',
        6: 'Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
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
