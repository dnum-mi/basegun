<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { resultTree } from '@/utils/firearms-utils/index'
import { isUserUsingCrosscall } from '@/utils/isUserUsingCrosscall'
import { useSnackbarStore } from '@/stores/snackbar'
import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'
import { useRouter, useRoute } from 'vue-router'

const { setMessage } = useSnackbarStore()
const stepsStore = useStepsStore()
const resultStore = useResultStore()
const router = useRouter()
const route = useRoute()

watchEffect(() => {
  if (!resultStore.img) router.push({ name: 'StartPage' })
})

const confidence = computed(() => resultStore.confidence)
const confidenceLevel = computed(() => resultStore.confidenceLevel)
const img = computed(() => resultStore.img)
const imgUrl = computed(() => resultStore.imgUrl)

const typology = computed(() => resultStore.typology)

const isDummy = computed(() => stepsStore.isDummy)
const isDummyTypology = computed(() => resultTree[typology.value]?.isDummyTypology === true)

const isUp = ref(false)
const isDown = ref(false)
const isFeedbackDone = ref(false)

const securingTutorial = computed(() => resultStore.securingTutorial)

const label = computed(() => resultTree[typology.value]?.displayLabel)

const category = computed(() => resultTree[typology.value]?.category)
const categoryWithoutSecuring = computed(
  () => typology.value === 'revolver'
    ? resultTree[typology.value]?.categoryWithoutSecuring
    : undefined,
)

const mention = computed(() => isDummy.value === true
  ? mentionIfisDummy.value
  : securingTutorial.value === true
    ? resultTree[typology.value]?.mention
    : typology.value === 'revolver'
      ? resultTree[typology.value]?.mentionWithoutSecuring
      : undefined,

)

const mentionIfisDummy = ref("Libre d'acquisition et de détention")

function sendFeedback (isCorrect: boolean) {
  const json = {
    image_url: imgUrl.value,
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
      <h2
        v-if="route.name === 'IdentificationTypologyResult' && isDummyTypology === true"
        class="typology-title bg-white py-4"
      >
        Typologie de l'arme
      </h2>
      <h2
        v-else
        class="typology-title bg-white py-4"
      >
        Résultat Final
      </h2>
      <div
        class="result-image"
        :style="{backgroundImage:`url(${img})`}"
      />
      <div class="fr-tile fr-enlarge-link mb-3">
        <h2 class="fr-tile__title px-2">
          <div v-if="confidenceLevel === 'low'">
            <div class="fr-tile__body">
              <DsfrTag
                class="fr-tag--sm error-tag"
                label="Indice de fiabilité insuffisant"
              />
            </div>
            <p class="category fr-callout__title mt-3">
              <img
                class="px-2"
                src="@/assets/guide-identification/icones/gun.jpg"
                alt=""
              >
              Catégorie non déterminée
            </p>
            <p class="text-sm font-normal m-4 text-left text-current">
              Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.
            </p>
            <ContactExpert v-if="isUserUsingCrosscall()" />
          </div>
          <div v-else>
            <div class="fr-tile__body">
              <div v-if="confidenceLevel === 'high'">
                <DsfrTag
                  class="fr-tag--sm success-tag"
                >
                  Indice de fiabilité : {{ Math.floor(confidence * 100) }}%
                </DsfrTag>
              </div>
              <div v-else>
                <DsfrTag
                  class="fr-tag--sm warning-tag"
                >
                  Indice de fiabilité : {{ Math.floor(confidence * 100) }}%
                </DsfrTag>
                <p class="warning-text">
                  Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.
                </p>
                <ContactExpert v-if="isUserUsingCrosscall()" />
              </div>
              <div v-if="isDummy === false && (route.name !== 'IdentificationTypologyResult'|| isDummyTypology !== true)">
                <p
                  data-testid="arm-category"
                  class="category fr-callout__title mt-3"
                >
                  <img
                    class="px-2"
                    src="@/assets/guide-identification/icones/gun.jpg"
                    alt=""
                  >
                  <span v-if="securingTutorial || typology !== 'revolver'"> Catégorie {{ category }}</span>
                  <span v-else> Catégorie {{ categoryWithoutSecuring }}</span>
                </p>
                <div
                  class="callout-mention"
                >
                  <p v-html="mention" />
                </div>
              </div>
              <div v-if="isDummy === true">
                <p
                  data-testid="arm-category"
                  class="category fr-callout__title mt-3"
                >
                  <img
                    class="px-2"
                    src="@/assets/guide-identification/icones/gun.jpg"
                    alt=""
                  >
                  Catégorie Non Classée
                </p>
                <div
                  class="callout-mention"
                >
                  <span v-html="mention" />
                </div>
                <p class="mt-2 text-left text-base fr-callout__text">
                  <span class="font-normal">Typologie : </span>
                  <span>Objet, arme factice de type </span>
                  <span class="typo">
                    {{ label }}
                  </span>
                </p>
              </div>
              <div v-else>
                <p class="mt-2 text-left text-base fr-callout__text">
                  <span
                    v-if="route.name !== 'IdentificationTypologyResult'"
                    class="font-normal typo"
                  > Typologie : </span>
                  {{ label }}
                </p>
              </div>
            </div>
          </div>
        </h2>
      </div>
      <div
        v-if="route.name === 'IdentificationTypologyResult' && confidenceLevel !== 'low' && resultTree[typology]?.isDummyTypology"
        class="fr-tile fr-enlarge-link  p-4"
      >
        <div class="fr-tile__body pt-0">
          <h3 class="fr-tile__title" />
          <div class="flex">
            <img
              class="h-24"
              src="@/assets/guide-identification/icones/warning.jpg"
              alt="alt"
            >
            <p class="text-sm text-justify">
              Basegun a identifié votre arme mais a encore <span class="font-bold">besoin d’informations supplémentaires</span>
              pour vous donner le résultat final.
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          v-if="confidenceLevel !== 'low'"
          class="fr-tile fr-enlarge-link"
        >
          <div
            class="fr-tile__body pt-0"
          >
            <h3 class="fr-tile__title" />
            <div class="block">
              <div class="flex">
                <img
                  class="w-5 h-5 mx-2"
                  src="@/assets/guide-identification/icones/warning.jpg"
                  alt="alt"
                ><span>Attention</span> <img
                  class="w-5 h-5  mx-2"
                  src="@/assets/guide-identification/icones/warning.jpg"
                  alt="alt"
                >
              </div>
              <p class="text-sm text-justify">
                Le résultat donné par Basegun n’emporte qu’une simple <span class="font-bold">valeur de renseignement</span>.
                Pour faire référence dans une procédure, il <span class="font-bold">doit impérativement et réglementairement être validé</span>
                par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.
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
      v-if="confidenceLevel !== 'low' && route.name !== 'IdentificationFinalResult'"
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

.warning-msg {
  line-height: 1.3rem !important;
  margin-bottom: 1rem;
}

.callout-head {
  display: flex;
  align-items: center;
}

.callout-mention {
  font-weight: normal;
  margin-top: 10px;
  font-style: italic;
  line-height: 1.3rem;
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

h4 {
  color: unset;
  margin: var(--title-spacing);;
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

.category {
  border: solid 1px var(--blue-france-sun-113-625);
  padding: .5rem;
  color: var(--blue-france-sun-113-625);
  font-size: medium;
}

.typo::first-letter {
  text-transform: uppercase;
}

</style>
