<template>
  <div>
    <div class="desc m-1 justify-center">
      <p>Informations générales :</p>
    </div>

    <div class="m-1 justify-center">
      <form @submit.prevent="submitForm">
        <DsfrInputGroup>
          <DsfrInput
            v-model="nom"
            label="Nom"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="prenom"
            label="Prénom"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="RIOMatricule"
            label="RIO / Matricule"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="serviceAffectation"
            label="Service d'affectation"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="numeroTelephone"
            label="Numéro de téléphone"
            hint="Format attendu : (+33) 1 22 33 44 55"
            label-visible
            required="true"
          />
          <DsfrInput
            id="adresse"
            v-model="adresseElectronique"
            label="Adresse électronique"
            hint="Format attendu : nom@domaine.fr"
            label-visible
            required="true"
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
  <div class="footer">
    <div
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
        label="Suivant"
        :icon-right="true"
        @click="goToNextStep(); goToNewRoute();"
      />
    </div>
  </div>
</template>

<script lang=ts setup>
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
const ExpertiseFormDetailsRoute = 'ExpertiseFormDetails'
const ExpertiseFormSpecialistRoute = 'ExpertiseFormSpecialist'

const expertiseGuideSteps = [
  ExpertiseFormInformationsRoute,
  ExpertiseFormFirearmRoute,
  ExpertiseFormDetailsRoute,
  ExpertiseFormSpecialistRoute,
]

const nom = ref('')
const prenom = ref('')
const RIOMatricule = ref('')
const serviceAffectation = ref('')
const numeroTelephone = ref('')
const adresseElectronique = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    nom: nom.value,
    prenom: prenom.value,
    RIOMatricule: RIOMatricule.value,
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
</style>
