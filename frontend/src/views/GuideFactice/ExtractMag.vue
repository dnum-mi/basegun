<script setup>
import { guideFacticeSelectOption } from '@/utils/firearms-utils'
import { computed } from 'vue'
import AskingExpert from './AskingExpert.vue'

import { useStepsStore } from '@/stores/steps.js'

const stepsStore = useStepsStore()

const selectedOption = computed(() => stepsStore.selectedOption)
const typology = computed(() => stepsStore.typology)

</script>

<template>
  <div v-if="selectedOption === undefined">
    <p
      class="text-tutorial mt-3"
      v-html="`${guideFacticeSelectOption[typology].text}`"
    />
    <div class="col-sm-6 col-lg-12">
      <div class="fr-content-media">
        <video
          width="320"
          height="240"
          type="video/mp4"
          autoplay
          loop
          muted
          :src="`/src/assets/videos-sm/${guideFacticeSelectOption[typology].video}`"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p
      class="text-tutorial mt-3"
      v-html="`${guideFacticeSelectOption[typology][selectedOption].text}`"
    />
    <div class="col-sm-6 col-lg-12">
      <div class="fr-content-media">
        <video
          width="320"
          height="240"
          type="video/mp4"
          autoplay
          loop
          muted
          :src="`/src/assets/videos-sm/${guideFacticeSelectOption[typology][selectedOption].video}`"
        />
      </div>
    </div>
  </div>
  <AskingExpert />
  <div class="blank" />
</template>

<style scoped>
:deep(.fr-content-media__caption) {
  display:none !important;
  visibility: hidden;
}
</style>
