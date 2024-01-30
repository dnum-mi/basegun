<template>
  <div>
    <div class="desc m-1 justify-center">
      <p>Identification du demandeur :</p>
    </div>

    <div class="m-1 justify-center">
      <form @submit.prevent="submitForm">
        <DsfrInputGroup>
          <DsfrInput
            v-model="nigendMatricule"
            class="mb-5"
            label="NIGEND / Matricule (PN)"
            label-visible
          />
          <DsfrInput
            v-model="serviceAffectation"
            class="mb-5"
            label="Service d'affectation"
            label-visible
            hint="(optionnel)"
          />
          <DsfrInput
            v-model="numeroTelephone"
            class="mb-5"

            label="Numéro de téléphone"
            hint="Format attendu : (+33) 1 22 33 44 55"
            label-visible
          />
          <DsfrInput
            id="adresse"
            v-model="adresseElectronique"
            class="mb-5"
            label="Adresse électronique"
            hint="Format attendu : nom@domaine.fr"
            label-visible
          />
        </DsfrInputGroup>

        <DsfrButton
          type="submit"
          class="m-1 flex justify-center w-80"
          label="Enregistrer mes informations"
          @click="sendData"
        />
      </form>
    </div>
  </div>
</template>

<script lang=ts setup>
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { ref, defineEmits, defineProps } from 'vue'
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

const nigendMatricule = ref('')
const serviceAffectation = ref('')
const numeroTelephone = ref('')
const adresseElectronique = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    nigendMatricule: nigendMatricule.value,
    serviceAffectation: serviceAffectation.value,
    numeroTelephone: numeroTelephone.value,
    adresseElectronique: adresseElectronique.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}

const submitForm = () => {
  console.log('Formulaire soumis avec succès')
}
</script>

<style scoped>
.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
  font-weight: bold;
}

:deep(.required) {
  color:red;
}
</style>
