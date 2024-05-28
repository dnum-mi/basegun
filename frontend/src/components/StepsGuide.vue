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
