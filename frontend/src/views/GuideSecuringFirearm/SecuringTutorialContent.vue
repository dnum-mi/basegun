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

const selectedOption = computed({
  get () {
    return stepsStore.selectedOption
  },
  set (option) {
    stepsStore.setOption(option)
  },
})
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
      <div v-if="resultats[typology]?.options">
        <p class="manipulations -mx-8 p-6">
          <ul class="list-none text-sm">
            <li
              v-for="option in resultats[typology].options[selectedOption].text_steps"
              :key="option.value"
              v-html="option"
            />
          </ul>
        </p>
        <div
          class="fr-col-sm-6 fr-col-lg-12 mx-auto"
        >
          <div class="fr-content-media">
            <video
              autoplay
              controls
              playsinline
              loop
              muted
              :src="resultats[typology]?.options[selectedOption].video"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <p>Veuillez suivre les indications dans l'ordre afin de mettre en sécurité votre arme</p>
        <DsfrAccordionsGroup>
          <li
            v-for="option in resultats[typology].text_steps"
            :key="option.value"
          >
            <DsfrAccordion
              :id="option.value"
              :title="option.value"
              :expanded-id="expandedId"
              @expand="expandedId = $event"
            >
              <p
                class="manipulations mb-0 p-6"
                v-html="option"
              />
              <video
                autoplay
                controls
                playsinline
                loop
                muted
                :src="resultats[typology].video"
              />
            </DsfrAccordion>
          </li>
        </DsfrAccordionsGroup>
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
  color: #000091;
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

video {
  width: 100% !important;
  height: auto !important;
}

.manipulations {
  background-color: #E3E3FD;
}
</style>
