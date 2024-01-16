<template>
  <div class="desc m-1 justify-center">
    <p>Détails sur la saisie de l'arme :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <DsfrInput
        v-model="dateSaisie"
        label="Date de la saisie"
        type="date"
        label-visible
        required="true"
      />
      <DsfrInput
        v-model="lieuSaisie"
        label="Lieu de la saisie"
        label-visible
        required="true"
      />
      <div class="fr-select-group">
        <label
          class="fr-label"
          for="select"
        >
          Typologie de l'arme
        </label>
        <select
          id="select"
          v-model="typologieArme"
          class="fr-select"
          name="select"
          required="true"
        >
          <option
            value=""
            selected
            disabled
            hidden
          >
            Sélectionner une option
          </option>
          <option value="Arme de poing">
            Arme de poing
          </option>
          <option value="Arme d'épaule">
            Arme d'épaule
          </option>
        </select>
      </div>
      <DsfrInput
        v-model="descriptionArme"
        label="Description de l'arme"
        label-visible
        required="true"
      />

      <DsfrInput
        v-model="longueurArme"
        label="Saisir la longueur de l'arme"
        hint="(optionnel)"
        label-visible
      />

      <DsfrInput
        v-model="longueurCanon"
        label="Saisir la longueur du canon"
        hint="(optionnel)"
        label-visible
      />

      <fieldset
        id="radio-hint"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
          required="true"
        >
          Circonstance de la saisie :
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="perquisition"
              v-model="circonstanceSaisie"
              type="radio"
              name="radio-hint"
              value="Perquisition"
            >
            <label
              class="fr-label"
              for="perquisition"
            >
              Perquisition
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="trouve"
              v-model="circonstanceSaisie"
              type="radio"
              name="radio-hint"
              value="Trouvé"
            >
            <label
              class="fr-label"
              for="trouve"
            >
              Trouvé
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
        v-model="autresDetails"
        label="Autres"
        hint="(à préciser)"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Enregistrer mes informations"
      @click="sendData"
    />
  </div>

  <div class="footer">
    <div
      class="fr-col-11 fr-col-lg-6 footer-actions mx-auto"
    >
      <router-link
        v-slot="{goBack}"
        class="goBack"
        :to="{name: 'ExpertiseFormInformations'}"
      >
        <DsfrButton
          class="m-1 flex justify-center !w-37.5"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep(); goBack();"
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

const emits = defineEmits('updateFormData')

const dateSaisie = ref('')
const lieuSaisie = ref('')
const typologieArme = ref('')
const descriptionArme = ref('')
const circonstanceSaisie = ref('')
const autresDetails = ref('')

const sendData = () => {
  const formData = {
    dateSaisie: dateSaisie.value,
    lieuSaisie: lieuSaisie.value,
    typologieArme: typologieArme.value,
    descriptionArme: descriptionArme.value,
    circonstanceSaisie: circonstanceSaisie.value,
    autresDetails: autresDetails.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>
</style>
