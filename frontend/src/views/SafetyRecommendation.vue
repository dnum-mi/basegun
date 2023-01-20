<script setup>
import {
  ref, onBeforeMount, computed,
} from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/store.js'

import { useStepsStore } from '@/stores/steps.js'

const stepsStore = useStepsStore()

onBeforeMount(() => {
  store.displayHeader = false
})

const router = useRouter()
const instructions = ref([
  '<ul>',
  "<li>Une arme doit toujours être <span class='text-orange'>considérée comme chargée</span>. </li>",
  "<li>En cas de doute, <span class='text-orange'>s’arrêter et faire appel à un expert.</span></li>",
  "<li>Avant de manipuler une arme, toujours s’assurer qu’elle est <span class='text-orange'>mise en sécurité.</span></li>",
  "<li>Veiller à la préservation des <span class='text-orange'>traces et indices </span> éventuels lors des manipulations.</li>",
  '</ul>',
])

function goToTutorial () {
  stepsStore.setCurrentStep(1)
  router.push({ name: 'FirearmDirection' }).catch(() => { })
}
function goToResults () {
  store.displayHeader = true
  router.push({ name: 'Result' }).catch(() => { })
}
</script>

<template>
  <div class="fr-container">
    <div class="result col-11 col-lg-6 mt-5">
      <h3>
        Vérifier si une arme est factice
      </h3>

      <p class="text-tutorial">
        Vous allez recevoir des instructions pour extraire des munitions de l’arme.
      </p>
      <div class="fr-alert fr-alert--warning callout">
        <h1 class="fr-alert__title">
          ATTENTION
        </h1>
        <span
          v-for="instruction in instructions"
          :key="instruction.id"
          class="m-auto-lg d-lg-flex flex-wrap"
          v-html="instruction"
        />
      </div>
    </div>
    <div class="blank" />
  </div>
  <div class="footer-background">
    <div>
      <DsfrButton
        class="mx-4 my-1 flex justify-content-center"
        label="Commencer"
        icon="ri-arrow-right-line"
        :icon-right="true"
        @click="goToTutorial()"
      />
      <DsfrButton
        class="mx-4 my-1 flex justify-content-center"
        label="Retour au resultat"
        icon="ri-arrow-go-back-fill"
        :icon-right="true"
        secondary
        @click="goToResults()"
      />
    </div>
  </div>
</template>

<style>
.result {
  margin: 0 auto;
  max-width: 1000px;
}

.callout {
  padding-left: 5em;
}

.text-orange {
  font-weight: 700;
  color: rgba(179, 64, 0, 1)
}

.footer-background {
  text-align: center;
}

.footer-background button {
  white-space: nowrap;
  width: 80%;
}
</style>
