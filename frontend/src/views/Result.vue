<script setup>
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { results, guideSteps } from '@/utils/firearms-utils'
import { useSnackbarStore } from '@/stores/snackbar.js'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { useRouter } from 'vue-router'

const { setMessage } = useSnackbarStore()
const stepsStore = useStepsStore()
const resultStore = useResultStore()
const router = useRouter()

watchEffect(() => {
  if (!resultStore.img) router.push({ name: 'Start' })
})

const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const img = computed(() => resultStore.img)
const imgUrl = computed(() => resultStore.imgUrl)

const typology = computed(() => resultStore.typology)

const selectedAmmo = computed(() => stepsStore.selectedAmmo)
const isDummy = computed(() => stepsStore.isDummy)

const isUp = ref(undefined)
const isDown = ref(undefined)
const isFeedbackDone = ref(undefined)
const mentionIfisDummy = ref("Libre d'acquisition et de détention")

const label = computed(() => results[typology.value]?.displayLabel)
const category = computed(() => results[typology.value]?.category)
const mention = computed(() => isDummy.value === true
  ? mentionIfisDummy.value
  : results[typology.value]?.mention)
const isDummyTypology = computed(() => results[typology.value]?.isDummyTypology === true)

function keepingLastStep () {
  stepsStore.setCurrentStep(guideSteps.length)
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
  axios.post('/identification-feedback', json)
    .then(async res => {
      console.log(res)
      setMessage({ type: 'success', message: 'Votre vote a été pris en compte' })
    })
    .catch(async (err) => {
      console.log(err)
      setMessage({ type: 'error', message: 'Une erreur a eu lieu en enregistrant votre vote.' })
    })
}
</script>
<template>
  <div>
    <div class="result fr-col-11 fr-col-lg-6">
      <div
        class="result-image"
        :style="{backgroundImage:`url(${img})`}"
      />

      <div
        class="fr-callout custom-callout"
      >
        <div v-if="confidenceLevel === 'low'">
          <div class="callout-head">
            <DsfrTag
              class="fr-tag--sm error-tag"
              label="Indice de fiabilité insuffisant"
            />
          </div>
          <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
        </div>
        <div v-else>
          <div v-if="confidenceLevel === 'high'">
            <div class="callout-head">
              <DsfrTag
                class="fr-tag--sm success-tag"
              >
                Indice de fiabilité : {{ Math.floor(confidence) }}%
              </DsfrTag>
            </div>
          </div>
          <div v-else>
            <DsfrTag
              class="fr-tag--sm warning-tag"
            >
              Indice de fiabilité : {{ Math.floor(confidence) }}%
            </DsfrTag>
            <p class="warning-text">
              Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
            </p>
          </div>
          <div v-if="isDummy === true">
            <p class="fr-callout__title mt-3">
              Non Classé
            </p>
            <p class="fr-callout__text">
              Objet, arme factice
            </p>
            <div
              class="callout-mention"
            >
              <p v-html="mention" />
            </div>
            <p class="mt-2 fr-callout__text">
              Typologie de référence : <br>{{ label }}
            </p>
          </div>
          <div v-else>
            <p
              class="fr-callout__title mt-3"
              data-testid="legal-category"
            >
              Catégorie {{ category }}
            </p>
            <div
              class="callout-mention"
            >
              <p v-html="mention" />
            </div>
            <div
              class="mt-4"
            >
              <div v-if="isDummyTypology === true && !selectedAmmo">
                <p>Sauf si l'arme est factice:</p>
                <p class="fr-callout__title">
                  Non Classé
                </p>
                <router-link
                  v-slot="{navigate}"
                  :to="{name:'SafetyRecommendation'}"
                >
                  <DsfrButton
                    data-testid="dummy-button"
                    class="my-4 flex justify-content-center"
                    label="Vérifier si l'arme est factice"
                    @click="navigate()"
                  />
                </router-link>
              </div>

              <div v-else>
                <div
                  v-if="isDummyTypology === false"
                  class="mt-2"
                >
                  <p>Sauf si l'arme est factice:</p>
                  <p class="fr-callout__title">
                    Non Classé
                  </p>
                  <DsfrButton
                    data-testid="dummy-button"
                    class="my-4 flex justify-content-center"
                    label="Pas de guide de vérification"
                    disabled
                  />
                </div>
              </div>
            </div>
            <p
              class="mt-2 fr-callout__text"
            >
              Typologie : {{ label }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="confidenceLevel !== 'low'">
        <p class="fr-text--sm warning-msg">
          Le <span class="font-bold">résultat donné par Basegun</span> n'emporte qu'une simple <span class="font-bold">valeur de renseignement</span>. Pour faire référence dans une procédure, il doit impérativement et réglementairement être validé par le biais d'un <span class="font-bold">examen scientifique ou technique </span>prévu par le code de procédure pénale.
        </p>
        <div
          v-if="isFeedbackDone"
          class="snackbar text-center"
        >
          <SnackbarAlert class="text-center" />
        </div>
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
      <div class="big-blank" />
    </div>
    <div class="footer">
      <div
        v-show="img"
        class="fr-col-11 fr-col-lg-6 mx-auto"
      >
        <router-link
          v-slot="{navigate}"
          class="navigate"
          :to="{name: 'Instructions'}"
        >
          <DsfrButton
            :class="{'btn-full-width': selectedAmmo}"
            class="flex justify-center w-full"
            label="Identifier une nouvelle arme"
            icon="ri-camera-fill"
            :icon-right="true"
            @click="navigate()"
          />
        </router-link>
        <router-link
          v-if="selectedAmmo"
          v-slot="{navigate}"
          class="navigate"
          :to="{name:'SelectAmmo'}"
        >
          <DsfrButton
            :class="{'btn-full-width': selectedAmmo}"
            class="my-3 flex justify-center w-full"
            label="Retourner à l'étape précédente"
            icon="ri-arrow-go-back-fill"
            :icon-right="true"
            secondary
            @click="keepingLastStep(); navigate()"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  background-image: none !important;
}

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

:deep(.fr-btn) {
  white-space: nowrap;
}
</style>
