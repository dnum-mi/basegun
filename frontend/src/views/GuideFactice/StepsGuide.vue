<script setup>
import { DsfrStepper } from '@gouvminint/vue-dsfr'

defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
  steps: {
    type: Array,
    default: [],
  },
})
</script>

<template>
  <DsfrStepper
    :current-step="currentStep"
    :steps="steps"
  />
</template>

<style scoped>

:deep(.fr-stepper__details) {
  display: none !important;
}

</style>
