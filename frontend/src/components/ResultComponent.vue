<script setup>
import { store } from '@/store.js'
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { results, guideSteps } from '@/utils/firearms-utils'
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useSnackbarStore } from '@/stores/snackbar.js'
import { useStepsStore } from '@/stores/steps.js'

const { setMessage } = useSnackbarStore()
const router = useRouter()
const stepsStore = useStepsStore()

onBeforeMount(() => {
  store.displayHeader = false
})

const confidence = useLocalStorage('confidence')
const confidenceLevel = useLocalStorage('confidenceLevel')
const img = useLocalStorage('img')
const imgUrl = useLocalStorage('imgUrl')

const typology = computed(() => stepsStore.typology)
const selectedAmmo = computed(() => stepsStore.selectedAmmo)
const isFactice = computed(() => stepsStore.isFactice)

const isUp = ref(undefined)
const isDown = ref(undefined)
const isFeedbackDone = ref(undefined)
const mentionIfIsFactice = ref("Libre d'acquisition et de détention")

const cleanLabel = computed(() => results[typology.value].displayLabel)
const cleanCategory = computed(() => results[typology.value].category)
const cleanMention = computed(() => results[typology.value].isFacticeTypology === true && selectedAmmo.value === 'billes'
  ? mentionIfIsFactice.value
  : results[typology.value].mention)
const cleanTypology = computed(() => results[typology.value].isFacticeTypology === true)

function goToSafetyRecommendation () {
  router.push({ name: 'SafetyRecommendation' }).catch(() => {})
}

function resetSearch () {
  localStorage.clear()
  window.location.replace('/instructions')
  // router.push({ name: 'Instructions' }).catch(() => {})
}

function goToLastStep () {
  router.push({ name: 'SelectAmmo' }).catch(() => { })
  stepsStore.setCurrentStep(guideSteps.value.length)
}

function sendFeedback (isCorrect) {
  const json = {
    image_url: imgUrl.value,
    feedback: isCorrect,
    confidence: confidence.value,
    label: typology.value,
    confidence_level: confidenceLevel.value,
  }
  isFeedbackDone.value = true
  if (isCorrect) {
    isUp.value = true
  } else {
    isDown.value = true
  }
  axios.post('/feedback', json)
    .then(async res => {
      console.log(res)
      setMessage({ type: 'success', message: 'Votre vote a été pris en compte' })
      console.log(setMessage.value)
    })
    .catch(async (err) => {
      console.log(err)
      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant votre vote.' })
    })
}
</script>
<template>
  <div>
    <div class="result col-11 col-lg-6">
      <div
        class="result-image"
        :style="{backgroundImage:`url(${img})`}"
      />
      <div
        v-if="selectedAmmo === 'billes'"
        class="fr-callout custom-callout"
      >
        <div v-if="confidenceLevel === 'high'">
          <div class="callout-head">
            <p class="fr-tag fr-tag--sm success-tag">
              Indice de fiabilité : {{ Math.floor(confidence) }}%
            </p>
          </div>
        </div>
        <div v-else>
          <p class="fr-tag fr-tag--sm warning-tag">
            Indice de fiabilité : {{ Math.floor(confidence) }}%
          </p>
          <p class="warning-text">
            Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
          </p>
        </div>
        <p class="fr-callout__title">
          Non Classé
        </p>
        <p class="fr-callout__text">
          Objet, arme factice
        </p>
        <p class="mt-2 fr-callout__text">
          <span class="bold-highlight">Typologie de référence : </span><br>{{ cleanLabel }}
        </p>
        <div
          class="callout-mention mt-4"
        >
          <p v-html="cleanMention" />
        </div>
      </div>
      <div
        v-else
        class="fr-callout custom-callout"
      >
        <div v-if="confidenceLevel === 'low'">
          <div class="callout-head">
            <p class="fr-tag fr-tag--sm error-tag">
              Indice de fiabilité insuffisant
            </p>
          </div>
          <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
        </div>
        <div v-else>
          <div v-if="confidenceLevel === 'high'">
            <div class="callout-head">
              <p class="fr-tag fr-tag--sm success-tag">
                Indice de fiabilité : {{ Math.floor(confidence) }}%
              </p>
            </div>
          </div>
          <div v-else>
            <p class="fr-tag fr-tag--sm warning-tag">
              Indice de fiabilité : {{ Math.floor(confidence) }}%
            </p>
            <p class="warning-text">
              Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
            </p>
          </div>

          <p class="fr-callout__title">
            Catégorie {{ cleanCategory }}
          </p>
          <div
            class="callout-mention"
          >
            <p v-html="cleanMention" />
          </div>
          <div
            v-if="cleanTypology === true && !stepsStore.selectedAmmo"
            class="mt-2"
          >
            <p>Sauf si l'arme est factice:</p>
            <p class="fr-callout__title">
              Non Classé
            </p>
            <DsfrButton
              class="my-4 flex justify-content-center"
              label="Vérifier si l'arme est factice"
              @click="goToSafetyRecommendation()"
            />
          </div>
          <div v-else>
            <div
              v-if="cleanTypology === false && !isFactice"
              class="mt-2"
            >
              <p>Sauf si l'arme est factice:</p>
              <p class="fr-callout__title">
                Non Classé
              </p>
              <DsfrButton
                class="my-4 flex justify-content-center"
                label="Pas de guide de vérification"
                disabled
              />
            </div>
          </div>
          <p
            class="mt-2 fr-callout__text"
          >
            Typologie : {{ cleanLabel }}
          </p>
        </div>
      </div>
      <div v-if="confidenceLevel !== 'low'">
        <p class="fr-text--sm warning-msg">
          Le résultat donné par Basegun n'emporte qu'une simple valeur de renseignement. Pour faire référence dans une procédure, il doit impérativement et réglementairement être validé par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.
        </p>
        <div
          :aria-disabled="isFeedbackDone"
          class="feedback"
        >
          <p class="feedback-text">
            Ce résultat vous semble-t-il correct ?
          </p>
          <div class="feedback-thumb">
            <label
              class="feedback-click"
              @click="sendFeedback(true)"
            >
              <VIcon
                v-if="isUp"
                name="ri-thumb-up-fill"
                class="feedback-click"
              />
              <VIcon
                v-else
                name="ri-thumb-up-line"
                class="feedback-click"
              />
            </label>
            <label
              class="feedback-click"
              @click="sendFeedback(false)"
            >
              <VIcon
                v-if="isDown"
                name="ri-thumb-down-fill"
                class="feedback-click"
              />
              <VIcon
                v-else
                name="ri-thumb-down-line"
                class="feedback-click"
              />
            </label>
          </div>
        </div>
      </div>
      <div
        v-if="isFeedbackDone"
        class="snackbar text-center"
      >
        <SnackbarAlert class="text-center" />
      </div>
      <div
        v-else
        class="blank"
      />
    </div>
    <div class="footer-background">
      <div
        v-show="img"
        class="mx-auto text-center"
        :class="{ 'footer-actions': selectedAmmo === undefined }"
      >
        <DsfrButton
          class="mx-4 my-1 flex justify-content-center"
          label="Reprendre une photo"
          icon="ri-camera-line"
          :icon-right="true"
          @click="resetSearch()"
        />
        <div v-if="selectedAmmo !== undefined && isFactice !== ''">
          <DsfrButton
            class="mx-4 my-1 flex justify-content-center"
            label="Retourner à l'étape précédente"
            icon="ri-arrow-go-back-fill"
            :icon-right="true"
            secondary
            @click="goToLastStep()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result {
  margin: 0 auto;
  max-width: 1000px;
}

.result-image {
  height: 30vh;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
}

.success-tag {
  color: #297254;
  background-color: #9ef9be;
  margin-left: -4px;
}

.error-tag {
  color: #ce0500;
  background-color: #ffe9e9;
  margin-left: -4px;
}
.warning-tag {
  color: #b34000;
  background-color: #ffe8e5;
  margin-left: -4px;
}

.warning-text {
  font-size: 0.7rem;
  font-style: italic;
  line-height: 1rem;
  margin-bottom: 12px;
}

.warning-msg {
  line-height: 1.3rem !important;
  margin-bottom: 1rem;
}

.callout-head {
  display: flex;
  align-items: center;
}

.callout-mention {
  margin-top: 10px;
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.3rem;
}
.feedback {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-text {
  margin-bottom: 0;
  margin-right: 4px;
  font-weight: bold;
}

.feedback-click {
  color: #000091;
  font-size: 35px;
  margin: 0.1em 0.05em;
  text-shadow: 0 0 0 #00c8c8;
}

.feedback-click:hover {
  cursor: pointer;
  text-shadow: 0 0 0 #1212ff;
}

[aria-disabled="true"] .feedback-click {
  pointer-events: none;
  cursor: not-allowed;
  text-shadow: 0 0 0 grey;
}

.footer-actions {
  display: flex;
  justify-content: space-around;
  color: #000091;
  z-index: 1
}

:deep(.fr-btn) {
  white-space: nowrap;
  width: 90%;
}

</style>
