<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

import { useSnackbarStore } from '@/stores/snackbar.js'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { useStepsStore } from '@/stores/steps.js'

const stepsStore = useStepsStore()
const { setMessage } = useSnackbarStore()
const typology = computed(() => stepsStore.typology)

const router = useRouter()
const route = useRoute()

const confidence = useLocalStorage('confidence')
const confidenceLevel = useLocalStorage('confidenceLevel')
const tutorialFeedback = useLocalStorage('tutorialFeedback', '')
const imgUrl = useLocalStorage('imgUrl')

const showModal = ref(false)

function onClose () {
  tutorialFeedback.value = ''
  showModal.value = false
}

async function sendTutorialFeedback () {
  const json = {
    image_url: imgUrl.value,
    tutorial_feedback: tutorialFeedback.value,
    label: typology.value,
    current_step: stepsStore.currentStep,
    route_name: route.name,
    confidence: confidence.value,
    confidence_level: confidenceLevel.value,
  }
  await axios.post('/tutorial-feedback', json)
    .then(async res => {
      console.log(res)
      tutorialFeedback.value = json.tutorial_feedback
      console.log(json)
      setMessage({ type: 'success', message: 'Votre message a été pris en compte' })
    })
    .catch(async (err) => {
      console.log(err)
      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant de votre message.' })
    })
    .finally(setTimeout(() => {
      stepsStore.setCurrentStep(undefined)
      tutorialFeedback.value = ''
      console.log(json)
      router.push({ name: 'Result' }).catch(() => { })
    }, 3000))
}
</script>
<template>
  <div class="text-center">
    <a
      class="help"
      href="#"
      @click="showModal = true"
    >
      Je n'arrive pas à réaliser cette étape
      <VIcon
        name="ri-information-line"
      />
    </a>
  </div>
  <Teleport to="body">
    <DsfrModal
      title=""
      class="help-modal"
      :opened="showModal"
      @close="onClose()"
    >
      <div>
        <h2>
          <VIcon
            name="ri-arrow-right-line"
            scale="1.5"
          />
          Je n'arrive pas à compléter une étape
        </h2>
        <p>
          Si vous rencontrez une difficulté pour poursuivre ce tutoriel, nous vous conseillons de faire appel à un expert. <br>
          En attendant, vous pouvez nous permettre d'améliorer le contenu de ce tutoriel en nous décrivant votre problème ci-dessous.
        </p>
        <DsfrInput
          v-model="tutorialFeedback"
          label="Décrivez votre problème"
          label-visible
          is-textarea
        />
      </div>

      <div>
        <SnackbarAlert class="text-center p-5" />
      </div>

      <div class="blank" />

      <div class="footer-background">
        <DsfrButton
          label="Valider et retour au résultat"
          :disabled="!tutorialFeedback"
          @click="sendTutorialFeedback()"
        />
      </div>
    </DsfrModal>
  </Teleport>
</template>
<style scoped>

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blank {
  height: 50px;
}

.footer-background {
  text-align: center;
  padding: 1rem;
}

.footer-background button {
  width: 100%;
}

:deep(.fr-btn) span {
  margin: auto !important;
}
</style>
