<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import {
  identificationRoutePaths,
  identificationRoutePathsWithArmeAlarme,
  identificationGuideSteps,
  identificationGuideStepsWithArmeAlarme,
  resultTree,
} from '@/utils/firearms-utils/index'
import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'

const stepsStore = useStepsStore()
const resultStore = useResultStore()
const router = useRouter()
const route = useRoute()

const imgUrl = computed(() => resultStore.imgUrl)
const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const typology = computed(() => resultStore.typology)

const currentStep = computed({
  get () {
    return stepsStore.currentStep + 1
  },
  set (value) {
    stepsStore.setCurrentStep(value as 1 | 2 | 3)
  },
})

const ALARM_GUNS_TYPOLOGIES = ['pistolet_semi_auto_moderne', 'revolver']

const isDummyTypology = resultTree[resultStore.typology].isDummyTypology
const isLowConfidence = confidenceLevel.value === 'low'

const steps = computed(() => {
  if (isDummyTypology || !isLowConfidence) {
    if (ALARM_GUNS_TYPOLOGIES.includes(resultStore.typology) && stepsStore.selectedAmmo === 'cartouches') {
      return ['Typologie de l\'arme', 'Compléments', 'Typologie de munitions', 'Identification d\'une arme d\'alarme', 'Résultat final']
    } else {
      return ['Typologie de l\'arme', 'Compléments', 'Typologie de munitions', 'Résultat final']
    }
  } else {
    return ['Résultat final']
  }
})

const disabledValidation = computed(() => currentStep.value === 3 && stepsStore.selectedAmmo === undefined)

const goToNewRoute = () => (
  router.push({ name: `${identificationGuideSteps[currentStep.value - 1]}` }).catch(() => { })
)

const goToNewRouteWithArmeAlarme = () => (
  router.push({ name: `${identificationGuideStepsWithArmeAlarme[currentStep.value - 1]}` })
)

const isArmeAlarme = computed(() => route.path === '/guide-identification/armes-alarme')

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 2
)

const stepsNumber = computed(() => ALARM_GUNS_TYPOLOGIES.includes(resultStore.typology)
  ? identificationRoutePaths.length
  : identificationRoutePathsWithArmeAlarme.length,
)

const goToNextStep = () => (
  currentStep.value = currentStep.value < stepsNumber.value ? currentStep.value : stepsNumber.value
)

const goOnAndFollow = computed(() => (
  currentStep.value === 1
    ? 'Continuer'
    : currentStep.value === 3 ? 'Valider' : 'Suivant'
))

const arrowOrCircleIcon = () => (
  currentStep.value === 4 ? 'ri-checkbox-circle-line' : 'ri-arrow-right-line'
)

const calculateRoute = (stepsStore) => {
  return stepsStore.selectedAmmo === 'billes'
    ? { name: 'IdentificationFinalResult' }
    : { name: 'IdentificationBlankGun' }
}

// showDiv is used to create a mini steper for alarm guns. Need to be reworked.
const backStepButtonAction = () => {
  if (showDiv.value === false) {
    goToPreviousStep()
    goToNewRouteWithArmeAlarme()
  } else {
    showDiv.value = false
  }
}

const nextStepButtonAction = () => {
  if (showDiv.value === false) {
    showDiv.value = true
  } else {
    goToNextStep(); goToNewRouteWithArmeAlarme()
  }
}

function handlePreviousButtonClick() {
  goToPreviousStep();
  if (ALARM_GUNS_TYPOLOGIES.includes(typology.value)) {
    goToNewRouteWithArmeAlarme();
  }
  else if (resultTree[typology]?.isDummyTypology) {
    goToNewRoute();
  }
}

const showDiv = ref(false)

</script>

<template>
  <div class="mt-5 fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <StepsGuide
        v-if="resultTree[typology]?.isDummyTypology"
        class="!fr-container steps-guide"
        :steps="steps"
        :current-step="currentStep"
      />
      <RouterView :show-div="showDiv" />
    </div>
  </div>
  <div
    v-if="$route.path === '/guide-identification/resultat-final' || !resultTree[typology]?.isDummyTypology"
    class="footer end z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="flex justify-center !w-full"
        label="Retour à l'accueil"
        icon="ri-home-4-line"
        data-testid="return-to-home-end"
        :icon-right="true"
        @click="$router.push({name: 'StartPage'})"
      />
      <DsfrButton
        class="mt-3 flex justify-center !w-full"
        label="Retourner à l'étape précédente"
        icon="ri-arrow-go-back-fill"
        :icon-right="true"
        secondary
        @click="handlePreviousButtonClick"
      />
    </div>
  </div>
  <div
    v-else-if="ALARM_GUNS_TYPOLOGIES.includes(typology) && route.path === '/guide-identification/munition-type'"
    class="footer content z-1"
  >
    <div
      class="fr-col-11 fr-col-lg-6 footer-actions mx-auto"
    >
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center !w-full"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRoute()"
      />
      <DsfrButton
        class="fr-btn--md m-1 flex justify-center !w-full"
        :disabled="disabledValidation"
        data-testid="next-step"
        :icon="arrowOrCircleIcon()"
        :label="goOnAndFollow"
        :icon-right="true"
        @click="$router.push(calculateRoute(stepsStore)); goToNextStep()"
      />
    </div>
  </div>

  <div
    v-else-if="isArmeAlarme"
    class="footer z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center !w-full"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="backStepButtonAction"
      />
      <DsfrButton
        class="m-1 flex justify-center !w-full"
        icon="ri-arrow-right-line"
        :label="goOnAndFollow"
        :icon-right="true"
        data-testid="next-step"
        @click="nextStepButtonAction"
      />
    </div>
  </div>

  <div
    v-else
    class="footer z-1"
  >
    <div
      v-if="confidenceLevel === 'low'"
      class="fr-col-11 fr-col-lg-6 mx-auto"
    >
      <DsfrButton
        class="flex justify-center !w-full"
        label="Identifier une nouvelle arme"
        icon="ri-camera-fill"
        :icon-right="true"
        @click="$router.push({name: 'InstructionsPage'})"
      />
      <DsfrButton
        class="mt-3 flex justify-center !w-full"
        label="Retour à l'accueil"
        icon="ri-home-4-line"
        :icon-right="true"
        secondary
        @click="$router.push({name: 'StartPage'})"
      />
    </div>
    <div
      v-else
      class="fr-col-11 fr-col-lg-6 footer-actions mx-auto"
    >
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center w-50"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRoute()"
      />
      <DsfrButton
        v-if="confidenceLevel !== 'low'"
        :disabled="disabledValidation"
        class="m-1 flex justify-center w-50"
        :icon="arrowOrCircleIcon()"
        :label="goOnAndFollow"
        :icon-right="true"
        data-testid="next-step"
        @click="goToNextStep(); goToNewRoute()"
      />
    </div>
  </div>
</template>

<style scoped>
.steps-guide {
  margin: auto;
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
  color:  080894;
  background-image: none !important;
}

:deep(div.fr-stepper__steps) {
  border-radius: 5px 5px 5px 5px;
}

:deep(.fr-stepper__state::after) {
  content: " :\a";
}

:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
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
  text-align: center;
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.w-50 {
  width: 50%;
}
</style>
