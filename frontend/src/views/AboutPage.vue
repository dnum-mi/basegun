<script lang="ts" setup>
import { ref } from "vue";

import logoDnum from "@/assets/logo_dnum.jpg";
import logoSCAE from "@/assets/logo_scae.png";
import logoPN from "@/assets/logo_police.png";
import logoGendarmerie from "@/assets/logo_gendarmerie.png";

const imgs = ref([
  {
    alt: "Logo Ministère de l'interieur",
    id: "logo_dnum",
    src: logoDnum,
  },
  {
    alt: "Logo SCAE",
    id: "logo_scae",
    src: logoSCAE,
  },
  {
    alt: "Logo Police Nationale",
    id: "logo_pn",
    src: logoPN,
  },
  {
    alt: "Logo Gendarmerie",
    id: "logo_gendarmerie",
    src: logoGendarmerie,
  },
]);
</script>

<template>
  <div class="fr-container mt-4">
    <h1>À propos</h1>
    <p>
      Basegun est un projet d'application par apprentissage automatique capable
      d'identifier et de classer de manière fiable et rapide une arme à feu.
    </p>
    <p>
      Le projet a été initié en 2021 dans le contexte du programme
      <a target="_blank" href="https://eig.etalab.gouv.fr/defis/basegun/"
        >Entrepreneurs d’Intérêt Général</a
      >.
    </p>
    <p>
      Il est actuellement piloté par
      <span class="font-bold"
        >la Fabrique Numérique de la Direction de la Transformation
        Numérique</span
      >
      du Ministère de l'Intérieur et des Outre-Mer, en partenariat avec le
      <span class="font-bold">Service Central des Armes et Explosifs</span> de
      la Direction des entreprises et partenariats de sécurité et des armes
    </p>
    <p>
      <span class="font-bold"
        >La Direction Générale de la Police Nationale</span
      >
      et
      <span class="font-bold"
        >la Direction Générale de la Gendarmerie Nationale</span
      >
      sont associées pour les tests et le suivi de l'application.
    </p>
    <p>
      A ce jour, Basegun permet de prendre en photo une arme à feu et d'obtenir
      un résultat parmi 12 typologies possibles. Ce résultat donne une
      indication sur la ou les catégories légales à laquelle l'arme appartient.
    </p>
    <div class="fr-callout fr-icon-alert-fill">
      Basegun prend en compte uniquement l'identification d'armes à feu létales,
      d'armes d'alarme et d'armes factices type airsoft.<br />
      Elle ne permet donc pas encore de distinguer les armes à air comprimé > 2
      joules, les armes à blanc ou neutralisées.
    </div>

    <div class="container-img">
      <div v-for="img in imgs" :key="img.id">
        <img class="img" :src="img.src" :alt="img.alt" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-img {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.img {
  margin: 2em;
  width: 6em;
  height: auto;
}

:deep(.fr-icon-alert-fill) {
  padding-right: 0.1em;
}
</style>
