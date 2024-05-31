<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps'
import { useResultStore } from '@/stores/result'
import { TYPOLOGIES } from '@/utils/firearms-utils/index'

import AskingExpert from '@/components/AskingExpert.vue'
import SecuringFooter from './SecuringFooter.vue'

const router = useRouter()
const props = defineProps<{
  step: 1 | 2 | 3
}>()

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = TYPOLOGIES[resultStore.typology]

const selectedOptionValue = computed({
  get () {
    return stepsStore.selectedOptions[props.step - 1]
  },
  set (option) {
    if (stepsStore.selectedOptions[props.step - 1]) { stepsStore.selectedOptions[props.step - 1] = option || '' } else { stepsStore.selectedOptions.push(option || '') }
  },
})

const disabledValidation = computed(() => stepsStore.selectedOptions[props.step - 1] === undefined)

const zoom = ref('')

const zoomOn = (imgValue: string) => {
  zoom.value = imgValue
}

function updateTypology () {
  if (props.step === 1 && selectedOptionValue.value === 'revolver_black_powder') {
    // Remember if it is a revolver with black powder
    resultStore.updateTypology(selectedOptionValue.value)
  }
}

const nextTo = computed(() => {
  if (typology.displayLabel === 'Revolver') {
    if (props.step === 1) {
      if (stepsStore.selectedOptions.at(-1) === 'revolver_black_powder') {
        return {
          name: 'SecuringAchievement',
        }
      }
      return {
        name: 'SecuringSelectOption',
        params: { step: '2' },
      }
    }
    if (props.step === 2) {
      if (stepsStore.selectedOptions.at(-1) !== 'revolver_portiere') {
        return {
          name: 'SecuringTutorialContent',
        }
      }
      return {
        name: 'SecuringSelectOption',
        params: { step: '3' },
      }
    }
  }
  return {
    name: 'SecuringTutorialContent',
  }
})

function nextClick () {
  updateTypology()
  router.push(nextTo.value)
}

</script>

<template>
  <div class="fr-container">
    <div class="fr-col-12 fr-col-lg-6 mx-auto">
      <h2 class="mt-3 mb-1 text-center">
        Mettre en sécurité mon arme
      </h2>
      <h3 class="text-center my-auto fr-mb-2w">
        Choix du type d'arme
      </h3>
      <!-- Custom for revolver -->
      <div
        v-if="step === 3"
      >
        <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
          <div class="fr-content-media relative">
            <video
              class="fr-container video-container"
              autoplay
              controls
              playsinline
              loop
              muted
              :title="typology.securingSteps.at(-1).video_title"
              :src="typology.securingSteps.at(-1).video"
            />
            <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 20 sec</span>
          </div>

          <div class="manipulations -mx-8 p-8">
            <ol class="list text-sm">
              <li> Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution</li>
              <li> <span class="font-bold">Tirer le haut du levier de verrouillage</span> du barillet vers l’arrière</li>
              <li> <span class="font-bold">Tirer légèrement le chien/marteau</span> vers l’arrière jusqu’à entendre un premier clic </li>
              <li> Essayez de pousser sur un côté du barillet pour le faire basculer.</li>
            </ol>
          </div>
        </div>
        <p v-html="typology.securingSteps.at(-1).video_post_text" />
      </div>

      <div
        v-for="(option) in typology.securingSteps[step - 1].options"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOptionValue"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOptionValue"
          />
          <div
            class="zoom"
            @click="zoomOn(option.value)"
          >
            <VIcon
              name="ri-zoom-in-line"
              scale="1.25"
            />
            <span class="zoom-label">zoomer</span>
          </div>
          <Teleport to="body">
            <DsfrModal
              title=""
              :opened="zoom === option.value"
              @close="zoom = ''"
            >
              <img
                v-if="zoom === option.value"
                :src="option.img"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </div>
      <AskingExpert />
      <div class="big-blank" />
    </div>
    <SecuringFooter
      :next-disabled="disabledValidation"
      @back-click="$router.back()"
      @next-click="nextClick"
    />
  </div>
</template>

<style scoped>
.item {
  position: relative;
  margin-bottom: 1rem;
}

.video-container {
  margin: 0 !important;
  padding: 0 !important;
}

.manipulations {
  background-color: #E3E3FD;
  margin-top: 40px;
  margin-bottom: 24px;
}

:deep(.fr-label) {
  word-wrap: anywhere !important;
  font-size: small;
}

:deep(.fr-radio-rich__pictogram) {
  width: 150% !important;
  height: 150% !important;
}
:deep(.fr-radio-rich__pictogram img){
  height: 100%;
  width: 100%;
}

:deep(.fr-radio-rich__pictogram img, .fr-radio-rich__pictogram svg) {
  max-height: 95%;
  max-width: 95%;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 0.5rem;
  right: .5rem;
}

.zoom-label {
  padding: .5rem;
}

.footer button {
  width: 50%;
}
</style>
