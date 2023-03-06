<script setup>
import { computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { routePaths, guideSteps, results } from '@/utils/firearms-utils.js'

import StepsGuide from './StepsGuide.vue'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

const stepsStore = useStepsStore()
const resultStore = useResultStore()

const route = useRoute()
const router = useRouter()

const disabledNextStep = computed(() => !!(route.name === 'SelectOption' && stepsStore.selectedOption === undefined))
const disabledValidation = computed(() => stepsStore.selectedAmmo === undefined)
const tutorialInterupt = computed(() => !!(route.name === 'SelectOption' && stepsStore.selectedOption === 'sans_chargeur'))

const currentStep = computed({
  get () {
    return stepsStore.currentStep
  },
  set (value) {
    stepsStore.setCurrentStep(value)
  },
})

const steps = []
steps.length = results[resultStore.typology].stepsNumber
steps.fill(' ')

guideSteps.value = results[resultStore.typology].stepsNumber === 4
  ? [...guideSteps]
  : [...guideSteps].filter(str => (str !== 'SelectOption'))

const goToNewRoute = () => (
  currentStep.value === 0
    ? router.push({ name: 'SafetyRecommendation' }).catch(() => {})
    : tutorialInterupt.value === true
      ? router.push({ name: 'EndTutorial' })
      : router.push({ name: `${guideSteps.value[currentStep.value - 1]}` }).catch(() => { })
)

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 1
)

const goToNextStep = () => (
  currentStep.value = currentStep.value < routePaths.length ? currentStep.value + 1 : routePaths.length
)

watchEffect(() => {
  if (!resultStore.img) {
    router.push({ name: 'Start' })
  }
})

</script>

<template>
  <div class="mx-auto col-11 col-lg-6 d-flex justify-content-between">
    <div class="p-3 ps-0">
      <router-link
        v-slot="{navigate}"
        class="go-result"
        :to="{name: 'Result'}"
      >
        <VIcon
          name="ri-arrow-left-line"
          scale="0.8"
        />
        <span
          class="px-2"
          @click="navigate()"
        >Retour au résultat</span>
      </router-link>
    </div>
    <div class="p-2">
      <router-link
        :to="{ name: 'Start' }"
      >
        <img
          class="go-home"
          src="@/assets/basegun.png"
          alt="logo-basegun"
        >
      </router-link>
    </div>
  </div>
  <div class="result col-11 col-lg-6">
    <div>
      <StepsGuide
        v-if="route.name !== 'EndTutorial'"
        class="steps-guide"
        :steps="steps"
        :current-step="currentStep"
      />
      <RouterView />
    </div>
    <div
      v-if="route.name !== 'EndTutorial'"
      class="footer-background"
    >
      <div
        class="col-11 col-lg-6 footer-actions mx-auto"
      >
        <DsfrButton
          class="m-1 flex justify-content-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goToNewRoute()"
        />
        <DsfrButton
          v-if="currentStep < steps.length"
          class="m-1 flex justify-content-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :disabled="disabledNextStep"
          :icon-right="true"
          @click="goToNextStep(); goToNewRoute()"
        />
        <DsfrButton
          v-if="currentStep === steps.length"
          class="m-1 flex justify-content-center"
          label="Valider"
          :disabled="disabledValidation"
          @click="router.push({name: 'Result'})"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.steps-guide {
  margin: auto;
}

a {
  background-image: none !important;
}

.result {
  margin: 0 auto;
  max-width: 1000px;
}

.go-home {
  width: 3em;
  height: 3em;
}

.go-result {
  font-size: 0.9em;
  color: #080894;
  background-image: none !important;
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

.footer-background {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer-background button {
  width: 50%;
}

</style>
