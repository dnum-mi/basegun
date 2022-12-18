<script setup>
import { store } from '@/store.js'
import { useStorage } from '@vueuse/core'
import { results } from '@/utils/firearms-utils'



</script>

<template>
  <div v-if="typology === 'pistolet semi-automatique moderne'">
    <div v-if="store.isLever">
      <p class="text-tutorial mt-3">
        <span class="bold-highlight">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="bold-highlight">
          extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.
      </p>
      <div class="col-sm-6 col-lg-12">
        <div class="fr-content-media">
          <video
            width="320"
            height="240"
            type="video/mp4"
            autoplay
            loop
            muted
            src="/src/assets/videos-sm/pistol-1_sm.mp4"
          />
        </div>
      </div>
    </div>

    <div v-if="store.isButton">
      <p class="text-tutorial mt-3">
        Pousser le  bouton vers l’arrière  avec le pouce de l’autre main,
        puis extraire le chargeur de la même main en le tirant ou en le laissant glisser.
      </p>
      <div class="col-sm-6 col-lg-12">
        <div class="fr-content-media">
          <video
            width="320"
            height="240"
            type="video/mp4"
            autoplay
            loop
            muted
            src="/src/assets/videos-sm/pistol-2_sm.mp4"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-tutorial mt-3">
      <span class="bold-highlight">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="bold-highlight">
        extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.
    </p>
    <div class="col-sm-6 col-lg-12">
      <div class="fr-content-media">
        <video
          width="320"
          height="240"
          type="video/mp4"
          autoplay
          loop
          muted
          src="/src/assets/videos-sm/pistol-1_sm.mp4"
        />
      </div>
    </div>
  </div>
  <a
    class="help"
    href="#"
  >
    Je n'arrive pas à réaliser cette étape
    <VIcon
      name="ri-information-line"
    />
  </a>
  <div class="blank" />
</template>

<style scoped>
:deep(.fr-content-media__caption) {
  display:none !important;
  visibility: hidden;
}
</style>
