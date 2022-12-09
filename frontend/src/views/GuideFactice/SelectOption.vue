<script setup>
import { useStorage } from '@vueuse/core'
import { watch, reactive } from 'vue'

import { store } from '@/store.js'
const titleOptions = reactive([
  {
    label: 'levier',
    value: 'levier',
  }, {
    label: 'bouton',
    value: 'bouton',
  },
])

const selectedOption = useStorage('selectedOption', '')

watch(selectedOption, (newValue) => {
  store.isLever = newValue === 'levier'
  store.isButton = newValue === 'bouton'
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
  <div class="two-columns">
    <DsfrRadioButtonSet
      v-model="selectedOption"
      :options="titleOptions"
      class="col-4 img-spacing"
      required
      name="selectedOption"
    />

    <div class="col-8">
      <img
        src="@/assets/pistol-1_0_fleche.png"
        alt=""
        class="img-deco"
      >
      <img
        src="@/assets/pistol-2_0_fleche.png"
        alt=""
        class="img-deco"
      >
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
.two-columns {
  display: flex;
  flex-direction: row;
}

:deep(.fr-radio-group):first-child {
  margin-top: 4rem;
  margin-bottom: 10rem;
}

:deep(.fr-radio-group) {
  margin-right: 2rem;
}

.img-deco {
  height: auto;
}

:deep(.fr-fieldset__content) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 740px) {
  :deep(.fr-radio-group):first-child {
    margin-top: 6rem;
    margin-bottom: 14rem;
  }
}

</style>
