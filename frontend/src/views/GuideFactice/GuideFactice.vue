<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { routePath, guideSteps, results } from '@/utils/firearms-utils'
import { store } from '@/store.js'
import StepsGuide from './StepsGuide.vue'

store.isDisplayHeader = false

onMounted(() => { console.table(store) })

const router = useRouter()

const selectedOption = useStorage('selectedOption', '')

const currentStep = ref(1)
// const currentStep = useStorage('currentStep', 1)

const steps = []
steps.length = results[store.label].stepsNumber
steps.fill(' ')

const guideStepsWithoutOptions = guideSteps.filter(str => { return str.includes(PATTERN) })
// filtered = myArray.filter(function (str) { return str.includes(PATTERN); });

console.log('guideSteps :', guideSteps)
console.log('guideStepsWithoutOptions :', guideStepsWithoutOptions)

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
  // currentStep.value = newValue
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
          :disabled="store.isDisabledNextStep === null && currentStep === 2 && selectedOption !== true"
          :icon-right="true"
          @click="goToNextStep(); goToNewRoute()"
        />
        <DsfrButton
          v-show="currentStep === steps.length"
          class="m-1 flex justify-content-center"
          :disabled="store.isDisabledValidate === null && currentStep === 4 && selectedOption !== true"
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
