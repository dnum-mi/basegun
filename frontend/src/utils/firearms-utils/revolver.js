import revolver1Img from '@/assets/guide-factice/images/revolver/revolver-1_arrow.jpg'
import revolver1Video from '@/assets/guide-factice/videos/revolver-1_sm.mp4'
import revolver2Img from '@/assets/guide-factice/images/revolver/revolver-2_arrow.jpg'
import revolver2Video from '@/assets/guide-factice/videos/revolver-2_sm.mp4'
import revolverCartridges from '@/assets/guide-factice/images/revolver/revolver-cartridges-arrow.jpg'
import revolverBalls from '@/assets/guide-factice/images/revolver/revolver-balls-arrow.jpg'
/*
Revolvers
  Revolver Enfield - Webley - brisure
  Revolver type 1873 à portière FR
  Revolver type 1873 à portière US
  Revolvers à axe de barillet
  Revolvers bouton côté barillet
  Revolvers ouverture Smith & Wesson ancien H&R brisure
  Revolvers verrou MOD 1892
*/
export const revolver = {
  displayLabel: 'revolver',
  category: 'B ou D',
  mention: "B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  isDummyTypology: true,
  isSecuringOptions: true,
  revolver_text_option: 'Sélectionner ce que vous voyez à côté du barillet',
  options: {
    revolver_enfield: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver1Img,
      video: revolver1Video,
    },
    revolver_1873_fr: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver1Img,
      video: revolver1Video,
    },
    revolver_1873_us: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver1Img,
      video: revolver1Video,
    },
    revolver_axe_barillet: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver2Img,
      video: revolver2Video,
    },
    revolver_bouton_barrillet: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver2Img,
      video: revolver2Video,
    },
    revolver_ancien_brisure: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: revolver2Img,
      video: revolver2Video,
    },
    revolver_verrou_1892: {
      label: 'revolver-label',
      value: '',
      img: revolver2Img,
      video: revolver2Video,
    },
  },
  guideFactice: {
    cartouches: {
      label: 'balles',
      value: 'cartouches',
      img_ammo: revolverCartridges,
    },
    billes: {
      label: 'bille ou trou pour billes',
      value: 'billes',
      img_ammo: revolverBalls,
    },
  },
}
