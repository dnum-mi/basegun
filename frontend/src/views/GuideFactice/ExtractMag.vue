<script setup>
// import { store } from '@/store.js'
import { useStorage } from '@vueuse/core'
import { guideFacticeSelectOption } from '@/utils/firearms-utils'

const selectedOption = useStorage('selectedOption')
const typology = useStorage('typology')

</script>

<template>
  <div v-if="selectedOption === ''">
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
  <a
    class="help"
    href="#"
  >
    Je n'arrive pas à réaliser cette étape
    <VIcon
      name="ri-information-line"
    />
  </a>
  <div class="blank" />
</template>

<style scoped>
:deep(.fr-content-media__caption) {
  display:none !important;
  visibility: hidden;
}
</style>
