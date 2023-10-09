<script setup>
import { computed, ref, watchEffect } from 'vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { resultTree } from '@/utils/firearms-utils/index.js'

import AskingExpert from '@/components/AskingExpert.vue'
import SecuringFooter from './SecuringFooter.vue'

const props = defineProps({
  step: {
    type: String,
    default: '1',
  },
})
const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)

const selectedOptionStep = computed({
  get () {
    return stepsStore.currentOptionStep[props.step]
  },
  set (option) {
    stepsStore.setOptionStep(props.step, option)
  },
})

const disabledValidation = computed(() => stepsStore.currentOptionStep[props.step] === undefined)

watchEffect(() => {
  console.log(`stepsStore.currentOptionStep[${props.step}]`, stepsStore.currentOptionStep[props.step])
})

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

function updateTypology () {
  if (props.step === '1' && selectedOptionStep.value === 'revolver_black_powder') {
    // Remember if it is a revolver with black powder
    resultStore.updateTypology(selectedOptionStep.value)
  }
}

const nextTo = computed(() => {
  if (typology.value === 'revolver') {
    if (props.step === '1') {
      if (stepsStore.currentOptionStep['1'] === 'revolver_black_powder') {
        return {
          name: 'SecuringAchievement',
        }
      }
      return {
        name: 'SecuringSelectOption',
        params: { step: '2' },
      }
    }
    if (props.step === '2') {
      if (stepsStore.currentOptionStep['2'] !== 'revolver_portiere') {
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

const backTo = computed(() => {
  if (props.step === '1') {
    return { name: 'InstructionsPage' }
  }
  if (props.step === '2') {
    return {
      name: 'SecuringSelectOption',
      params: { step: '1' },
    }
  }
  if (props.step === '3') {
    return {
      name: 'SecuringSelectOption',
      params: { step: '2' },
    }
  }
  return { name: 'InstructionsPage' }
})
</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <h2 class="mt-3 mb-1 text-center">
        Mettre en sécurité mon arme
      </h2>
      <h3 class="text-center my-auto">
        Choix du type d'arme
      </h3>
      <div class="instructions">
        <!-- <p
          class="leading-7 mt-3"
          v-html="typology !== 'revolver' ? resultTree[typology]?.options_text : resultTree[typology]?.[`options_step_${step}_text`]"
        /> -->
      </div>
      <div
        v-if="resultTree[typology]?.[`options_step_${step}_video`]"
      >
        <p v-html="resultTree[typology]?.[`options_step_${step}_video_pre_text`]" />
        <div class="fr-col-sm-6 fr-col-lg-12 mx-auto">
          <div class="fr-content-media relative">
            <video
              class="fr-container video-container"
              autoplay
              controls
              playsinline
              loop
              muted
              :title="resultTree[typology]?.[`options_step_${step}_video_title`]"
              :src="resultTree[typology]?.[`options_step_${step}_video`]"
            />
            <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 1 min</span>
          </div>
          <!-- <p
            class="manipulations -mt-2 p-6"
            v-html="resultTree[typology]?.[`options_step_${step}_video_caption`]"
          /> -->

          <div class="manipulations -mx-8 p-8">
            <ol class="list text-sm">
              <li> Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution</li>
              <li> <span class="font-bold">Tirer le haut du levier de verrouillage</span> du barillet vers l’arrière</li>
              <li> <span class="font-bold">Tirer légèrement le chien/marteau</span> vers l’arrière jusqu’à entendre un premier clic </li>
              <li> Essayez de pousser sur un côté du barillet pour le faire basculer.</li>
            </ol>
          </div>
        </div>
        <p v-html="resultTree[typology]?.[`options_step_${step}_video_post_text`]" />
      </div>
      <div
        v-for="option of (typology !== 'revolver' ? resultTree[typology]?.options : resultTree[typology]?.[`options_step_${step}`])"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOptionStep"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOptionStep"
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
      :back-to="backTo"
      :next-to="nextTo"
      :next-disabled="disabledValidation"
      @next-click="updateTypology()"
    />
  </div>
</template>

<style scoped>
.item {
  position: relative;
  margin-bottom: 1rem;
}

.ov-icon {
  vertical-align: -.39rem;
}

.fr-content-media {
  margin-block: 0.5rem;
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

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
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

:deep(.fr-col-md-8),
:deep(.fr-col-lg-6) {
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
}
.instructions {
  padding-bottom: .5em;
}
.footer button {
width: 50%;
}
</style>
