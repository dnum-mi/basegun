<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <div class="mx-auto fr-col-11 fr-col-lg-6 flex justify-between">
    <div class="fr-container m-5">
      <router-link
        :to="{ name: 'StartPage' }"
      >
        <VIcon
          class="absolute right-3 fr-icon-home-3-line"
          name="ri-home-3-line"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mt-12 mx-auto">
      <h4 class="mt-3">
        Mettre en sécurité mon arme
      </h4>
      <p class="manipulations -mx-8 p-6">
        <span class="font-bold">Appuyer sur le bouton</span> avec le pouce de la main droite,
        puis <span class="font-bold">extraire le chargeur</span> avec la main gauche en le tirant ou en le laissant glisser.
      </p>
      <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
        <div class="fr-content-media">
          <video
            autoplay
            controls
            playsinline
            loop
            muted
            src="../../assets/guide-factice/videos/pistol-1_sm.mp4"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="router.push({ name:'Instructions'})"
        />
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :icon-right="true"
          @click="router.push({ name:'SecuringAchievement'})"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-deco {
  margin-bottom: 1em;
  margin-top: 0;
  width: 75%;
}

.warning {
  color : var(--red-marianne-425-625)
}

:deep(.fr-icon-home-3-line) {
  color: #000091;
}
.footer {
background-color: #fff;
box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
width: 50%;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

video {
  width: 100% !important;
  height: auto !important;
}

.manipulations {
  background-color: #E3E3FD;
}
</style>
