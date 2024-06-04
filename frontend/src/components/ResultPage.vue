<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { TYPOLOGIES, MEASURED_GUNS_TYPOLOGIES } from '@/utils/firearms-utils/index'
import { isUserUsingCrosscall } from '@/utils/isUserUsingCrosscall'
import { useSnackbarStore } from '@/stores/snackbar'
import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'
import { getMentionsFromCategories } from '@/utils/mentions'

const { setMessage } = useSnackbarStore()
const stepsStore = useStepsStore()
const resultStore = useResultStore()

const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const img = computed(() => resultStore.img)

const typology = TYPOLOGIES[resultStore.typology]

const isDummy = computed(() => stepsStore.isDummy)
const hasDummyOptions = typology?.dummyOptions !== undefined
const isCardDetected = computed(() => resultStore.gunLength !== null && resultStore.gunBarrelLength !== null)

const isUp = ref(false)
const isDown = ref(false)
const isFeedbackDone = ref(false)

const label = computed(() => typology?.displayLabel)

const category = computed(() => {
  if (stepsStore.selectedAlarmGun && stepsStore.selectedAlarmGun !== '') {
    return 'D'
  } else if (isDummy.value) {
    return 'Non Classée'
  } else if (typology.displayLabel === 'Revolver') {
    return typology?.categoryWithoutSecuring
  } else {
    return typology?.getCategory(resultStore.gunLength, resultStore.gunBarrelLength)
  }
})

const disclaimer = computed(() => typology && Object.hasOwn(typology, 'getDisclaimer') ? typology.getDisclaimer(category.value, isCardDetected.value) : null)

function sendFeedback (isCorrect: boolean) {
  const json = {
    image_url: resultStore.imgUrl,
    feedback: isCorrect,
    confidence: confidence.value,
    label: typology.value,
    confidence_level: confidenceLevel.value,
  }
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
    .finally(() => {
      isFeedbackDone.value = true
    })
}
</script>

<template>
  <div class="result-frame -mx-8 py-5 px-8">
    <div class="result">
      <h1
        v-if="$route.name === 'IdentificationTypologyResult' && hasDummyOptions"
        class="typology-title bg-white py-4"
      >
        Typologie de l'arme
      </h1>
      <h1
        v-else
        class="typology-title bg-white py-4"
      >
        Résultat Final
      </h1>
      <div
        class="result-image"
        :style="{backgroundImage:`url(${img})`}"
      />
      <div class="fr-tile fr-enlarge-link mb-3">
        <div v-if="confidenceLevel === 'low'">
          <div class="fr-tile__body">
            <DsfrTag
              class="fr-tag--sm error-tag"
              label="Indice de fiabilité insuffisant"
            />
          </div>
          <div class="fr-alert fr-alert--info mt-3">
            <h2 class="fr-alert__title">
              Catégorie non déterminée
            </h2>
          </div>
          <div class="fr-alert fr-alert--warning mt-3">
            <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
          </div>
          <ContactExpert v-if="isUserUsingCrosscall()" />
        </div>
        <div v-else>
          <div class="fr-tile__body">
            <div v-if="confidenceLevel === 'high'">
              <DsfrTag class="fr-tag--sm success-tag">
                Indice de fiabilité : {{ Math.floor(confidence * 100) }}%
              </DsfrTag>
            </div>
            <div v-else>
              <DsfrTag class="fr-tag--sm warning-tag">
                Indice de fiabilité : {{ Math.floor(confidence * 100) }}%
              </DsfrTag>
              <p class="warning-text">
                Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
              </p>
              <ContactExpert v-if="isUserUsingCrosscall()" />
            </div>
            <div class="fr-alert fr-alert--info mt-3">
              <h2
                v-if="isDummy"
                class="fr-alert__title"
              >
                Arme factice de type {{ label }}
              </h2>
              <h2
                v-else-if="stepsStore.selectedAlarmGun"
                class="fr-alert__title"
              >
                Arme d'alarme de type {{ label }}
              </h2>
              <h2
                v-else
                class="fr-alert__title"
              >
                {{ label }}
              </h2>
              <template v-if="confidenceLevel !== 'low' && ($route.name !== 'IdentificationTypologyResult' || !hasDummyOptions)">
                <h3
                  class="fr-alert__title"
                  data-testid="arm-category"
                >
                  Catégorie {{ category }}
                </h3>
                <p v-for="mention in getMentionsFromCategories(category)">
                  {{ mention }}
                </p>
              </template>
            </div>
            <div
              v-if="disclaimer && confidenceLevel !== 'low' && ($route.name !== 'IdentificationTypologyResult' || !hasDummyOptions)"
              class="fr-alert fr-alert--warning"
            >
              <p v-html="disclaimer" />
            </div>
            <MissingCardAlert v-if="MEASURED_GUNS_TYPOLOGIES.includes(typology) && isCardDetected === false && isDummy == false" />
            <div
              v-if="confidenceLevel !== 'low' && ($route.name !== 'IdentificationTypologyResult' || !hasDummyOptions)"
              class="fr-callout mt-3"
            >
              <p class="fr-callout__text">
                Le résultat donné par Basegun n’emporte qu’une simple <span
                  class="font-bold"
                >valeur de
                  renseignement</span>.
                Pour faire référence dans une procédure, il <span class="font-bold">doit impérativement et
                  règlementairement être validé</span>
                par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.
              </p>
            </div>
            <div
              v-if="confidenceLevel !== 'low' && $route.name === 'IdentificationTypologyResult' && hasDummyOptions"
              class="fr-alert fr-alert--warning"
            >
              <p>
                Basegun a identifié votre arme mais a besoin <span
                  class="font-bold"
                >d’informations complémentaires</span>
                pour vous donner sa catégorie légale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isFeedbackDone"
      class="text-center mt-2"
    >
      <SnackbarAlert class="text-center" />
    </div>
    <div
      v-if="confidenceLevel !== 'low' && $route.name !== 'IdentificationFinalResult'"
      :aria-disabled="isFeedbackDone"
      class="feedback"
    >
      <p class="feedback-text">
        Cette typologie vous semble-t-elle correcte ?
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
    <div class="big-blank" />
  </div>
</template>

<style scoped>
.typology-title {
  text-align: center;
  color: var(--blue-france-sun-113-625);
}
.result-frame {
  background-color: #E3E3FD;
}

.result-image {
  height: 30vh;
  background-position: center;
  background-size: cover;
  margin-top: -1.5rem;
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
  text-align: left;
  font-size: 0.7rem;
  font-style: italic;
  line-height: 1rem;
  margin-bottom: 12px;
  font-weight: initial;
}

.feedback {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-text {
  margin: auto -.05rem auto 0;
  color: var(--blue-france-sun-113-625);
  font-weight: bold;
  font-size: .75rem;
}

.feedback-click {
  color: var(--blue-france-sun-113-625);
  font-size: 35px;
  margin: 0.1em 0.05em;
  text-shadow: 0 0 0 #00c8c8;
}

.feedback-thumb {
  line-height: unset;
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

:deep(.fr-tile) {
  padding: 1rem;
}

:deep(.fr-tile__body) {
  align-items: start !important;
  text-align: left;
}

:deep(.fr-tag) {
  display: flex;
}

.typo::first-letter {
  text-transform: uppercase;
}

</style>
