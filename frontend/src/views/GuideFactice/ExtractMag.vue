<script setup>
import { store } from '@/store.js'
</script>

<template>
  <div v-if="store.isLever">
    <p class="text-tutorial mt-3">
      <span class="bold">Appuyer sur le bouton</span> avec le pouce de la main droite, puis <span class="bold">
        extraire le chargeur </span>avec la main gauche en le tirant ou en le laissant glisser.
    </p>
    <div class="col-sm-6 col-lg-12">
      <img
        src="@/assets/pistol-1_0.jpg"
        alt=""
        class="img-deco"
      >
      <!-- <video
        width="320"
        height="240"
        type="video/mp4"
        autoplay
        loop
        muted
        src="@/assets/verrou-sm_originale.mp4"
      /> -->
      <!-- <DsfrVideo
        type="video/mp4"
        src="@/assets/verrou-sm_originale.mp4"
      /> -->
    </div>
  </div>
  <div v-if="store.isButton">
    <p class="text-tutorial mt-3">
      Pousser le  bouton vers l’arrière  avec le pouce de l’autre main,
      puis extraire le chargeur de la même main en le tirant ou en le laissant glisser.
    </p>
    <div class="col-sm-6 col-lg-12">
      <img
        src="@/assets/pistol-2_0.jpg"
        alt=""
        class="img-deco"
      >
      <!-- <video
        width="320"
        height="240"
        type="video/mp4"
        autoplay
        loop
        muted
        src="@/assets/verrou-sm_originale.mp4"
      /> -->
      <!-- <DsfrVideo
        type="video/mp4"
        src="@/assets/verrou-sm_originale.mp4"
      /> -->
    </div>
  </div>
  <a href="#">
    Je n'arrive pas à réaliser cette étape
    <VIcon
      name="ri-information-line"
    />
  </a>
  <div class="blank" />
</template>
