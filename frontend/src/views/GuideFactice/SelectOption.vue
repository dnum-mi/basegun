<script setup>
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import { guideFacticeSelectOption } from '@/utils/firearms-utils'
import AskingExpert from './AskingExpert.vue'
import { useStepsStore } from '@/stores/steps.js'

const stepsStore = useStepsStore()

const typology = useLocalStorage('typology')
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
    <p>
      Sélectionner ce que vous voyez sur votre arme :
      bouton à proximité <span class="bold-highlight">du pontet du côté gauche de la poignée</span>,
      ou <span class="bold-highlight">bouton sur le talon</span> de la crosse.
    </p>
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
          :img="`/src/assets/${option.img}`"
          required
          name="selectedOption"
        />
        <VIcon
          class="zoom"
          name="ri-zoom-in-line"
          scale="1.25"
          @click="zoomOn(option.value)"
        />
        <Teleport to="body">
          <DsfrModal
            title=""
            :opened="zoom === option.value"
            @close="zoom = ''"
          >
            <img
              v-if="zoom === option.value"
              :src="`/src/assets/${option.img}`"
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

.zoom {
  position: absolute;
  top: 0.125em;
  right: 0.125em;
  background-color: #eee9;
  cursor: zoom-in;
}

:deep(.fr-container) {
  height: 70%;
}

 :deep(.fr-modal__content) {
  padding-left: 1rem;
}

:deep(.fr-radio-rich__img){
  width: 8.25rem;
}

:deep(.fr-radio-rich__img img){
  width: 8rem;
  max-width: unset;
}

:deep(.fr-radio-rich input[type="radio"] + label){
  white-space: pre-wrap;
}
.instructions {
  padding-bottom: 2em;
}
</style>
