<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { securingRoutePaths, securingGuideSteps } from '@/utils/firearms-utils/index.js'
import StepsGuide from '@/components/StepsGuide.vue'
import { useStepsStore } from '@/stores/steps.js'

const currentStep = computed({
  get () {
    return stepsStore.currentStep + 1
  },
  set (value) {
    stepsStore.setCurrentStep(value)
  },
})
const steps = ['Mise en garde', 'Consignes de sécurité', 'Photo']

const stepsStore = useStepsStore()
const router = useRouter()

const goToNewRoute = () => (
  router.push({ name: `${securingGuideSteps[currentStep.value - 1]}` }).catch(() => { })
)

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 2
)

const goToNextStep = () => (
  currentStep.value = currentStep.value < securingRoutePaths.length ? currentStep.value : securingRoutePaths.length
)
</script>

<template>
  <div class="mt-5 fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <div>
        <StepsGuide
          class="steps-guide"
          :steps="steps"
          :current-step="currentStep"
        />
        <h2 class="m-2.5">
          Mettre en sécurité mon arme
        </h2>
        <RouterView />
      </div>
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
          @click="goToPreviousStep(); router.back()"
        />
        <DsfrButton
          v-if="currentStep < steps.length"
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          data-testid="button-next"
          label="Suivant"
          :icon-right="true"
          @click="goToNextStep(); goToNewRoute()"
        />
        <DsfrButton
          v-if="currentStep === steps.length"
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          data-testid="button-next"
          label="Suivant"
          :icon-right="true"
          @click="router.push({ name:'InstructionsPage'})"
        />
      </div>
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
color: #080894;
background-image: none !important;
}

h4 {
  color: unset;
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
background-color: #fff;
box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
width: 50%;
}
  </style>
