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
      class="mt-3"
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
          class="zoom-position"
          @click="zoomOn(option.value)"
        >
          <VIcon
            class="zoom"
            name="ri-zoom-in-line"
            scale="1.25"
          />
          <span class="zoom zoom-label">zoomer</span>
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
  <div class="blank" />
</template>

<style scoped>
.item {
  position: relative;
  padding-bottom: 2em;
}

.ov-icon {
  vertical-align: -.39rem;
}

.zoom-position {
  position: absolute;
  bottom: 2.25rem;
  right: 7.5rem;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
}

.zoom-label {
  /* left: 9.75em; */
  background-color: none !important;
  padding: 0 .25rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-radio-rich__img){
  width: 13.25rem;
  height: 8rem;
}

:deep(.fr-radio-rich__img img){
  width: 13rem;
  height: 8rem;
  max-width: unset;
}

:deep(.fr-radio-rich input[type="radio"] + label){
  align-items: flex-start;
  min-height: 8.5rem;
  white-space: pre-wrap;
}
.instructions {
  padding-bottom: 2em;
}
</style>
