<script setup>
import { computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { airsoftsRoutePaths, airsoftsGuideSteps, results } from '@/utils/firearms-utils.js'

import StepsGuide from './StepsGuide.vue'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import axios from 'axios'

const stepsStore = useStepsStore()
const resultStore = useResultStore()

const route = useRoute()
const router = useRouter()

const disabledNextStep = computed(() => !!(route.name === 'SelectOption' && stepsStore.selectedOption === undefined))
const disabledValidation = computed(() => stepsStore.selectedAmmo === undefined)

const imgUrl = computed(() => resultStore.imgUrl)
const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const typology = computed(() => resultStore.typology)

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

airsoftsGuideSteps.value = results[resultStore.typology].stepsNumber === 4
  ? [...airsoftsGuideSteps]
  : [...airsoftsGuideSteps].filter(str => (str !== 'SelectOption'))

const goToNewRoute = () => (
  currentStep.value === 0
    ? router.push({ name: 'SafetyRecommendation' }).catch(() => {})
    : router.push({ name: `${airsoftsGuideSteps.value[currentStep.value - 1]}` }).catch(() => { })
)

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 1
)

const goToNextStep = () => (
  currentStep.value = currentStep.value < airsoftsRoutePaths.length ? currentStep.value + 1 : airsoftsRoutePaths.length
)

watchEffect(() => {
  if (!resultStore.img) {
    router.push({ name: 'StartPage' })
  }
})

async function sendLogsIdentificationDummy () {
  const json = {
    image_url: imgUrl.value,
    confidence: confidence.value,
    label: typology.value,
    confidence_level: confidenceLevel.value,
    tutorial_option: stepsStore.selectedOption,
    is_dummy: stepsStore.isDummy,
  }
  await axios.post('/identification-dummy', json)
    .then(async res => {
      console.log(res)
    })
    .catch(async err => {
      console.log(err)
    })
    .finally(async res => {
      router.push({ name: 'ResultPage' }).catch(() => {})
    })
}

// zoom autorisé sur toutes les vues du guide factice
const metaViewport = document.querySelector('meta[name="viewport"]')
onMounted(() => {
  if (metaViewport) {
    metaViewport.setAttribute('content', 'initial-scale=1, maximum-scale=3, user-scalable=yes')
  }
})
onBeforeUnmount(() => { metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no') })
</script>

<template>
  <div class="mx-auto fr-col-11 fr-col-lg-6 flex justify-between">
    <div class="my-4">
      <router-link
        v-slot="{navigate}"
        class="go-result"
        :to="{name: 'FinalResult'}"
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
    <div class="mt-4">
      <router-link
        :to="{ name: 'StartPage' }"
      >
        <VIcon
          class="fr-icon-home-3-line"
          name="ri-home-3-line"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
  <div class="result fr-col-11 fr-col-lg-6">
    <div>
      <StepsGuide
        class="steps-guide"
        :steps="steps"
        :current-step="currentStep"
      />
      <RouterView />
    </div>
    <div class="footer">
      <div
        class="fr-col-11 fr-col-lg-6 footer-actions mx-auto"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goToNewRoute()"
        />
        <DsfrButton
          v-if="currentStep < steps.length"
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :disabled="disabledNextStep"
          :icon-right="true"
          @click="goToNextStep(); goToNewRoute()"
        />
        <DsfrButton
          v-if="currentStep === steps.length"
          class="m-1 flex justify-center"
          label="Valider"
          :disabled="disabledValidation"
          @click=" sendLogsIdentificationDummy()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.steps-guide {
  margin: auto;
}

:deep(div.fr-stepper__steps) {
  border-radius: 5px 5px 5px 5px;
}

:deep(.fr-icon-home-3-line) {
  color: #000091;
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

.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
  width: 50%;
}

</style>
