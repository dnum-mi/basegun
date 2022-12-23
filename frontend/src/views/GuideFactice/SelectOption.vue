<script setup>
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import { guideFactice } from '@/utils/firearms-utils'

import { store } from '@/store.js'

const typology = useStorage('typology')
const selectedOption = useStorage('selectedOption', '')

watch(selectedOption, (newValue) => {
  store.isDisabledNextStep = newValue === true
})
</script>

<template>
  <div>
    <p>
      Sélectionner ce que vous voyez sur votre arme :
      bouton à proximité <span class="bold-highlight">du pontet du côté gauche de la poignée</span>,
      ou <span class="bold-highlight">bouton sur le talon</span> de la crosse.
    </p>
  </div>
  <div class="rows">
    <div class="columns col-5">
      <DsfrRadioButtonSet
        v-model="selectedOption"
        :options="guideFactice[typology]"
        required
        name="selectedOption"
      />
    </div>
    <div class="columns">
      <div
        v-for="item in guideFactice[typology]"
        :key="item"
      >
        <VIcon
          class="zoom"
          name="ri-zoom-in-line"
          scale="1.25"
        />
        <img
          :src="`/src/assets/${item.img}`"
          alt=""
          class="img-deco"
        >
      </div>
    </div>
  </div>
  <a
    class="help"
    href="#"
  >
    Je n'arrive pas à réaliser cette étape
    <VIcon
      name="ri-information-line"
    />
  </a>
  <div class="blank" />
</template>

<style scoped>
.rows {
  display: flex;
}

.columns {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.item {
  position: relative;
}

.zoom {
  position: absolute;
}

:deep(.fr-radio-group):first-child {
  /* margin-top: 4rem;
  margin-bottom: 10rem; */
}

:deep(.fr-radio-group) {
  /* margin-right: 2rem; */
}

:deep(.fr-fieldset__content) {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

@media (min-width: 740px) {
  /* :deep(.fr-radio-group):first-child {
    margin-top: 6rem;
    margin-bottom: 14rem;
  } */
}

</style>
