<template>
  <div class="desc m-1 justify-center">
    <p>Mise en sécurité de l'arme sans catégorie connue :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <fieldset
        id="radio-hint3"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
          required="true"
        >
          L'arme est-elle actuellement mise en sécurité ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes"
              v-model="miseEnSecurite"
              type="radio"
              name="radio-hint"
              value="Oui"
            >
            <label
              class="fr-label"
              for="perquisition"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no"
              v-model="miseEnSecurite"
              type="radio"
              name="radio-hint"
              value="Non"
            >
            <label
              class="fr-label"
              for="no"
            >
              Non
            </label>
          </div>
        </div>
        <div
          id="radio-hint-messages"
          class="fr-messages-group"
          aria-live="assertive"
        />
      </fieldset>

      <DsfrInput
        v-model="descriptionArmeNonSecurisee"
        label="Si non, veuillez décrire l'arme"
        label-visible
      />

      <div class="desc m-1 justify-center">
        <p>Raison de l'expertise :</p>
      </div>

      <fieldset
        id="radio-hint2"
        class="fr-fieldset"
        aria-labelledby="radio-hint2-legend"
      >
        <legend
          id="radio-hint2-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
          required="true"
        >
          Pourquoi est-il nécessaire de procéder à une expertise sur cette arme ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="identificateWeapon"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Identification de l'arme"
            >
            <label
              class="fr-label"
              for="identificateWeapon"
            >
              Identification de l'arme
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="checkLegality"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Vérification de la légalité"
            >
            <label
              class="fr-label"
              for="checkLegality"
            >
              Vérification de la légalité
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="balisticAnalyse"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Analyse balistique"
            >
            <label
              class="fr-label"
              for="balisticAnalyse"
            >
              Analyse balistique
            </label>
          </div>
        </div>
      </fieldset>
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Enregistrer mes informations"
      @click="sendData"
    />
  </div>

  <div class="footer">
    <div
      class="fr-col-11 fr-col-lg-6 footer-actions"
    >
      <router-link
        v-slot="{goBack}"
        class="goBack"
        :to="{name: 'ExpertiseFormFirearm'}"
      >
        <DsfrButton
          class="m-1 flex justify-center !w-37.5"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goBack()"
        />
      </router-link>
      <DsfrButton
        class="m-1 flex justify-center"
        icon="ri-arrow-right-line"
        label="Suivant"
        :icon-right="true"
        @click="goToNextStep(); goToNewRoute();"
      />
    </div>
  </div>
</template>

<script lang=ts setup>
import { ref, defineEmits } from 'vue'

import { useRouter } from 'vue-router'

const stepsStore = useStepsStore()
const router = useRouter()

const currentStep = computed<1 | 2 | 3>({
  get () {
    return stepsStore.currentStep + 1 as 1 | 2 | 3
  },
  set (value: 1 | 2 | 3) {
    stepsStore.setCurrentStep(value)
  },
})

const goToPreviousStep = () => {
  currentStep.value = currentStep.value - 2 as 1 | 2 | 3
}

const goToNextStep = () => {
  currentStep.value = currentStep.value + 0 as 1 | 2 | 3
}

const goToNewRoute = () => {
  router.push({ name: `${expertiseGuideSteps[currentStep.value - 1]}` }).catch(() => { })
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

const miseEnSecurite = ref('')
const descriptionArmeNonSecurisee = ref('')
const raisonExpertise = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    miseEnSecurite: miseEnSecurite.value,
    descriptionArmeNonSecurisee: descriptionArmeNonSecurisee.value,
    raisonExpertise: raisonExpertise.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>

</style>
