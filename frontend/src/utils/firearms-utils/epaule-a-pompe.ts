import epaulePompeSimpleVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_simple.mp4'
// import epaulePompeCompliqueVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_pompe/epaule_pompe_complique.mp4'
/*
3 - Armes d’épaule à pompe

*/
export const epaule_a_pompe = {
  displayLabel: "Arme d'épaule à pompe",
  getCategory: (gunLength: number, gunBarrelLength: number) => {
    if (gunLength && gunBarrelLength) { return gunLength > 75 && gunBarrelLength > 55 ? 'C' : 'B' } else { return 'B ou C' }
  },
  isDummyTypology: false,
  options_text: '',
  text_steps: {
    1: 'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution',
    2: 'Si la pompe est bloquée, <span class="font-bold">appuyer sur le bouton de déverrouillage</span> situé à l’avant ou sous le pontet',
    3: 'Actionner la pompe doucement d’arrière en avant afin d’<span class="font-bold">extraire toutes les munitions</span>',
    4: 'Contrôler visuellement que la chambre est vide',
    5: '<span class="font-bold">Verrouiller l’arme</span> en avançant légèrement la pompe vers l’avant',
    6: '<span class="font-bold">Contrôler l’orifice du tube magasin</span> et constater que celui-ci est bien vide',
  },
  video: epaulePompeSimpleVideo,
  getDisclaimer: (category: string) => {
    if (category === 'B ou C') { return '<strong>Catégorie B</strong> si la <strong>capacité maximale</strong> (chambre comprise) est <strong>supérieure à 5</strong>, ou si la <strong>crosse n’est pas fixe</strong>.' }
    if (category === 'C') { return '<strong>Catégorie B</strong> si la <strong>capacité maximale</strong> (chambre comprise) est <strong>supérieure à 5</strong>, ou si la <strong>crosse n’est pas fixe</strong>, ou si le <strong>canon est lisse</strong>.' }
  },
} as const
