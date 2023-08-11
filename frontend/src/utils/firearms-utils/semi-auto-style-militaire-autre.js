import autreEpauleAr15Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ar_arrow1.jpg'
import autreEpauleAr15Video from '@/assets/guide-factice/videos/ar_sm.mp4'
import autreEpauleAkImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-ak_arrow1.jpg'
import autreEpauleAkVideo from '@/assets/guide-factice/videos/ak_sm.mp4'
import autreEpauleBullpupImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-bullpup_arrow1.jpg'
import autreEpauleBullpupVideo from '@/assets/guide-factice/videos/bullpup_sm.mp4'
import autreEpauleThompsonImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-thompson_arrow1.jpg'
import autreEpauleThompsonVideo from '@/assets/guide-factice/videos/thompson_sm.mp4'
// import autreEpauleP90Img from '@/assets/guide-factice/images/autre_epaule/autre-epaule-p90_arrow1.jpg'
// import autreEpauleP90Video from '@/assets/guide-factice/videos/p90_sm.mp4'
import autreEpaulePistoletMitralleurImg from '@/assets/guide-factice/images/autre_epaule/autre-epaule-pistolet-mitrailleur-arrow.jpg'
import autreEpaulePistoletMitralleurVideo from '@/assets/guide-factice/videos/pistolet_mitrailleur_sm.mp4'
import autreEpauleCartridges from '@/assets/guide-factice/images/autre_epaule/autre-epaule-cartridges.jpg'
import autreEpauleBalls from '@/assets/guide-factice/images/autre_epaule/autre-epaule-balls.jpg'
/*
Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const semi_auto_style_militaire_autre = {
  displayLabel: 'arme d’épaule semi-automatiques ou automatiques type militaire moderne',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  textOptions: '',
  options: {
    ar15: {
      label: 'bouton au-dessus chargeur',
      value: 'ar15',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Appuyer avec l’index de la main droite sur le bouton poussoir situé côté droit de l’arme et extraire le chargeur de l’arme',
        text_step_3: '3 - Tirer le levier d’armement vers l’arrière (idée Antoine : rajouter une incrustation du bouton du levier qui permet de tirer ?)',
        text_step_4: '4 - Retirer la munition éventuelle',
        text_step_5: '5 - Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
      },
      img: autreEpauleAr15Img,
      video: autreEpauleAr15Video,
    },
    kalash: {
      label: 'levier derrière chargeur',
      value: 'kalash',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Vérifier que le sélecteur de tir n’est pas en position haute, et le descendre si besoin (incruster flèche)',
        text_step_3: '3 - Appuyer sur le levier de déverrouillage du chargeur avec le pouce et extraire le chargeur en le faisant pivoter vers l’avant',
        text_step_4: '4 - Tirer le levier d’armement vers l’arrière',
        text_step_5: '5 - Retirer la munition éventuelle de la chambre',
        text_step_6: '6 - Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
      },
      img: autreEpauleAkImg,
      video: autreEpauleAkVideo,
    },
    sten: {
      label: 'chargeur à angle droit',
      value: 'sten',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Appuyer sur le bouton de verrouillage du chargeur',
        text_step_3: '3 - Retirer le chargeur',
        text_step_4: '4 - Tirer le levier d’armement vers l’arrière et bloquer le levier en position arrière dans le cran arrière, en extrayant la cartouche éventuelle s’il y en a une',
        text_step_5: '5 - Contrôler visuellement que la chambre est vide',
      },
      img: autreEpauleBullpupImg,
      video: autreEpauleBullpupVideo,
    },
    thompson: {
      label: 'levier au-dessus pontet',
      value: 'thompson',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Retourner l’arme',
        text_step_3: '3 - Actionner le levier de verrouillage de chargeur',
        text_step_4: '4 - Retirer le chargeur',
        text_step_5: '5 - Retourner l’arme',
        text_step_6: '6 - Tirer le levier d’armement vers l’arrière et extraire la munition éventuelle',
        text_step_7: '7 - Contrôler visuellement que la chambre est vide',
      },
      img: autreEpauleThompsonImg,
      video: autreEpauleThompsonVideo,
    },
    uzi: {
      label: 'bouton poussoir à base poignée',
      value: 'uzi',
      text_steps: {
        text_step_1: '1 - Observer l’arme en l’orientant dans une direction sans risque, en manipulant avec précaution',
        text_step_2: '2 - Retourner l’arme',
        text_step_3: '3 - Appuyer sur le bouton de verrouillage de chargeur en bas de la poignée (pouce main gauche)',
        text_step_4: '4 - Retirer le chargeur',
        text_step_5: '5 - Tirer le levier d’armement situé sur le dessus de l’arme vers l’arrière et retirer la munition éventuelle de la chambre',
        text_step_6: '6 - Tout en maintenant le levier d’armement vers l’arrière, contrôler visuellement que la chambre est vide',
      },
      img: autreEpaulePistoletMitralleurImg,
      video: autreEpaulePistoletMitralleurVideo,
    },
  },
  guideFactice: {
    cartouches: {
      label: 'cartouches',
      value: 'cartouches',
      img_ammo: autreEpauleCartridges,
    },
    billes: {
      label: 'billes',
      value: 'billes',
      img_ammo: autreEpauleBalls,
    },
  },
}
