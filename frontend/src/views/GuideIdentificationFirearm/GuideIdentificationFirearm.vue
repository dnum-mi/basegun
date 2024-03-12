<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
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

const imgUrl = computed(() => resultStore.imgUrl)
const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const typology = computed(() => resultStore.typology)
const selectedArmeAlarme = computed(() => stepsStore.selectedArmeAlarme)

const currentStep = computed({
  get () {
    return stepsStore.currentStep + 1
  },
  set (value) {
    stepsStore.setCurrentStep(value as 1 | 2 | 3)
  },
})

const steps = computed(() => (resultTree[resultStore.typology].isDummyTypology || confidenceLevel.value !== 'low')
  ? resultStore.typology === 'pistolet_semi_auto_moderne' && stepsStore.selectedAmmo === 'cartouches'
    ? ['Typologie de l\'arme', 'Compléments', 'Typologie de munitions', 'Sélection arme alarme', 'Résultat final']
    : ['Typologie de l\'arme', 'Compléments', 'Typologie de munitions', 'Résultat final']
  : ['Résultat final'],
)
const disabledValidation = computed(() => currentStep.value === 3 && stepsStore.selectedAmmo === undefined)

const goToNewRoute = () => (
  router.push({ name: `${identificationGuideSteps[currentStep.value - 1]}` }).catch(() => { })
)

const goToNewRouteWithArmeAlarme = () => (
  router.push({ name: `${identificationGuideStepsWithArmeAlarme[currentStep.value - 1]}` }).catch(() => { })
)

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 2
)

const stepsNumber = computed(() => resultStore.typology === 'pistolet_semi_auto_moderne'
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

async function sendLogsIdentificationDummy () {
  const identification = {
    image_url: imgUrl.value,
    confidence: confidence.value,
    label: typology.value,
    confidence_level: confidenceLevel.value,
    tutorial_option: stepsStore.currentOptionStep[stepsStore.currentStep] || null,
    is_dummy: stepsStore.isDummy,
  }

  try {
    await axios.post('/identification-dummy', identification)
  } catch (err) {
    import.meta.env.DEV && console.warn(err)
  // } finally {
  //   router.push({ name: 'IdentificationFinalResult' }).catch(() => {})
  }
}

const calculateRoute = (stepsStore) => {
  return stepsStore.selectedAmmo === 'billes'
    ? { name: 'IdentificationFinalResult' }
    : { name: 'IdentificationBlankGun' }
}

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
      <RouterView />
    </div>
  </div>
  <div
    v-if="$route.path === '/guide-identification/resultat-final' || !resultTree[typology]?.isDummyTypology"
    class="footer end z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'StartPage'}"
      >
        <DsfrButton
          class="flex justify-center !w-full"
          label="Retour à l'accueil"
          icon="ri-home-4-line"
          data-testid="return-to-home-end"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
      <DsfrButton
        v-if="resultTree[typology]?.isDummyTypology"
        class="mt-3 flex justify-center !w-full"
        label="Retourner à l'étape précédente"
        icon="ri-arrow-go-back-fill"
        :icon-right="true"
        secondary
        @click="goToPreviousStep(); goToNewRoute(); sendLogsIdentificationDummy()"
      />
    </div>
  </div>
  <div
    v-else-if="$route.path === '/guide-identification/munition-type' && typology === `pistolet_semi_auto_moderne`"
    class="footer end z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRoute()"
      />
      <router-link
        v-slot="{navigate}"
        :to="calculateRoute(stepsStore)"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          :disabled="disabledValidation"
          label="Suivant"
          data-testid="next-step"
          icon="ri-arrow-right-line"
          :icon-right="true"
          @click="navigate(); goToNextStep()"
        />
      </router-link>
    </div>
  </div>

  <div
    v-else-if="$route.path === '/guide-identification/armes-alarme'"
    class="footer end z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRouteWithArmeAlarme()"
      />
      <DsfrButton
        class="m-1 flex justify-center"
        :icon="arrowOrCircleIcon()"
        :label="goOnAndFollow"
        :icon-right="true"
        data-testid="next-step"
        @click="goToNextStep(); goToNewRouteWithArmeAlarme()"
      />
    </div>
  </div>

  <div
    v-else
    class="footer content z-1"
  >
    <div
      v-if="confidenceLevel === 'low'"
      class="fr-col-11 fr-col-lg-6 mx-auto"
    >
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'InstructionsPage'}"
      >
        <DsfrButton
          class="flex justify-center !w-full"
          label="Identifier une nouvelle arme"
          icon="ri-camera-fill"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          class="mt-3 flex justify-center !w-full"
          label="Retour à l'accueil"
          icon="ri-home-4-line"
          :icon-right="true"
          secondary
          @click="navigate()"
        />
      </router-link>
    </div>
    <div
      v-else
      class="fr-col-11 fr-col-lg-6 footer-actions mx-auto"
    >
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="goToPreviousStep(); goToNewRoute()"
      />
      <DsfrButton
        v-if="confidenceLevel !== 'low'"
        :disabled="disabledValidation"
        class="m-1 flex justify-center"
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
.content button {
  width: 50%;
}
</style>
