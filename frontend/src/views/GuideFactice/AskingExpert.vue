<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

import { useSnackbarStore } from '@/stores/snackbar.js'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

const { setMessage } = useSnackbarStore()
const stepsStore = useStepsStore()
const resultStore = useResultStore()
const router = useRouter()
const route = useRoute()

const typology = computed(() => resultStore.typology)
const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const imgUrl = computed(() => resultStore.imgUrl)

const showModal = ref(false)

function onClose () {
  stepsStore.tutorialFeedback = ''
  showModal.value = false
}

async function sendTutorialFeedback () {
  const json = {
    image_url: imgUrl.value,
    tutorial_feedback: stepsStore.tutorialFeedback,
    label: typology.value,
    tutorial_option: stepsStore.selectedOption || null,
    route_name: route.name,
    confidence: confidence.value,
    confidence_level: confidenceLevel.value,
  }
  await axios.post('/tutorial-feedback', json)
    .then(async res => {
      console.log(res)
      stepsStore.tutorialFeedback = json.tutorial_feedback
      setMessage({ type: 'success', message: 'Votre message a été pris en compte' })
    })
    .catch(async (err) => {
      console.log(err)
      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant de votre message.' })
    })
    .finally(setTimeout(() => {
      stepsStore.setCurrentStep(undefined)
      stepsStore.tutorialFeedback = ''
      router.push({ name: 'Result' }).catch(() => {})
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
      :opened="showModal"
      @close="onClose()"
    >
      <div class="modal">
        <div class="modal-content">
          <h2>
            <VIcon
              name="ri-arrow-right-line"
              scale="1.5"
            />
            Je n'arrive pas à compléter une étape
          </h2>
          <p>
            Si vous rencontrez une difficulté pour poursuivre ce tutoriel, nous vous conseillons de faire appel à un expert. <br>
            <br>En attendant, vous pouvez nous permettre d'améliorer le contenu de ce tutoriel en nous décrivant votre problème ci-dessous.
          </p>
          <DsfrInput
            v-model="stepsStore.tutorialFeedback"
            label="Décrivez votre problème"
            label-visible
            is-textarea
          />
        </div>
        <div>
          <SnackbarAlert class="text-center pt-3" />
        </div>
        <div class="small-blank" />
        <div class="modal-footer">
          <DsfrButton
            label="Valider et retour au résultat"
            :disabled="!stepsStore.tutorialFeedback"
            @click="sendTutorialFeedback()"
          />
        </div>
      </div>
    </DsfrModal>
  </Teleport>
</template>
<style scoped>

/* :deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
} */

:deep(.fr-btn) span {
  margin: auto !important;
}

.modal {
  display: flex;
  flex-direction: column;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: #f5f5fe;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
  padding: 1rem !important;
  width: 100%;
}
.modal-footer button {
  width: 100%;
}
</style>
