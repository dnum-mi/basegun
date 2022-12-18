<script setup>
import { useStorage } from '@vueuse/core'
import { watch, ref } from 'vue'
import { titleOptionsSemiAuto, titleOptionsAutreEpaule, results } from '@/utils/firearms-utils'

import { store } from '@/store.js'

const label = useStorage('label')
const selectedMechanism = useStorage('selectedMechanism', '')

const titleOptions = ref([])

titleOptions.value = results[label.value].displayLabel === 'pistolet semi-automatique moderne' ? titleOptionsSemiAuto : titleOptionsAutreEpaule

watch(selectedMechanism, (newValue) => {
  store.isLever = newValue === 'levier'
  store.isButton = newValue === 'bouton'
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
  <div class="two-columns">
    <DsfrRadioButtonSet
      v-model="selectedMechanism"
      :options="titleOptions"
      class="col-4"
      required
      name="selectedMechanism"
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
  justify-content: space-around;
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
  flex-direction: column;
}

@media (min-width: 740px) {
  :deep(.fr-radio-group):first-child {
    margin-top: 6rem;
    margin-bottom: 14rem;
  }
}

</style>
