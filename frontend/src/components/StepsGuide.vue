<script lang="ts" setup>
withDefaults(
  defineProps<{
    currentStep: number;
    steps: string[];
  }>(),
  {
    currentStep: 1,
    steps: () => [],
  },
);
</script>

<template>
  <DsfrStepper :current-step="currentStep" :steps="steps" />
</template>
