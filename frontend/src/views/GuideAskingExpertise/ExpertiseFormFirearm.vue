<template>
  <div class="desc m-1 justify-center">
    <p>Informations sur l'arme :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <DsfrInput
        v-model="dateSaisie"
        class="mb-5"
        label="Date de la saisie"
        type="date"
        label-visible
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
          class="fr-select mb-5"
          name="select"
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
        v-model="longueurArme"
        class="mb-5"
        label="Saisir la longueur de l'arme (en cm)"
        hint="(optionnel)"
        label-visible
      />

      <DsfrInput
        v-model="longueurCanon"
        class="mb-5"
        label="Saisir la longueur du canon (en cm)"
        hint="(optionnel)"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Enregistrer mes informations"
      @click="sendData"
    />
  </div>
</template>

<script setup>
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
const ExpertiseFormPhotosRoute = 'ExpertiseFormPhotos'

const expertiseGuideSteps = [
  ExpertiseFormInformationsRoute,
  ExpertiseFormFirearmRoute,
  ExpertiseFormPhotosRoute,
]

const emits = defineEmits('updateFormData')

const dateSaisie = ref('')
const typologieArme = ref('')
const longueurArme = ref('')
const longueurCanon = ref('')

const sendData = () => {
  const formData = {
    dateSaisie: dateSaisie.value,
    typologieArme: typologieArme.value,
    longueurArme: longueurArme.value,
    longueurCanon: longueurCanon.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>
.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
  font-weight: bold;
}
</style>
