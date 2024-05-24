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

const typology = computed(() => resultStore.typology)

const selectedOptionStep = computed(() => {
  if (typology.value === 'revolver') {
    if (stepsStore.currentOptionStep['2'] === 'revolver_portiere') {
      return stepsStore.currentOptionStep['3']
    }
    return stepsStore.currentOptionStep['2']
  }
  return stepsStore.currentOptionStep['1']
})

const options = TYPOLOGIES.revolver?.securingSteps?.steps[1]?.options.concat(TYPOLOGIES.revolver?.securingSteps?.steps[2]?.options)

const getSelectedOptionData = (options) => {
  const matchingOption = options.find(option => option.value.toString() === selectedOptionStep.value)
  const selectedOption = {
    video: '',
    texts: '',
  }

  if (matchingOption) {
    selectedOption.video = matchingOption.video || ''
    selectedOption.texts = matchingOption.text_steps || ''
  }

  return selectedOption
}

const selectedOptionVideos = getSelectedOptionData(options).video
const selectedOptionTexts = getSelectedOptionData(options).texts

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
      <div v-if="typology === 'revolver'">
        <div v-if="selectedOptionStep === 'revolver_verrou_1892' || selectedOptionStep === 'revolver_1873_fr'">
          <div v-if="selectedOptionStep === 'revolver_verrou_1892' || selectedOptionStep === 'revolver_1873_fr'">
            <div
              class="fr-col-sm-6 fr-col-lg-12 mx-auto"
            >
              <div class="fr-content-media relative">
                <video
                  controls
                  playsinline
                  muted
                  :src="selectedOptionVideos"
                />
                <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 30 sec</span>
              </div>
            </div>
            <p class="manipulations -mx-8 p-8">
              <ul class="list-none text-sm">
                <li
                  v-for="option in selectedOptionTexts"
                  :key="option"
                  class="list-decimal"
                  v-html="option"
                />
                </li>
              </ul>
            </p>
            <div class="small-blank" />
            <AskingExpert />
            <FooterMES />
          </div>
          <div v-else>
            <div
              v-if="selectedOptionStep"
              class="fr-col-sm-6 fr-col-lg-12 mx-auto"
            >
              <div class="fr-content-media relative">
                <video
                  controls
                  playsinline
                  muted
                  :src="selectedOptionVideos"
                />
                <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 1 min</span>
              </div>
            </div>
            <div class="manipulations -mx-8 p-8">
              <ul
                v-if="selectedOptionStep"
                class="list-none text-sm"
              >
                <li
                  v-for="option in selectedOptionTexts"
                  :key="option"
                  class="list-decimal"
                  v-html="option"
                />
                </li>
              </ul>
            </div>
            <div class="small-blank" />
            <AskingExpert />
            <FooterMES />
          </div>
        </div>
        <div v-else>
          <div v-if="!TYPOLOGIES[typology]?.securingSteps?.text_steps">
            <div
              class="fr-col-sm-6 fr-col-lg-12 mx-auto"
            >
              <div class="fr-content-media relative">
                <video
                  controls
                  playsinline
                  muted
                  :src="TYPOLOGIES[typology]?.options[selectedOptionStep]?.video"
                  :src="TYPOLOGIES[typology]?.options[selectedOptionStep]?.video"
                  data-testid="video-tutoriel"
                />
                <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 30 sec</span>
              </div>
            </div>
            <div class="manipulations -mx-8 p-8">
              <ul class="list-none text-sm">
                <li
                  v-for="option in TYPOLOGIES[typology].options[selectedOptionStep]?.text_steps"
                  v-for="option in TYPOLOGIES[typology].options[selectedOptionStep]?.text_steps"
                  :key="option.value"
                  class="list-decimal"
                  v-html="option"
                />
              </ul>
              <div
                v-if="typology === `semi_auto_style_militaire_autre` && stepsStore.currentOptionStep['1'] === 'uzi'"
                class="mb-2"
              >
                <PopupVideo />
              </div>
            </div>
            <div class="small-blank" />
            <AskingExpert />
          </div>
          <div v-else>
            <div
              class="fr-col-sm-6 fr-col-lg-12 mx-auto"
            >
              <div class="fr-content-media relative">
                <video
                  controls
                  playsinline
                  muted
                  :src="TYPOLOGIES[typology]?.video"
                  :src="TYPOLOGIES[typology]?.video"
                  data-testid="video-tutoriel"
                />
                <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 1 min</span>
              </div>
            </div>
            <div class="manipulations -mx-8 p-8">
              <ul class="list-none text-sm">
                <li
                  v-for="option in TYPOLOGIES[typology]?.text_steps"
                  v-for="option in TYPOLOGIES[typology]?.text_steps"
                  :key="option.value"
                  class="list-decimal"
                  v-html="option"
                />
              </ul>
              <div
                v-if="typology === 'epaule_a_verrou'"
                class="text-sm mb-2"
              >
                <PopupVideo />
              </div>
              <div>
                <p class="text-sm mb-2">
                  3. Retourner l’arme et chercher la présence éventuelle de levier ou bouton devant le pontet en indiquant la présence d’un chargeur externe. Si tel est le cas, <span class="font-bold">extraire le chargeur</span> en appuyant ou en tirant sur ces derniers<br>
                </p>
                <p class="text-sm mb-2">
                  4. Si vous n’avez pas enlevé de chargeur, <span class="font-bold">vider le magasin des munitions</span> éventuelles en les faisant glisser vers l’avant à l’aide de votre pouce<br>
                </p>
                <p class="text-sm mb-2">
                  5. Contrôler visuellement la chambre
                </p>
              </div>
            </div>
            <div class="small-blank" />
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
                @click="router.push({ name:'SecuringAchievement'})"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
}

:deep(.fr-col-md-8),
:deep(.fr-col-lg-6) {
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
}

:deep(.fr-accordion__title span) {
  color: var(--blue-france-sun-113-625);
  font-weight: bold;
}

video {
  width: 100% !important;
  height: auto !important;
}

.manipulations {
  background-color: #E3E3FD;
}
</style>
