<script setup>
import { ref } from 'vue'

import UploadButton from '@/components/UploadButton.vue'
import GoodExamplePhoto from '@/assets/good-photo-example.jpg'
import BadExamplePhoto from '@/assets/bad-photo-example.jpg'

const instructions = [
  '1 - Présenter le<b>&nbsp;canon vers la droite</b><br>',
  "2 - Ne photographier qu'<b>&nbsp;une seule &nbsp;</b>arme <br>",
  "3 - Placer l'arme<b>&nbsp;en entier&nbsp;</b> et <b>&nbsp;centrée&nbsp;</b> <br> ",
]

const uploadMessage = ref('')
const fileInput = ref(null)

function readInstruction () {
  fileInput.value.click()
}
</script>

<template>
  <div
    class="md:absolute md:inset-y-1\/3 md:inset-x-0 fr-col-lg-6  fr-col-sm-9  mx-auto"
  >
    <div class="fr-alert fr-alert--info">
      <h3 class="fr-alert__title">
        Pour un résultat optimal
      </h3>
      <span
        v-for="instruction in instructions"
        :key="instruction.id"
        class="m-auto-lg lg:flex flex-wrap"
        v-html="instruction"
      />
    </div>

    <div class="container-img  lg:flex">
      <DsfrPicture
        title="title"
        :src="GoodExamplePhoto"
        alt="photo d'une arme tournée vers la droite et centrée"
        legend="Exemple d'une bonne photo"
      />
      <DsfrPicture
        :src="BadExamplePhoto"
        alt="photo d'une arme tournée vers la gauche et partiellement coupée"
        legend="Exemple d'une mauvaise photo"
      />
    </div>
  </div>
  <div class="blank" />
  <div class="footer-background">
    <div
      v-if="!uploadMessage"
      class="btn-read-instruction text-center"
    >
      <div
        class="fr-col-11 fr-col-lg-6 mx-auto"
      >
        <UploadButton
          ref="fileInput"
          @file-selected="uploadMessage = 'Analyse en cours'"
        />
        <DsfrButton
          class="flex justify-center"
          label="Prendre la photo"
          icon="ri-camera-fill"
          :icon-right="true"
          @click="readInstruction()"
        />
      </div>
    </div>
    <div
      v-else
      class="text-center bold"
    >
      <p class="loading bold-highlight">
        {{ uploadMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>

.fr-alert {
  margin-top: 9em;
}

.title {
  margin: 1em;
}

:deep(.fr-alert) {
  margin: 1em;
}

:deep([class*=" fr-ratio"]) {
  width: auto !important;
  max-width: 95%;
  object-fit: contain;
}

:deep(.fr-content-media) {
  margin: 1rem auto;
}

.container-img {
  justify-content: center;
  text-align: center;
  padding: 0 0.5rem;
}

img {
  max-width: 100%;
  max-height: 200px;
  padding: 0 0.5rem;
}

.modal-img-text {
  font-style: italic;
}

/* loading dots */
.loading {
  color: #000091;
}

.loading::after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgb(0 0 0 / 0%);
    text-shadow:
      0.25em 0 0 rgb(0 0 0 / 0%),
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  40% {
    color: #000091;
    text-shadow:
      0.25em 0 0 rgb(0 0 0 / 0%),
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  60% {
    text-shadow:
      0.25em 0 0 #000091,
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  80%,
  100% {
    text-shadow:
      0.25em 0 0 #000091,
      0.5em 0 0 #000091;
  }
}
</style>
