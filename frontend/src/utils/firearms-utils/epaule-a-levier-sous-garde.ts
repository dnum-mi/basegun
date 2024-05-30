import levierSousGardeMagasinAvantImg from '@/assets/guide-mise-en-securite/photos/epaule_a_levier_sous_garde/epaule_levier_ss_garde_magasin_avant.jpg'
import levierSousGardePasMagasinImg from '@/assets/guide-mise-en-securite/photos/epaule_a_levier_sous_garde/epaule_levier_ss_garde_magasin_fixe.jpg'
import levierSousGardeMagasinAvantVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_levier_sous_garde/epaule_levier_ss_garde_magasin_avant.mp4'
import levierSousGardePasMagasinVideo from '@/assets/guide-mise-en-securite/videos/epaule_a_levier_sous_garde/epaule_levier_ss_garde_magasin_fixe.mp4'
import { getEpaulLevierVerrouDisclaimer, getCommonCategory } from '@/utils/firearms-utils/index'
/*
Armes d’épaule à levier de sous-garde
  Magasin avant
  Magasin fixe
*/
export const epaule_a_levier_sous_garde = {
  displayLabel: "Arme d'épaule à levier de sous-garde",
  getCategory: getCommonCategory,
  isDummyTypology: false,
  options_text: 'En manipulant l’arme avec précaution dans une <span class="font-bold">direction sans risque</span>, inspectez l’<span class="font-bold">extrémité du tube sous le canon</span>. Sélectionnez ce que vous voyez :',
  securingSteps: [
    {
      options: [
        {
          label: 'Embout rugueux',
          value: 'front_magazine',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution.',
            '<span class="font-bold">Faites très attention à ne pas déclencher l’arme durant cette manipulation</span>. Dévisser la baguette à l’avant du tube magasin.',
            'Retirer complètement la baguette du magasin.',
            'Vider le magasin en tapotant l’arme orientée légèrement vers le bas.',
            'Actionner le levier de sous garde jusqu’en position basse et <span class="font-bold">retirer la munition</span> éventuelle de la chambre.',
            'Contrôler visuellement que la chambre est vide.',
          ],
          img: levierSousGardeMagasinAvantImg,
          video: levierSousGardeMagasinAvantVideo,
        },
        {
          label: 'Pas d’embout',
          value: 'fixed_magazine',
          text_steps: [
            'Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution.',
            'Abaisser le levier de sous garde en position basse et <span class="font-bold">retirer la munition</span> éventuelle de la chambre.',
            '<span class="font-bold" style="color:red">Veiller à ne pas appuyer sur la queue de détente pendant cette manipulation !</span> <br> Relever et abaisser le levier de sous garde tout en extrayant les munitions tant qu’il y a toujours des munitions présentes dans le tube magasin.',
            'Contrôler visuellement que la chambre est vide.',
          ],
          img: levierSousGardePasMagasinImg,
          video: levierSousGardePasMagasinVideo,
        },
      ],
    },
  ],
  getDisclaimer: getEpaulLevierVerrouDisclaimer,
} as const
