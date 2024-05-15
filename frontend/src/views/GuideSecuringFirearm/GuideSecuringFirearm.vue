<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { securingGuideSteps } from '@/utils/firearms-utils/index'
import StepsGuide from '@/components/StepsGuide.vue'

const steps = ['Mise en garde', 'Consignes de sécurité', 'Photo']
const currentStep = ref(0)

const router = useRouter()

const getNextRoute = () => {
  if (currentStep.value < 0) {
    router.push({ name: 'StartPage' })
  } else if (currentStep.value >= steps.length) {
    router.push({ name: 'InstructionsPage' })
  } else {
    router.push({ name: securingGuideSteps[currentStep.value] })
  }
}

</script>

<template>
  <div class="mt-5 fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <div>
        <StepsGuide
          class="my-auto"
          :steps="steps"
          :current-step="currentStep + 1"
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
          class="m-1 flex justify-center w-100"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="currentStep--; getNextRoute()"
        />
        <DsfrButton
          class="m-1 flex justify-center w-100"
          icon="ri-arrow-right-line"
          data-testid="button-next"
          label="Suivant"
          :icon-right="true"
          @click="currentStep++; getNextRoute()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.result {
  margin: 0 auto;
  max-width: 1000px;
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

.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
</style>
