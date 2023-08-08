/*
1 - Armes d’épaule à un coup par canon
  Clé de pouce
  Clé Lefaucheux
  Clé Darne
  */
export const epauleAUnCoup = {
  displayLabel: "arme d'épaule à un coup par canon",
  category: 'C',
  mention: 'Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  options: {
    cle_pouce: {
      label: 'epauleAUnCoup-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    cle_lefaucheux: {
      label: 'epauleAUnCoup-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    cle_darne: {
      label: 'epauleAUnCoup-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
}
/*
2 - Armes d’épaule à verrou
*/
export const epauleAVerrou = {
  displayLabel: "arme d'épaule à verrou",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: false,
}
/*
3 - Armes d’épaule à pompe
*/
export const epauleAPompe = {
  displayLabel: "arme d'épaule à pompe",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: false,
}
/*
4 - Armes d’épaule à levier de sous-garde
  Magasin avant
  Magasin fixe
*/
export const epauleALevierSousGarde = {
  displayLabel: "arme d'épaule à levier de sous-garde",
  category: 'B ou C',
  mention: 'B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: false,
  isSecuringOptions: true,
  options: {
    front_magazine: {
      label: 'epauleALevierSousGarde-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    fixed_magazine: {
      label: 'epauleALevierSousGarde-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
}
/*
5 - Armes d’épaule semi-automatiques ou automatiques type militaire moderne
  AR15
  Kalash
  Sten
  Thompson
  UZI
*/
export const epauleSemiAutoAutoMilitaireModerne = {
  displayLabel: 'arme d’épaule semi-automatiques ou automatiques type militaire moderne',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: true,
  options: {
    ar15: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    kalash: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    sten: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    thompson: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    uzi: {
      label: 'epauleSemiAutoAutoMilitaireModerne-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
}
/*
6 - Armes d’épaule semi-automatiques ou automatiques type militaire milieu 20e
*/
export const epauleSemiAutoAutoMilitaireMilieu20e = {
  displayLabel: 'arme d’épaule semi-automatiques ou automatiques type militaire milieu 20e',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: false,
}
/*
7 - Armes d’épaule semi-automatiques ou automatiques type chasse
*/
export const epauleSemiAutoChasse = {
  displayLabel: 'arme d’épaule semi-automatiques ou automatiques type chasse',
  category: 'A, B ou C',
  mention: 'A - Interdite<br>B - Soumise à autorisation<br>C - Soumise à déclaration',
  isDummyTypology: true,
  isSecuringOptions: false,
}
/*
8 - Armes d’épaule à mécanisme ancien
*/
export const epauleAPercussionSilex = {
  displayLabel: "arme d'épaule à mécanisme ancien",
  category: 'D',
  mention: "Libre d'acquisition et de détention",
  isDummyTypology: false,
  isSecuringOptions: false,
}
/*
9 - Revolvers
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
  options: {
    revolver_enfield: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_1873_fr: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_1873_us: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_axe_barillet: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_bouton_barrillet: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_ancien_brisure: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    revolver_verrou_1892: {
      label: 'revolver-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
}
/*
10 - Pistolets semi-auto modernes
  Bouton pontet
  Poussoir talon
*/
export const pistoletSemiAutoModerne = {
  displayLabel: 'pistolet semi-automatique moderne',
  category: 'B',
  mention: 'Soumise à autorisation',
  isDummyTypology: true,
  isSecuringOptions: true,
  options: {
    bouton_pontet: {
      label: 'bouton pontet',
      value: 'pontet',
      text: '<span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="font-bold">extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.',
      img: 'pistoletSemiAutoModerne1Img',
      video: 'pistoletSemiAutoModerne1Video',
    },
    poussoir_talon: {
      label: 'poussoir talon',
      value: 'talon',
      text: '<span class="font-bold">Pousser le  bouton vers l’arrière</span>  avec le pouce de l’autre main, puis <span class="font-bold">extraire le chargeur</span> de la même main en le tirant ou en le laissant glisser.',
      img: 'pistoletSemiAutoModerne2Img',
      video: 'pistoletSemiAutoModerne2Video',
    },
  },
}
/*
11 - Pistolet à mécanisme ancien
*/
export const pistoletAPercussionSilex = {
  displayLabel: 'pistolet à mécanisme ancien',
  category: 'D',
  mention: "Libre d'acquisition et de détention",
  isDummyTypology: false,
  isSecuringOptions: false,
}
/*
12 - Autre pistolets
  Drulov
  Derringer
  Thompson contender
  Ancien fusil à crosse et canon scié
*/
export const autrePistolet = {
  displayLabel: 'pistolet divers',
  category: 'A, B ou D',
  mention: "A - Interdite<br>B - Soumise à autorisation<br>D - Libre d'acquisition et de détention",
  isDummyTypology: false,
  isSecuringOptions: true,
  options: {
    drulov: {
      label: 'autrePistolet-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    derringer: {
      label: 'autrePistolet-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    thompson_contender: {
      label: 'autrePistolet-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
    fusil_crosse_cannon_scie: {
      label: 'autrePistolet-label',
      value: '',
      text: '',
      img: '',
      video: '',
    },
  },
}
/**/
