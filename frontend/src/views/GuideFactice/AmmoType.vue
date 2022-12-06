<script setup>
import { watch, onMounted, computed, ref, reactive } from 'vue'

const titleOptions = reactive([
  {
    label: 'cartouches',
    value: 'cartouches',
  },
  {
    label: 'billes',
    value: 'billes',
  },
])

const selectedOption = ref('')

const updateSelection = () => {
  selectedOption.value = titleOptions.find(option => option.value).value
  console.log(selectedOption.value)
  // saveSelectionToLocalStorage()
}

// const saveSelectionToLocalStorage = () => {
//   localStorage.setItem(selectedOption, selectedOption.value)
// }

// watch(selectedOption.value, updateSelection)

// onMounted(() => {
//   localStorage.getItem(selectedOption)
// })

</script>

<template>
  <div>
    <p>
      Sélectionner le type de munition du chargeur
    </p>
    <DsfrRadioButtonSet
      :model-value="selectedOption"
      name="selectedOption"
      :value="titleOptions"
      required
      inline
      :options="titleOptions"
      @update:model-value="$event => (updateSelection(), $event)"
    />
  </div>
  <div class="col-12 two-columns">
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
  <a href="#">
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
