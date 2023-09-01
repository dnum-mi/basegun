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

:deep(.fr-stepper__state) {
  display: inline flow-root !important;
  color: var(--default-grey);
  font-size: .9rem;
}

:deep(.fr-stepper__title) {
  font-weight: normal;
  color: var(--default-grey);
  font-size: .9rem;
}
</style>
