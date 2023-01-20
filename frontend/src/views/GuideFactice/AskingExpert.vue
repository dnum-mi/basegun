<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

import { useSnackbarStore } from '@/stores/snackbar.js'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { useStepsStore } from '@/stores/steps.js'

const stepsStore = useStepsStore()
const { setMessage } = useSnackbarStore()
const typology = computed(() => stepsStore.typology)
const router = useRouter()

const confidence = useLocalStorage('confidence')
const confidenceLevel = useLocalStorage('confidenceLevel')
const issue = useLocalStorage('issue')
const imgUrl = useLocalStorage('imgUrl')

const showModal = ref(false)
const issueText = ref('')

function onClose () {
  showModal.value = false
}

async function sendIssue () {
  const json = {
    image_url: imgUrl.value,
    issue: issueText.value,
    confidence: confidence.value,
    label: typology.value,
    confidence_level: confidenceLevel.value,
  }
  await axios.post('/issue', json)
    .then(async res => {
      console.log(res)
      issue.value = json.issue
      setMessage({ type: 'success', message: 'Votre message a été pris en compte' })
    })
    .catch(async (err) => {
      console.log(err)
      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant de votre message.' })
    })
    .finally(setTimeout(() => {
      stepsStore.setCurrentStep(undefined)
      router.push({ name: 'Result' }).catch(() => { })
    }, 3000))
}
</script>
<template>
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
          Il ne vous est pas possible de réaliser une instruction donnée dans le tutoriel ?
          Arrêtez-vous dans la manipulation et contactez un expert pour finir l’identification.
        </p>
        <DsfrInput
          v-model="issueText"
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
          @click="sendIssue()"
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
