<script setup>
import { computed, ref } from 'vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

import { useRouter } from 'vue-router'
import { resultats } from '@/utils/securing-firearms-utils.js'

import AskingExpert from '@/views/GuideFactice/AskingExpert.vue'

const router = useRouter()
const resultStore = useResultStore()
const stepsStore = useStepsStore()

const expandedId = ref(undefined)

const typology = computed(() => resultStore.typology)

const selectedOptionStep2 = computed({
  get () {
    return stepsStore.selectedOptionStep2
  },
  set (option) {
    stepsStore.setOptionStep2(option)
  },
})
const selectedOptionStep3 = computed({
  get () {
    return stepsStore.selectedOptionStep3
  },
  set (option) {
    stepsStore.setOptionStep3(option)
  },
})
</script>
<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <h4 class="mt-3 text-center">
        Mettre en sécurité mon arme
      </h4>
      <h5 class="text-center my-auto">
        Manipulations
      </h5>
      <div v-if="typology === 'revolver'">
        <div
          v-if="selectedOptionStep2 === 'revolver_1873_fr'"
        >
          <!-- <div
            class="fr-col-sm-6 fr-col-lg-12 mx-auto"
          >
            <div class="fr-content-media relative">
              <video
                controls
                playsinline
                loop
                muted
                :src="resultats[typology]?.options_step_3[selectedOptionStep3].video"
              />
              <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 3 min</span>
            </div>
          </div>
          <p class="manipulations -mx-8 p-8">
            <ul class="list-none text-sm">
              <li
                v-for="option in resultats[typology].options_step_3[selectedOptionStep3].text_steps"
                :key="option.value"
                class="list-decimal"
                v-html="option"
              />
            </ul>
          </p> -->
          <div>
            <p>Veuillez suivre les indications dans l'ordre afin de mettre en sécurité votre arme</p>
            <DsfrAccordionsGroup>
              <li
                v-for="option, index in resultats[typology]?.options_step_3[selectedOptionStep3].text_steps"
                :key="option.value"
              >
                <DsfrAccordion
                  :id="option.value"
                  :title="'Etape ' + index + ' - durée : ' + option.time"
                  :expanded-id="expandedId"
                  @expand="expandedId = $event"
                >
                  <video
                    autoplay
                    controls
                    playsinline
                    loop
                    muted
                    :src="option.video"
                  />
                  <p
                    class="manipulations -mt-2 p-6"
                    v-html="option.content"
                  />
                  <AskingExpert />
                </DsfrAccordion>
              </li>
            </DsfrAccordionsGroup>
          </div>
        </div>
        <div
          v-else
        >
          <div
            class="fr-col-sm-6 fr-col-lg-12 mx-auto"
          >
            <div class="fr-content-media relative">
              <video
                controls
                playsinline
                loop
                muted
                :src="resultats[typology]?.options_step_2[selectedOptionStep2]?.video"
              />
              <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 3 min</span>
            </div>
          </div>
          <p class="manipulations -mx-8 p-8">
            <ul class="list-none text-sm">
              <li
                v-for="option in resultats[typology]?.options_step_2[selectedOptionStep2]?.text_steps"
                :key="option.value"
                class="list-decimal"
                v-html="option"
              />
            </ul>
          </p>
        </div>
      </div>
      <div v-else>
        <div v-if="resultats[typology]?.options">
          <div
            class="fr-col-sm-6 fr-col-lg-12 mx-auto"
          >
            <div class="fr-content-media relative">
              <video
                controls
                playsinline
                loop
                muted
                :src="resultats[typology]?.options[selectedOptionStep2]?.video"
              />
              <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 3 min</span>
            </div>
          </div>
          <div class="manipulations -mx-8 p-8">
            <ul class="list-none text-sm">
              <li
                v-for="option in resultats[typology].options[selectedOptionStep2]?.text_steps"
                :key="option.value"
                class="list-decimal"
                v-html="option"
              />
            </ul>
          </div>
        </div>
        <div v-else>
          <p>Veuillez suivre les indications dans l'ordre afin de mettre en sécurité votre arme</p>
          <DsfrAccordionsGroup>
            <li
              v-for="option, index in resultats[typology]?.text_steps"
              :key="option.value"
            >
              <DsfrAccordion
                :id="option.value"
                :title="index + ' - ' + option.title + ' - ' + option.time"
                :expanded-id="expandedId"
                @expand="expandedId = $event"
              >
                <p
                  class="manipulations mb-0 p-6"
                  v-html="option.content"
                />
                <video
                  autoplay
                  controls
                  playsinline
                  loop
                  muted
                  :src="resultats[typology]?.video"
                />
              </DsfrAccordion>
            </li>
          </DsfrAccordionsGroup>
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
          label="Suivant"
          :icon-right="true"
          @click="router.push({ name:'SecuringAchievement'})"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-deco {
  margin-bottom: 1em;
  margin-top: 0;
  width: 75%;
}

.warning {
  color : var(--red-marianne-425-625)
}

:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
}
.footer {
background-color: #fff;
box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
width: 50%;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
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
