<script setup>
import { useStorage } from '@vueuse/core'
import { watch, reactive } from 'vue'

import { store } from '@/store.js'
const options = reactive([
  {
    label: 'cartouches',
    value: 'cartouches',
  },
  {
    label: 'billes',
    value: 'billes',
  },
])

const selectedAmmo = useStorage('selectedAmmo', '')

watch(selectedAmmo, (newValue) => {
  store.isCartridges = selectedAmmo.value === 'cartouches'
  store.isBalls = selectedAmmo.value === 'billes'
  store.isDisabledValidate = newValue === true
  store.isFactice = !!store.isBalls
})

</script>

<template>
  <div>
    <p>
      Sélectionner le type de munition du chargeur
    </p>
    <DsfrRadioButtonSet
      v-model="selectedAmmo"
      :options="options"
      required
      inline
      name="selectedAmmo"
    />
  </div>
  <div class="col-sm-12 col-lg-6 two-columns">
    <img
      src="@/assets/ammunition-cartridge .jpg"
      alt=""
      class="img-deco"
    >
    <img
      src="@/assets/ammunition-balls.jpg"
      alt=""
      class="img-deco"
    >
  </div>
  <p>
    <i>Si le chargeur est vide, regarder l’emplacement des munitions : peut-il contenir des cartouches ou des billes ?</i>
  </p>
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
.img-deco {
  padding: 1rem;
  margin-top: 0rem;
}

.two-columns {
  display: flex;
}

:deep(.fr-form-group){
  margin-top: 2rem;
  margin-bottom: 0rem;
}

:deep(.fr-radio-group):first-child {
  margin-left: 1rem;
}

:deep(.fr-radio-group){
  margin-left: 3rem;
}
</style>
