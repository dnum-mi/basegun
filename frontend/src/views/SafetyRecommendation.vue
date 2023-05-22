<script setup>
import { ref, computed } from 'vue'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { results } from '@/utils/firearms-utils.js'

const stepsStore = useStepsStore()
const resultStore = useResultStore()
const instructions = ref([
  '<ul>',
  "<li>Une arme doit toujours être <span class='font-bold text-orange-700'>considérée comme chargée</span>. </li>",
  "<li>En cas de doute, <span class='font-bold text-orange-700'>s’arrêter et faire appel à un expert.</span></li>",
  "<li>Avant de manipuler une arme, toujours s’assurer qu’elle est <span class='font-bold text-orange-700'>mise en sécurité.</span></li>",
  "<li>Veiller à la préservation des <span class='font-bold text-orange-700'>traces et indices </span> éventuels lors des manipulations.</li>",
  '</ul>',
])

const typology = computed(() => resultStore.typology)
const label = computed(() => results[typology.value]?.displayLabel)

function setTutorialStep () {
  stepsStore.setCurrentStep(1)
}
</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mt-12 mx-auto">
      <h3>
        Vérifier si votre {{ label }} est factice
      </h3>

      <p>
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
    <div class="big-blank" />
  </div>
  <div class="footer">
    <div class="mx-auto fr-col-11 fr-col-lg-6">
      <router-link
        v-slot="{navigate}"
        :to="{name: 'FirearmDirection'}"
      >
        <DsfrButton
          class="mx-4 my-1 flex justify-center"
          label="Commencer"
          icon="ri-arrow-right-line"
          :icon-right="true"
          @click="navigate(); setTutorialStep()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'Result'}"
      >
        <DsfrButton
          class="mx-4 my-1 flex justify-center"
          label="Retour au resultat"
          icon="ri-arrow-go-back-fill"
          :icon-right="true"
          secondary
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
a {
  background-image: none !important;
}

.result {
  max-width: 1000px;
}

.callout {
  padding-left: 5em;
}

.text-orange {
  font-weight: 700;
  color: rgb(179 64 0 / 100%)
}

.footer {
  text-align: center;
}

.footer button {
  width: 80%;
}
</style>
