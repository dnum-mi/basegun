<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StepsGuide from './StepsGuide.vue'
import { routePath, guideSteps } from '@/utils/firearms-utils';

const router = useRouter()

const currentStep = ref(1)
const steps = ["", "", "", ""]

const goToNewRoute = () => (
  currentStep.value === 0 ? router.push({ name: 'SafetyRecommendation' }) : router.push({ name: `${guideSteps[currentStep.value - 1]}` })
)
const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 1
)
const goToNextStep = () => (
  currentStep.value = currentStep.value < routePath.length ? currentStep.value + 1 : routePath.length
)

const validate = () => {/* TODO: valider le résultat */ }

</script>

<template>
  <div class="fr-container">
    <div class="flex  justify-content-center">
      <StepsGuide
        class="steps-guide"
        :steps="steps"
        :current-step="currentStep"
      />

      <RouterView />
    </div>
    <div
      class="fr-container bg-transparent fixed-bottom"
    >
      <DsfrButton
        class="m-1  flex justify-content-center"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRoute()"
      />
      <DsfrButton
        v-show="currentStep < steps.length"
        class="m-1 flex justify-content-center"
        label="Suivant"
        @click="goToNextStep(); goToNewRoute()"
      />
      <DsfrButton
        v-show="currentStep === steps.length"
        class="m-1 flex justify-content-center"
        label="Valider"
        @click="validate()"
      />
    </div>
  </div>
</template>

<style>
.steps-guide {
  width: 30em;
  margin: 2em auto;
}

.fr-link--close {
  visibility: hidden;
}

.wrapper-btn {
  margin: 0.8em;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>