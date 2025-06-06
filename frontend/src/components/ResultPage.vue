<script lang="ts" setup>
import { ref, computed } from "vue";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import {
  TYPOLOGIES,
  MEASURED_GUNS_TYPOLOGIES,
  isAlarmGun,
} from "@/utils/firearms-utils/index";
import { isUserUsingCrosscall } from "@/utils/isUserUsingCrosscall";
import { useSnackbarStore } from "@/stores/snackbar";
import { useStore } from "@/stores/result";
import { getMentionsFromCategories } from "@/utils/mentions";

import { sendIdentificationFeedback } from "@/api/api-client";

const { setMessage } = useSnackbarStore();
const store = useStore();

const confidence = computed(() => store.confidence);
const confidenceLevel = computed(() => store.confidenceLevel);
const img = computed(() => store.img);

const typology = TYPOLOGIES[store.typology];

const isDummy = computed(() => store.isDummy);
const hasDummyOptions = typology?.dummyOptions !== undefined;
const isCardDetected = computed(
  () => store.gunLength !== null && store.gunBarrelLength !== null,
);

const isUp = ref(false);
const isDown = ref(false);
const isFeedbackDone = ref(false);

const label = computed(() => typology?.displayLabel);

const category = computed(() =>
  isDummy.value
    ? "Non Classée"
    : typology?.getCategory(store.gunLength, store.gunBarrelLength),
);

const disclaimer = computed(() =>
  typology && Object.hasOwn(typology, "getDisclaimer")
    ? typology.getDisclaimer(category.value, isCardDetected.value)
    : null,
);

async function sendFeedback(isCorrect: boolean) {
  if (isCorrect) {
    isUp.value = true;
  } else {
    isDown.value = true;
  }
  const feedback = {
    image_url: store.imgUrl,
    feedback: isCorrect,
    confidence: confidence.value,
    label: label.value,
    confidence_level: confidenceLevel.value,
  };

  await sendIdentificationFeedback(feedback)
    .then((data) => {
      console.log(data);
      setMessage({
        type: "success",
        message: "Votre vote a été pris en compte",
        timeout: 60000,
      });
    })
    .catch((error) => {
      console.log(error);
      setMessage({
        type: "error",
        message: "Une erreur a eu lieu en enregistrant votre vote.",
        timeout: 60000,
      });
    })
    .finally(() => {
      isFeedbackDone.value = true;
    });
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
      <h1 v-else class="typology-title bg-white py-4">Résultat Final</h1>
      <img class="result-image" :src="img" />
      <div class="fr-tile fr-enlarge-link mb-3">
        <div v-if="confidenceLevel === 'low'">
          <div class="fr-tile__body">
            <DsfrTag
              class="fr-tag--sm error-tag"
              label="Indice de fiabilité insuffisant"
            />
          </div>
          <div class="fr-alert fr-alert--info mt-3">
            <h2 class="fr-alert__title">Typologie non déterminée</h2>
          </div>
          <div class="fr-alert fr-alert--warning mt-3">
            <p>
              Nous n'avons pas suffisamment d'éléments pour fournir une réponse
              fiable. Nous vous conseillons de faire appel à un expert.
            </p>
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
                Nous vous conseillons de faire appel à un expert pour confirmer
                cette réponse.
              </p>
              <ContactExpert v-if="isUserUsingCrosscall()" />
            </div>
            <div class="fr-alert fr-alert--info mt-3">
              <h2 v-if="isDummy" class="fr-alert__title">
                Arme factice de type {{ label }}
              </h2>
              <h2 v-else-if="isAlarmGun()" class="fr-alert__title">
                Arme d'alarme de type {{ label }}
              </h2>
              <h2 v-else class="fr-alert__title">
                {{ label }}
              </h2>
              <template
                v-if="
                  confidenceLevel !== 'low' &&
                  ($route.name !== 'IdentificationTypologyResult' ||
                    !hasDummyOptions)
                "
              >
                <h3 class="fr-alert__title" data-testid="arm-category">
                  Catégorie {{ category }}
                </h3>
                <p v-for="mention in getMentionsFromCategories(category)">
                  {{ mention }}
                </p>
              </template>
            </div>
            <div
              v-if="
                disclaimer &&
                confidenceLevel !== 'low' &&
                isDummy == false &&
                ($route.name !== 'IdentificationTypologyResult' ||
                  !hasDummyOptions)
              "
              class="fr-alert fr-alert--warning"
            >
              <p v-html="disclaimer" />
            </div>
            <MissingCardAlert
              v-if="
                MEASURED_GUNS_TYPOLOGIES.includes(typology) &&
                isCardDetected === false &&
                isDummy == false
              "
            />
            <div
              v-if="
                confidenceLevel !== 'low' &&
                ($route.name !== 'IdentificationTypologyResult' ||
                  !hasDummyOptions)
              "
              class="fr-callout mt-3"
            >
              <p class="fr-callout__text">
                Le résultat donné par Basegun n’emporte qu’une simple
                <span class="font-bold">valeur de renseignement</span>. Pour
                faire référence dans une procédure, il
                <span class="font-bold"
                  >doit impérativement et règlementairement être validé</span
                >
                par le biais d'un examen scientifique ou technique prévu par le
                code de procédure pénale.
              </p>
            </div>
            <div
              v-if="
                confidenceLevel !== 'low' &&
                $route.name === 'IdentificationTypologyResult' &&
                hasDummyOptions
              "
              class="fr-alert fr-alert--warning"
            >
              <p>
                Basegun a identifié votre arme mais a besoin
                <span class="font-bold">d’informations complémentaires</span>
                pour vous donner sa catégorie légale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFeedbackDone" class="text-center mt-2">
      <SnackbarAlert class="text-center" />
    </div>
    <div
      v-if="
        confidenceLevel !== 'low' && $route.name !== 'IdentificationFinalResult'
      "
      :aria-disabled="isFeedbackDone"
      class="feedback"
    >
      <p class="feedback-text">Cette typologie vous semble-t-elle correcte ?</p>
      <div class="feedback-thumb">
        <label class="feedback-click" @click="sendFeedback(true)">
          <VIcon v-if="isUp" name="ri-thumb-up-fill" class="feedback-click" />
          <VIcon v-else name="ri-thumb-up-line" class="feedback-click" />
        </label>
        <label class="feedback-click" @click="sendFeedback(false)">
          <VIcon
            v-if="isDown"
            name="ri-thumb-down-fill"
            class="feedback-click"
          />
          <VIcon v-else name="ri-thumb-down-line" class="feedback-click" />
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
  background-color: #e3e3fd;
}

.result-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 350px;
  margin-top: -1.5rem;
  margin-bottom: -0.5rem;
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
  margin: auto -0.05rem auto 0;
  color: var(--blue-france-sun-113-625);
  font-weight: bold;
  font-size: 0.75rem;
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
