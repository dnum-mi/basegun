<script setup>
import { defineProps } from 'vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
})

</script>

<template>
  <div
    :class="{fadeout: isLoading, animated: isLoading }"
  >
    <div class="text-center">
      <img
        class="loader"
        src="@/assets/basegun.png"
      >
      <h1 class="accueil-title fr-mt-n8v">
        Basegun <label class="fr-tag fr-tag--sm">beta</label>
      </h1>
    </div>
  </div>
</template>

<style scoped>
  .fadeout {
    animation: fadeout 2s forwards;
  }

  .animated {
    animation-duration: 2s;
  }

  @keyframes fadeout {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }

  .loader {
    width: 60%;
    max-width: 200px;
  }
</style>
