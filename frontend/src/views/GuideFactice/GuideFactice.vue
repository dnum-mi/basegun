<script setup>
import { watch, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import { routePath, guideSteps, results } from '@/utils/firearms-utils'
import { store } from '@/store.js'
import StepsGuide from './StepsGuide.vue'

store.isDisplayHeader = false

const route = useRoute()
const router = useRouter()

const label = useStorage('label')
const selectedMechanism = useStorage('selectedMechanism', '')
const selectedAmmunition = useStorage('selectedAmmunition', '')

const currentStep = useStorage('currentStep', 1)

const steps = []
steps.length = results[label.value].stepsNumber
steps.fill(' ')

guideSteps.value = results[label.value].stepsNumber === 4
  ? [...guideSteps]
  : [...guideSteps].filter(str => (str !== 'SelectOption'))

const goToNewRoute = () => (
  currentStep.value === 0
    ? router.push({ name: 'SafetyRecommendation' })
    : router.push({ name: `${guideSteps.value[currentStep.value - 1]}` })
)

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 1
)
const goToNextStep = () => (
  currentStep.value = currentStep.value < routePath.length ? currentStep.value + 1 : routePath.length
)

const validate = () => {
  router.push({ name: 'Result' })
  store.isFactice = !!store.isBalls
}

const disabledNextStep = computed(() =>
  route.name === 'SelectOption' &&
  (store.isDisabledNextStep === null && selectedMechanism !== undefined))
const disabledValidation = computed(() =>
  route.name === 'AmmoType' &&
  (store.isDisabledValidate === null && selectedAmmunition !== undefined))

watch([selectedMechanism, selectedAmmunition], (newValue) => {
  selectedMechanism.value = newValue
  selectedAmmunition.value = newValue
  currentStep.value = newValue
})
</script>

<template>
  <div class="result col-11 col-lg-6">
    <div>
      <StepsGuide
        class="steps-guide"
        :steps="steps"
        :current-step="currentStep"
      />
      <RouterView />
    </div>
    <div class="footer-background">
      <div class="col-11 col-lg-6 footer-actions">
        <DsfrButton
          class="m-1 flex justify-content-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goToNewRoute()"
        />
        <DsfrButton
          v-show="currentStep < steps.length"
          class="m-1 flex justify-content-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :disabled="disabledNextStep"
          :icon-right="true"
          @click="goToNextStep(); goToNewRoute()"
        />
        <DsfrButton
          v-show="currentStep === steps.length"
          class="m-1 flex justify-content-center"
          label="Valider"
          :disabled="disabledValidation"
          @click="validate()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps-guide {
  margin: 2em auto;
}

.result {
  margin: 0 auto;
  max-width: 1000px;
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

</style>
