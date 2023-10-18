<script lang="ts" setup>
import { DsfrStepper } from '@gouvminint/vue-dsfr'

withDefaults(defineProps<{
  currentStep: number,
  steps: string[],
}>(), {
  currentStep: 1,
  steps: () => [],
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
