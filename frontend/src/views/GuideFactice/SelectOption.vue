<script setup>
import { computed, ref } from 'vue'

import { guideFacticeSelectOption } from '@/utils/firearms-utils'
import AskingExpert from './AskingExpert.vue'
import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)
const selectedOption = computed({
  get () {
    return stepsStore.selectedOption
  },
  set (option) {
    stepsStore.setOption(option)
  },
})

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}
</script>

<template>
  <div class="instructions">
    <p
      class="leading-7 mt-3"
      v-html="guideFacticeSelectOption[`${typology}_text_option`]"
    />
  </div>
  <div>
    <template
      v-for="option of guideFacticeSelectOption[typology]"
      :key="option.value"
    >
      <div class="item">
        <DsfrRadioButton
          v-model="selectedOption"
          v-bind="option"
          :img="option.img"
          required
          name="selectedOption"
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
    </template>
  </div>
  <div>
    <AskingExpert />
  </div>
  <div class="big-blank" />
</template>

<style scoped>
.item {
  position: relative;
  padding-bottom: 1em;
}

.ov-icon {
  vertical-align: -.39rem;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 1.25rem;
  right: 7.5rem;
}

.zoom-label {
  padding: 0 .25rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-radio-rich__img){
  width: var(--select-option-image-width)+.25rem; /* cf. variable in main.css */
  height: 8rem;
}

:deep(.fr-radio-rich__img img){
  width: var(--select-option-image-width);
  height: 8rem;
  max-width: unset;
}

:deep(.fr-radio-rich input[type="radio"] + label){
  font-size: smaller;
  align-items: flex-start;
  min-height: 8.5rem;
  padding-right: 13.5rem;
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
