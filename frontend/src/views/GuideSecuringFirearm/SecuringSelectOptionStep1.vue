<script setup>
// VOIR AVEC STAN
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { resultats } from '@/utils/securing-firearms-utils.js'

import AskingExpert from '@/views/GuideIdentificationFirearm/AskingExpert.vue'

const router = useRouter()

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)

const selectedOptionStep1 = computed({
  get () {
    return stepsStore.selectedOptionStep1
  },
  set (selection) {
    stepsStore.setOptionStep1(selection)
  },
})

const disabledValidation = computed(() => stepsStore.selectedOptionStep1 === undefined)

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

// VOIR AVEC STAN
function changeTypology () {
  if (selectedOptionStep1.value === 'revolver_black_powder') {
    resultStore.setResult({
      typology: resultStore.typology + '_black_powder',
      confidence: resultStore.confidence,
      confidenceLevel: resultStore.confidenceLevel,
      img: resultStore.img,
      imgUrl: resultStore.imgUrl,
      geolocation: resultStore.geolocation,
      resultText: resultStore.resultText,
    })
  } else {
    resultStore.setResult({
      typology: resultStore.typology,
      confidence: resultStore.confidence,
      confidenceLevel: resultStore.confidenceLevel,
      img: resultStore.img,
      imgUrl: resultStore.imgUrl,
      geolocation: resultStore.geolocation,
      resultText: resultStore.resultText,
    })
  }
}

function goToNextRoute () {
  changeTypology()
  selectedOptionStep1.value === 'revolver_black_powder'
    ? router.push({ name: 'SecuringAchievement' }).catch(() => {})
    : router.push({ name: 'SecuringSelectOptionStep2' }).catch(() => {})
}

</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <h4 class="mt-3 text-center">
        Mettre en sécurité mon arme
      </h4>
      <h5 class="text-center my-auto">
        Choix du type d'arme
      </h5>
      <div class="instructions">
        <p
          class="leading-7 mt-3"
          v-html="resultats[typology]?.options_step_1_text"
        />
      </div>
      <div
        v-for="option of resultats[typology]?.options_step_1"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOptionStep1"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOptionStep1"
          />
          <div
            class="zoom"
            @click="zoomOn(option.value)"
          >
            <VIcon
              name="ri-zoom-in-line"
              scale="1.25"
            />
            <span class="zoom-label">zoomer</span>
          </div>
          <Teleport to="body">
            <DsfrModal
              title=""
              :opened="zoom === option.value"
              @close="zoom = ''"
            >
              <img
                v-if="zoom === option.value"
                :src="option.img"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </div>
      <AskingExpert />
      <div class="big-blank" />
    </div>
    <div class="footer">
      <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="router.push({ name:'Instructions'})"
        />
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          :disabled="disabledValidation"
          label="Suivant"
          :icon-right="true"
          @click="goToNextRoute()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  position: relative;
  margin-bottom: 1rem;
}

.ov-icon {
  vertical-align: -.39rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-label) {
  font-size: small;
}

:deep(.fr-radio-rich__pictogram) {
  width: 150% !important;
  height: 150% !important;
}
:deep(.fr-radio-rich__pictogram img){
  height: 100%;
  width: 100%;
}

:deep(.fr-radio-rich__pictogram img, .fr-radio-rich__pictogram svg) {
  max-height: 95%;
  max-width: 95%;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 0.25rem;
  right: 4.5rem;
}

.zoom-label {
  padding: .5rem;
}

:deep(.fr-radio-rich__pictogram) {
  width: auto;
}

:deep(.fr-col-md-8),
:deep(.fr-col-lg-6) {
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
}
.instructions {
  padding-bottom: .5em;
}
.footer button {
width: 50%;
}
</style>
