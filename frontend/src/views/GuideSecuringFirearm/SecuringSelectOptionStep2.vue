<script setup>
import { computed, ref } from 'vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { resultTree } from '@/utils/firearms-utils/index.js'

import AskingExpert from '@/components/AskingExpert.vue'
import SecuringFooter from './SecuringFooter.vue'

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)
const selectedOptionStep2 = computed({
  get () {
    return stepsStore.selectedOptionStep2
  },
  set (option) {
    stepsStore.setOptionStep2(option)
  },
})
const selectedOptionStep1 = computed(() => stepsStore.selectedOptionStep1)

const disabledValidation = computed(() => stepsStore.selectedOptionStep2 === undefined)

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}
</script>

<template>
  <div class="fr-container">
    <div
      v-if="typology !== 'revolver'"
      class="result fr-col-11 fr-col-lg-6 mx-auto"
    >
      <h2 class="mt-3 mb-1 text-center">
        Mettre en sécurité mon arme
      </h2>
      <h3 class="text-center my-auto">
        Choix du type d'arme
      </h3>
      <div class="instructions">
        <p
          class="leading-7 mt-3"
          v-html="resultTree[typology]?.options_text"
        />
      </div>
      <div
        v-for="option of resultTree[typology]?.options"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOptionStep2"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOptionStep2"
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
    <div
      v-else
      class="result fr-col-11 fr-col-lg-6 mx-auto"
    >
      <h2 class="mt-3 mb-1 text-center">
        Mettre en sécurité mon arme
      </h2>
      <h3 class="text-center my-auto">
        Choix du type d'arme
      </h3>
      <div class="instructions">
        <p
          class="leading-7 mt-3"
          v-html="resultTree[typology].options_step_2_text"
        />
      </div>

      <div
        v-for="option of resultTree[typology]?.options_step_2"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOptionStep2"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOptionStep2"
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
    <SecuringFooter
      :back-to="{ name: selectedOptionStep1 ? 'SecuringSelectOptionStep1' : 'InstructionsPage' }"
      :next-to="{ name: selectedOptionStep2 === 'revolver_1873_fr' ? 'SecuringSelectOptionStep3' : 'SecuringTutorialContent' }"
      :next-disabled="disabledValidation"
    />
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
  word-wrap: anywhere !important;
  font-size: small;
}

:deep(.fr-radio-rich__pictogram) {
  width: 240% !important;
  height: auto;
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
  bottom: 0.5rem;
  right: 6.75rem;
}

.zoom-label {
  padding: 0 -2rem;
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
</style>
