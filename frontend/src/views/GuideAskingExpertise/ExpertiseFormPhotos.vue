<template>
  <div class="desc m-1 justify-center">
    <p>Photographies complémentaires :</p>
  </div>

  <div class="m-1 justify-center">
    <div class="mb-8">
      <DsfrFileUpload
        v-model="vueLargeGauche"
        label="Vue large face gauche"
      />
    </div>

    <div class="mb-8">
      <DsfrFileUpload
        v-model="vueLargeDroite"
        label="Vue large face droite"
      />
    </div>

    <div class="mb-8">
      <DsfrFileUpload
        v-model="vueRapprochee"
        label="Vue rapprochée des marquages"
      />
    </div>

    <div class="mb-8">
      <DsfrFileUpload
        v-model="chargeur"
        label="Chargeur"
      />
    </div>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Validez"
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

const vueLargeGauche = ref('')
const vueLargeDroite = ref('')
const vueRapprochee = ref('')
const chargeur = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    vueLargeGauche: vueLargeGauche.value,
    vueLargeDroite: vueLargeDroite.value,
    vueRapprochee: vueRapprochee.value,
    chargeur: chargeur.value,
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
