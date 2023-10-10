<script setup>
import { ref } from 'vue'

import logoDnum from '@/assets/logo_dnum.jpg'
import logoSCAE from '@/assets/logo_scae.png'
import logoPN from '@/assets/logo_police.png'
import logoGendarmerie from '@/assets/logo_gendarmerie.png'

const imgs = ref([
  {
    alt: "Logo Ministère de l'interieur",
    id: 'logo_dnum',
    src: logoDnum,
  },
  {
    alt: 'Logo SCAE',
    id: 'logo_scae',
    src: logoSCAE,
  },
  {
    alt: 'Logo Police Nationale',
    id: 'logo_pn',
    src: logoPN,
  },
  {
    alt: 'Logo Gendarmerie',
    id: 'logo_gendarmerie',
    src: logoGendarmerie,
  },
])
</script>

<template>
  <div>
    <div class="fr-container mt-4">
      <h1>À propos</h1>
      <div>
        <p class="title-space">
          Basegun est un projet d'application par apprentissage automatique capable
          d'identifier et de classifier de manière fiable et rapide une arme à feu.
        </p>
        <p>
          Le projet a été initié en 2021 dans le contexte du programme
          <a
            target="_blank"
            href="https://eig.etalab.gouv.fr/defis/basegun/"
          >Entrepreneurs d’Intérêt Général</a>.
        </p>
        <p>
          Il est actuellement piloté par le Datalab de la Direction du Numérique du Ministère de l'Intérieur et des Outre-Mer,
          en partenariat avec le Service Central des Armes et Explosifs. La Direction Générale de la Police Nationale
          et la Direction Générale de la Gendarmerie Nationale sont associées pour les tests et le suivi de l'application.
        </p>
        <div />
        <p>
          A ce jour, Basegun permet de prendre en photo une arme à feu et d'obtenir un
          résultat parmi 12 typologies possibles. Ce résultat donne une indication sur la ou les catégories légales
          à laquelle l'arme appartient.
        </p>
        <p class="fr-callout">
          <VIcon
            class="fr-icon-alert-fill"
            name="ri-alert-fill"
          />Basegun prend en compte uniquement l'identification d'armes à feu létales et d'armes factices type airsoft.
          <br>Elle ne permet donc pas encore de distinguer les armes à air comprimé > 2 joules, les armes à blanc ou neutralisées.
        </p>

        <div class="container-img">
          <div
            v-for="img in imgs"
            :key="img.id"
          >
            <img
              class="img"
              :src="img.src"
              :alt="img.alt"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin: min(5vw, 10rem);
}

.contact-list {
  margin-left: 2rem;
}

.small-text {
  font-size: 10pt;
  margin-bottom: 0;
}

.small-link {
  color: var(--blue-france-sun-113-625);
}

.small-link:hover {
  color: #1212ff
}

  .title-space {
margin-top: 20px;
}

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

.list {
  margin-left: 2em;
  list-style: square;
}

:deep(.fr-icon-alert-fill) {
  padding-right: .1em;
}

</style>
