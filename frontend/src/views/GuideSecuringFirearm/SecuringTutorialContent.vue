<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'

import { TYPOLOGIES } from '@/utils/firearms-utils/index'

import AskingExpert from '@/components/AskingExpert.vue'

const router = useRouter()
const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = TYPOLOGIES[resultStore.typology]

// Tutorial object from last selected option
const selectedOption = computed(() => {
  if (typology.securingSteps[0].text) {
    return typology.securingSteps.at(stepsStore.selectedOptions.length - 1).options.find((option) => option.value === stepsStore.selectedOptions.at(-1))
  }
  return typology.securingSteps[0].options[0]
})

</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <h2 class="mt-3 mb-1 text-center">
        Mettre en sécurité mon arme
      </h2>
      <h3 class="text-center my-auto">
        Manipulations
      </h3>
      <div>
        <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
          <div class="fr-content-media relative">
            <video
              controls
              playsinline
              muted
              :src="selectedOption.video"
              data-testid="video-tutoriel"
            />
            <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 30 sec</span>
          </div>
        </div>
        <div class="manipulations -mx-8 p-8 fr-mb-1w">
          <ul class="list-none text-sm">
            <template
              v-for="option in selectedOption.text_steps"
              :key="option.value"
            >
              <li
                v-if="typeof option === 'string'"
                class="list-decimal"
                v-html="option"
              />
              <!-- Render PopupVideo -->
              <component
                :is="option"
                v-else
              />
            </template>
          </ul>
        </div>
        <AskingExpert />
      </div>
      <div class="footer">
        <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-left-line"
            :secondary="true"
            label="Précédent"
            @click="router.back()"
          />
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-right-line"
            data-testid="button-next"
            label="Suivant"
            :icon-right="true"
            @click="router.push({ name: 'SecuringAchievement' })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
video {
  width: 100% !important;
  height: auto !important;
}

.manipulations {
  background-color: #E3E3FD;
}
</style>
