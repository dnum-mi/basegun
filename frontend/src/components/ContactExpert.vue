<script lang="ts" setup></script>

<template>
  <div class="text-center">
    <DsfrButton
      class="m-1 flex justify-center"
      href="#"
      icon="ri-alert-line"
      label="Contacter un expert"
      @click="$router.push({ name: 'ExpertSituation' })"
    />
  </div>
</template>
<style scoped>
:deep(.fr-btn) span {
  margin: auto !important;
}
</style>
