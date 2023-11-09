<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  backTo: RouteLocationRaw
  nextTo: RouteLocationRaw
  onBackClick:() => void
  onNextClick:() => void
  nextDisabled: boolean
}>()

const nextClick = (navigate: () => void) => {
  if (props.onNextClick) {
    props.onNextClick()
  }
  navigate()
}
const backClick = (navigate: () => void) => {
  if (props.onBackClick) {
    props.onBackClick()
  }
  navigate()
}
</script>

<template>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <RouterLink
        v-slot="{ navigate }"
        class="m-1"
        :to="backTo"
      >
        <DsfrButton
          class="flex justify-center !w-full"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click.stop.prevent="backClick(navigate)"
        />
      </RouterLink>
      <RouterLink
        v-slot="{ navigate }"
        class="m-1"
        :to="nextTo"
      >
        <DsfrButton
          class="flex justify-center !w-full"
          icon="ri-arrow-right-line"
          :disabled="nextDisabled"
          data-testid="button-next"
          label="Suivant"
          :icon-right="true"
          @click.stop.prevent="nextClick(navigate)"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.footer a {
  width: 50%;
}

</style>
