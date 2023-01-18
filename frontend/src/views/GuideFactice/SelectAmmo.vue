<script setup>
import { useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'
import { guideFacticeSelectAmmo } from '@/utils/firearms-utils'
import AskingExpert from './AskingExpert.vue'

const typology = useStorage('typology')
const selectedAmmo = useStorage('selectedAmmo', undefined)
const isFactice = useStorage('isFactice')

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

watch(() => selectedAmmo.value, (newValue) => {
  selectedAmmo.value = newValue
  window.dispatchEvent(new CustomEvent('selected-ammo', {
    selectedAmmo: newValue,
  }))
  isFactice.value = newValue === 'billes'
})

</script>

<template>
  <div>
    <p>
      Sélectionner le type de munition du chargeur
    </p>
    <div>
      <template
        v-for="option of guideFacticeSelectAmmo[typology]"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedAmmo"
            class="radio"
            v-bind="option"
            :img="`/src/assets/${option.img_ammo}`"
            required
            name="selectedAmmo"
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
                :src="`/src/assets/${option.img_ammo}`"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </template>
    </div>
    <p>
      <i>Si le chargeur est vide, regarder l’emplacement des munitions : peut-il contenir des cartouches ou des billes ?</i>
    </p>
    <AskingExpert />
    <div class="blank" />
  </div>
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

:deep(.fr-radio-rich input[type="radio"] + label) {
  height: 13rem;
}

:deep(.radio > .fr-radio-rich__img){
  height: 12.5rem;
  width: 8.25rem;
}

:deep(.radio > .fr-radio-rich__img img){
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
