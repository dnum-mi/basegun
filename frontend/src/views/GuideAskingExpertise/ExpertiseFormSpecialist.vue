<template>
  <div class="desc m-1 justify-center">
    <p>Demande de contact avec un spécialiste :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <fieldset
        id="radio-hint"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          Souhaitez-vous être mis en contact avec un spécialiste en arme à feu pour cette expertise ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes2"
              v-model="contactSpecialiste"
              type="radio"
              name="radio-hint3"
              value="Oui"
            >
            <label
              class="fr-label"
              for="yes"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no2"
              v-model="contactSpecialiste"
              type="radio"
              name="radio-hint3"
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
        v-model="typeSpecialiste"
        label="Si oui, précisez le type de spécialiste"
        label-visible
      />

      <fieldset
        id="radio-hint2"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          La demande est-elle urgente ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes3"
              v-model="demandeUrgente"
              type="radio"
              name="radio-hint4"
              value="Oui"
            >
            <label
              class="fr-label"
              for="yes3"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no3"
              v-model="demandeUrgente"
              type="radio"
              name="radio-hint4"
              value="Non"
            >
            <label
              class="fr-label"
              for="no3"
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
        v-model="raisonUrgence"
        label="Si oui, veuillez expliquer la raison de l'urgence"
        :disabled="disabledValidation"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Validez"
      @click="sendData"
    />
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <router-link
        v-slot="{goBack}"
        class="goBack"
        :to="{name: 'ExpertiseFormDetails'}"
      >
        <DsfrButton
          class="m-1 flex justify-center !w-37.5"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goBack()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'StartPage'}"
      >
        <DsfrButton
          class="m-1 flex justify-center !w-full"
          icon="ri-arrow-right-line"
          data-testid="button-next"
          label="Retour à l'accueil"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>

<script lang=ts setup>
import { ref, defineEmits } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const stepsStore = useStepsStore()
const router = useRouter()
const route = useRoute()

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

const contactSpecialiste = ref('')
const typeSpecialiste = ref('')
const demandeUrgente = ref('')
const raisonUrgence = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    contactSpecialiste: contactSpecialiste.value,
    typeSpecialiste: typeSpecialiste.value,
    demandeUrgente: demandeUrgente.value,
    raisonUrgence: raisonUrgence.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style scoped>

</style>
