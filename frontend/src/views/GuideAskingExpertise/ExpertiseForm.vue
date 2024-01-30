<template>
  <div>
    <h2 class="m-2.5 flex justify-center questionnaire-title">
      <div>Questionnaire demande</div> <div><span style="color: blue"> d'avis</span></div>
    </h2>

    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <div class="mb-5">
        <StepsGuide
          class="!fr-container steps-guide"
          :steps="steps"
          :current-step="currentStep"
        />
      </div>

      <div class="m-1 justify-center pb-30">
        <RouterView
          @update-form-data="handleFormDataUpdate"
          @validate="sendFormData()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { sendExpertiseForm } from '@/api/api-client'

const formData = new FormData()
const steps = ['Identification du demandeur', 'Informations sur l\'arme', 'Photos complémentaires']
const stepsStore = useStepsStore()

const currentStep = computed<1 | 2 | 3>({
  get () {
    return stepsStore.currentStep + 1 as 1 | 2 | 3
  },
  set (value: 1 | 2 | 3) {
    stepsStore.setCurrentStep(value)
  },
})

const handleFormDataUpdate = (form: Record<string, number | string | File>) => {
  console.log('Données mises à jour:', form)
  Object.entries(form).map(([key, value]) =>
    formData.append(key, value),
  )
  console.log('Toutes les données:', formData)
}

const sendFormData = () => {
  sendExpertiseForm(formData)
}
</script>

<style scoped>
.questionnaire-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}

.footer button {
  width: 50%;
}

.steps-guide {
  margin: auto;
}

:deep(div.fr-stepper__steps) {
  border-radius: 5px 5px 5px 5px;
}

:deep(.fr-stepper__state::after) {
  content: " :\a";
}

:deep(.fr-label) {
  margin-bottom: 12px;
}

.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
  font-weight: bold;
}
</style>
