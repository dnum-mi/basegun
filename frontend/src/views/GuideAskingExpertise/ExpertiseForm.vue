<template>
  <div>
    <h2 class="m-2.5 flex justify-center">
      Questionnaire demande
    </h2>
    <h2 class="flex justify-center">
      <span style="color: blue"> d'expertise</span>
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
        <RouterView @updateFormData="handleFormDataUpdate" />
      </div>
    </div>

    <div class="footer">
      <div class="fr-col-11 fr-col-lg-6 footer-actions">
        <div
          v-if="route.name === 'ExpertiseFormSpecialist'"
          class="fr-col-11 fr-col-lg-6 footer-actions"
        >
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-left-line"
            :secondary="true"
            label="Précédent"
            @click="goToPreviousStep(); router.back()"
          />
          <router-link
            v-slot="{navigate}"
            class="navigate"
            :to="{name: 'StartPage'}"
          >
            <DsfrButton
              class="m-1 flex justify-center"
              icon="ri-arrow-right-line"
              data-testid="button-next"
              label="Retour à l'accueil"
              :icon-right="true"
              @click="navigate()"
            />
          </router-link>
        </div>
        <div
          v-else
          class="fr-col-11 fr-col-lg-6 footer-actions"
        >
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-left-line"
            :secondary="true"
            label="Précédent"
            @click="goToPreviousStep(); router.back()"
          />
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-right-line"
            data-testid="button-next"
            label="Suivant"
            :icon-right="true"
            @click="goToNextStep(); goToNewRoute();"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { RouterView, useRoute, useRouter as useRouterVue } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouterVue()
    const currentStep = computed<1 | 2 | 3>({
      get () {
        return stepsStore.currentStep + 1 as 1 | 2 | 3
      },
      set (value: 1 | 2 | 3) {
        stepsStore.setCurrentStep(value)
      },
    })

    const route = useRoute()

    const formDataCollection = ref([])

    const steps = [
      'Informations',
      'Saisie de l\'arme',
      'Détails de l\'arme',
      'Contact avec un spécialiste',
    ]

    const stepsStore = useStepsStore()

    const goToPreviousStep = () => {
      currentStep.value = currentStep.value - 2 as 1 | 2 | 3
    }

    const goToNextStep = () => {
      currentStep.value = currentStep.value + 0 as 1 | 2 | 3
    }

    const ExpertiseFormInformationsRoute = 'ExpertiseFormInformations'
    const ExpertiseFormFirearmRoute = 'ExpertiseFormFirearm'
    const ExpertiseFormDetailsRoute = 'ExpertiseFormDetails'
    const ExpertiseFormSpecialistRoute = 'ExpertiseFormSpecialist'

    const expertiseGuideSteps = [
      ExpertiseFormInformationsRoute,
      ExpertiseFormFirearmRoute,
      ExpertiseFormDetailsRoute,
      ExpertiseFormSpecialistRoute,
    ]

    const goToNewRoute = () => {
      router.push({ name: `${expertiseGuideSteps[currentStep.value - 1]}` }).catch(() => {})
    }

    const handleFormDataUpdate = (formData) => {
      console.log('Données mises à jour:', formData)

      formDataCollection.value.push(formData)

      console.log('Toutes les données:', formDataCollection.value)
    }

    return {
      currentStep,
      steps,
      goToPreviousStep,
      goToNextStep,
      handleFormDataUpdate,
      goToNewRoute,
      route,
    }
  },
})
</script>

<style>
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
