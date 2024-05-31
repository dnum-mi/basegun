<script lang="ts" setup>

defineProps<{
  onBackClick?:() => void
  onNextClick?:() => void
  nextDisabled?: boolean
}>()

</script>

<template>
  <div class="footer">
    <div class="fr-col-12 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        class="flex justify-center !w-full"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="onBackClick"
      />
      <DsfrButton
        class="flex justify-center !w-full"
        icon="ri-arrow-right-line"
        :disabled="nextDisabled"
        data-testid="button-next"
        label="Suivant"
        :icon-right="true"
        @click="onNextClick"
      />
    </div>
  </div>
</template>
