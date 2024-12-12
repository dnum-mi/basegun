<script lang="ts" setup></script>

<template>
  <div class="text-center">
    <DsfrButton
      class="m-1 flex justify-center"
      href="#"
      icon="ri-alert-line"
      label="Contacter un expert"
      data-testid="expert-path"
      @click="$router.push({ name: 'ExpertContact' })"
    />
  </div>
</template>
<style scoped>
:deep(.fr-btn) span {
  margin: auto !important;
}
</style>
