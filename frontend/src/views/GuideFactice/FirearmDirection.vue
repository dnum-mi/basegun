<script setup>
import { useStorage } from '@vueuse/core'

import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()

onMounted(() => {
  console.log('select-option', route.name === 'SelectOption' && selectedOption.value === undefined)
})

const selectedOption = useStorage('selectedOption', undefined)

</script>
<template>
  <div>
    <p class="text-tutorial mt-3">
      Tenir l’arme en la dirigeant toujours dans une <span class="bold-highlight">DIRECTION SÛRE</span>
      par la poignée en maintenant toujours le doigt <span class="bold-highlight">hors du pontet</span>.
    </p>
    <div class="col-sm-6 col-lg-12">
      <img
        src="@/assets/basegun-logo-attention-direction-arme.jpg"
        alt="alt"
        class="img-deco"
      >
    </div>
  </div>
</template>
<style scoped>

</style>
