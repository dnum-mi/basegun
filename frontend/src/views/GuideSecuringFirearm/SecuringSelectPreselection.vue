<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'
import { resultats } from '@/utils/securing-firearms-utils.js'

import AskingExpert from '@/views/GuideFactice/AskingExpert.vue'

const router = useRouter()

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)
const selectedOption = computed({
  get () {
    return stepsStore.selectedOption
  },
  set (option) {
    stepsStore.setOption(option)
  },
})

const disabledValidation = computed(() => stepsStore.selectedOption === undefined)

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

function goToNextRoute () {
  selectedOption.value === 'revolver_black_powder'
    ? router.push({ name: 'FinalResult' }).catch(() => {})
    : router.push({ name: 'SecuringSelectOption' }).catch(() => {})
}

</script>

<template>
  <div class="mx-auto fr-col-11 fr-col-lg-6 flex justify-between">
    <div class="fr-container m-5">
      <router-link
        :to="{ name: 'StartPage' }"
      >
        <VIcon
          class="absolute right-3 fr-icon-home-3-line"
          name="ri-home-3-line"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mt-12 mx-auto">
      <h4 class="mt-3">
        Mettre en sécurité mon arme
      </h4>
      <div class="instructions">
        <p
          class="leading-7 mt-3"
          v-html="resultats[typology].textOptions"
        />
      </div>
      <div
        v-for="option of resultats[typology]?.pre_select"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedOption"
            v-bind="option"
            :img="option.img"
            required
            name="selectedOption"
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
    <div class="footer">
      <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="router.push({ name:'Instructions'})"
        />
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          :disabled="disabledValidation"
          label="Suivant"
          :icon-right="true"
          @click="goToNextRoute()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  position: relative;
  padding-bottom: 1em;
}

.ov-icon {
  vertical-align: -.39rem;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 1.25rem;
  right: 7.5rem;
}

.zoom-label {
  padding: 0 .25rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-radio-rich__img){
  width: var(--select-option-image-width)+.25rem; /* cf. variable in main.css */
  height: 8rem;
}

:deep(.fr-radio-rich__img img){
  width: var(--select-option-image-width);
  height: 8rem;
  max-width: unset;
}

:deep(.fr-radio-rich input[type="radio"] + label){
  font-size: smaller;
  align-items: flex-start;
  min-height: 8.5rem;
  padding-right: 13.5rem;
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
