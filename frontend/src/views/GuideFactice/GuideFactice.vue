<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { routePath, guideSteps } from '@/utils/firearms-utils'
import { store } from '@/store.js'
import StepsGuide from './StepsGuide.vue'

store.isDisplayHeader = false

const router = useRouter()

const selectedOption = useStorage('selectedOption', '')

const currentStep = ref(1)
const steps = ['', '', '', '']

const goToNewRoute = () => (
  currentStep.value === 0
    ? router.push({ name: 'SafetyRecommendation' })
    : router.push({ name: `${guideSteps[currentStep.value - 1]}` })
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

watch(selectedOption, (newValue) => {
  selectedOption.value = newValue
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
          :disabled="currentStep === 2 && selectedOption === ''"
          :icon-right="true"
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
