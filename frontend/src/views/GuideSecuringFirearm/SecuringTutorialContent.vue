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
      <h4 class="mt-5">
        Mettre en sécurité mon arme
      </h4>
      <p>
        Description de manipulations de l'utilisateur
      </p>
    </div>
    <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
      <div class="fr-content-media">
        <video
          autoplay
          controls
          playsinline
          loop
          muted
          src="../../assets/guide-factice/videos/revolver-1_sm.mp4"
        />
      </div>
    </div>
  </div>
  <div class="big-blank" />
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <router-link
        v-slot="{navigate}"
        :to="{name: 'SecuringTutorialContent'}"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="navigate()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name: 'SecuringAchievement'}"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
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
  text-align: center;
}

</style>

<style scoped>
:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.modal-content) {
  overflow-y: scroll;
}

video {
  width: 100% !important;
  height: auto !important;
}
.open-info {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.open-info svg {
  margin-top: 1rem;
  fill: #ff1d1d;
  cursor: pointer;
}

.full {
  width: 100%;
  justify-content: center;
  margin: auto;
  margin-top: .5rem;
}
</style>
