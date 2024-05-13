<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import SnackbarAlert from '@/components/SnackbarAlert.vue'
import { resultTree, ALARM_GUNS_TYPOLOGIES, MEASURED_GUNS_TYPOLOGIES, DISCLAIMERS } from '@/utils/firearms-utils/index'
import { isUserUsingCrosscall } from '@/utils/isUserUsingCrosscall'
import { useSnackbarStore } from '@/stores/snackbar'
import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'
import { useRouter, useRoute } from 'vue-router'
import { getMentionsFromCategories } from '@/utils/mentions'

const { setMessage } = useSnackbarStore()
const stepsStore = useStepsStore()
const resultStore = useResultStore()
const router = useRouter()
const route = useRoute()

function getCategoryFromTypologyAndMeasures (typology: string, gunLength: number, gunBarrelLength: number) {
  if (gunLength !== null && gunBarrelLength !== null) {
    switch (typology) {
      case 'epaule_a_pompe':
        if (gunLength > 75 && gunBarrelLength > 55) { return 'C' } else { return 'B' }
      case 'epaule_a_un_coup_par_canon':
        if (gunLength > 75 && gunBarrelLength > 40) { return 'C' } else { return 'B' }
      case 'epaule_a_levier_sous_garde': case 'epaule_a_verrou': case 'epaule_semi_auto_style_chasse':
        if (gunLength < 75 || gunBarrelLength < 40) { return 'B' }
        if (gunLength > 75 && gunBarrelLength > 55) { return 'C' }
    }
  }
  return resultTree[typology]?.category
}

function getDisclaimer (typology: string, category: string) {
  if (['epaule_a_levier_sous_garde', 'epaule_a_verrou'].includes(typology)) {
    if (isCardDetected.value === false) {
      if (['B ou C', 'C'].includes(category)) {
        return DISCLAIMERS.epaule_a_levier_verrou.short
      }
    }
    else
    {
      if (['C'].includes(category)) {
        return DISCLAIMERS.epaule_a_levier_verrou.short
      }
      if (['B ou C'].includes(category)) {
        return DISCLAIMERS.epaule_a_levier_verrou.long
      }
    }
  }
  if (typology === 'epaule_semi_auto_style_chasse' && ['B ou C', 'C'].includes(category)) {
    if (isCardDetected.value === false) {
      return DISCLAIMERS.semi_auto_style_chasse.short
    }
    else {
      if (['C'].includes(category)) {
        return DISCLAIMERS.semi_auto_style_chasse.short
      }
      if (['B ou C'].includes(category)) {
        return DISCLAIMERS.semi_auto_style_chasse.long
      }
    }
  }
  if (typology === 'epaule_a_pompe' && category === 'B ou C') { return DISCLAIMERS.epaule_a_pompe.short }
  if (typology === 'epaule_a_pompe' && category === 'C') { return DISCLAIMERS.epaule_a_pompe.long }
  if (['epaule_semi_auto_style_militaire_milieu_20e', 'semi_auto_style_militaire_autre'].includes(typology)) { return DISCLAIMERS.epaule_semi_auto_style_militaire }
  if (ALARM_GUNS_TYPOLOGIES.includes(typology) && category === 'D') { return DISCLAIMERS.alarm_guns }
}

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
const isCardDetected = computed(() => resultStore.gunLength !== null && resultStore.gunBarrelLength !== null)

const isUp = ref(false)
const isDown = ref(false)
const isFeedbackDone = ref(false)

const label = computed(() => resultTree[typology.value]?.displayLabel)

const category = computed(() => {
  if (stepsStore.selectedAlarmGun && stepsStore.selectedAlarmGun !== '') {
    return 'D'
  } else if (isDummy.value) {
    return 'Non Classée'
  } else if (typology.value === 'revolver') {
    return resultTree[typology.value]?.categoryWithoutSecuring
  } else {
    return getCategoryFromTypologyAndMeasures(typology.value, resultStore.gunLength, resultStore.gunBarrelLength)
  }
})

const disclaimer = computed(() => getDisclaimer(typology.value, category.value))

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
      ></div>
      <div class="fr-tile fr-enlarge-link mb-3">
        <h2 class="fr-tile__title px-2" />
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
            Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire
            appel à un expert.
          </p>
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
              <h3
                v-if="isDummy"
                class="fr-alert__title"
              >
                Arme factice de type {{ label }}
              </h3>
              <h3
                v-else-if="stepsStore.selectedAlarmGun"
                class="fr-alert__title"
              >
                Arme d'alarme de type {{ label }}
              </h3>
              <h3
                v-else
                class="fr-alert__title"
              >
                {{ label }}
              </h3>
              <template v-if="confidenceLevel !== 'low' && (route.name !== 'IdentificationTypologyResult' || isDummyTypology !== true)">
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
              v-if="disclaimer && confidenceLevel !== 'low' && (route.name !== 'IdentificationTypologyResult' || isDummyTypology !== true)"
              class="fr-alert fr-alert--warning"
            >
              <p v-html="disclaimer" />
            </div>
            <MissingCardAlert v-if="MEASURED_GUNS_TYPOLOGIES.includes(typology) && isCardDetected === false" />
            <div
              v-if="confidenceLevel !== 'low' && (route.name !== 'IdentificationTypologyResult' || isDummyTypology !== true)"
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
              v-if="confidenceLevel !== 'low' && route.name === 'IdentificationTypologyResult' && isDummyTypology"
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

.category {
  border: solid 1px var(--blue-france-sun-113-625);
  padding: .5rem;
  color: var(--blue-france-sun-113-625);
  font-size: medium;
}

.typo::first-letter {
  text-transform: uppercase;
}

.disclaimer {
  font-size: smaller;
  font-weight: 500;
  color: black;
}

</style>
