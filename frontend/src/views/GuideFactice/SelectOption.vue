<script setup>
import { useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'
import { guideFactice } from '@/utils/firearms-utils'

import { store } from '@/store.js'

const typology = useStorage('typology')
const selectedOption = useStorage('selectedOption', '')

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

watch(selectedOption, (newValue) => {
  store.isDisabledNextStep = newValue === true
})
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
      v-for="option of guideFactice[typology]"
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
    <a
      class="help"
      href="#"
    >
      Je n'arrive pas à réaliser cette étape
      <VIcon
        name="ri-information-line"
      />
    </a>
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
