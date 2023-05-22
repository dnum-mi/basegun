<script setup>
import { guideFacticeSelectOption } from '@/utils/firearms-utils'
import { computed } from 'vue'
import AskingExpert from './AskingExpert.vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const selectedOption = computed(() => stepsStore.selectedOption)
const typology = computed(() => resultStore.typology)

</script>

<template>
  <div v-if="selectedOption === undefined">
    <p
      class="leading-7 mt-3"
      v-html="`${guideFacticeSelectOption[typology]?.text}`"
    />
    <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
      <div class="fr-content-media">
        <video
          autoplay
          playsinline
          loop
          muted
          :src="guideFacticeSelectOption[typology]?.video"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p
      class="leading-7 mt-3"
      v-html="`${guideFacticeSelectOption[typology][selectedOption]?.text}`"
    />
    <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
      <div class="fr-content-media">
        <video
          type="video/mp4"
          autoplay
          playsinline
          loop
          muted
          :src="guideFacticeSelectOption[typology][selectedOption]?.video"
        />
      </div>
    </div>
  </div>
  <AskingExpert />
  <div class="big-blank" />
</template>

<style scoped>
:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.modal-content) {
  overflow-y: scroll;
}

video {
  width: 100% !important;
  height: auto !important;
}

a {
  background-image: none !important;
}
.open-info {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.open-info svg {
  margin-top: 1rem;
  fill: #ff1d1d;
  cursor: pointer;
}

.full {
  width: 100%;
  justify-content: center;
  margin: auto;
  margin-top: .5rem;
}
</style>
