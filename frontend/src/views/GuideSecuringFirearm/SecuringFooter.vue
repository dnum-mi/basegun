<script setup>
const props = defineProps({
  backTo: [Object, String],
  nextTo: [Object, String],
  onBackClick: Function,
  onNextClick: Function,
  nextDisabled: Boolean,
})

const nextClick = (navigate) => {
  if (props.onNextClick) {
    props.onNextClick()
  }
  navigate()
}
const backClick = (navigate) => {
  if (props.onBackClick) {
    props.onBackClick()
  }
  navigate()
}
</script>

<template>
  <div class="footer">
    <div class="fr-col-11  fr-col-lg-6  footer-actions  mx-auto">
      <RouterLink
        v-slot="{ navigate }"
        class="m-1"
        :to="backTo"
      >
        <DsfrButton
          icon="ri-arrow-left-line"
          class="flex  justify-center  w-full"
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
          class="flex  justify-center  w-full"
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
