<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps'
import { arme_alarme as alarmGuns } from '@/utils/firearms-utils/arme-alarme'

import { useResultStore } from '@/stores/result'
const resultStore = useResultStore()

const stepsStore = useStepsStore()
const router = useRouter()

const legend = 'Sélectionner le modèle correspondant à votre arme ou cliquer sur "Aucune correspondance"  :'

const zoom = ref<number|null>(null)

const props = defineProps({
  showDiv: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
})

</script>

<template>
  <div
    v-if="!showDiv"
    data-testid="instruction-armeAlarme"
  >
    <p class="my-4">
      Votre arme<span class="font-bold"> pourrait être une arme d'alarme</span>, nous allons vous guider pour déterminer si c'en est une,
      et ce, <span class="font-bold">grâce aux marquages présents sur l'arme</span>. En cliquant sur le bouton suivant, vous trouverez les <span class="font-bold">13 modèles d'armes d'alarmes reconnues par arrêté</span>.
      Vous pouvez obtenir une vue rapprochée des marquages de chaque modèle en cliquant sur le bouton de zoom.
    </p>
    <p>
      Veuillez <span class="font-bold">sélectionner le modèle correspondant à votre arme</span>, ou bien <span class="font-bold">sélectionner "Aucune correspondance"</span>.
    </p>
    <img
      src="@/assets/guide-identification/photos/arme_alarme/picto.png"
      alt=""
      class="swiper-logo"
    >
  </div>
  <div
    v-else
    class="my-12 relative pb-4"
  >
    <DsfrRadioButtonSet
      :legend="legend"
    >
      <template
        v-for="gun, gunIndex in alarmGuns.options.filter(gun => gun.typology == resultStore.typology)"
        :key="gunIndex"
      >
        <div class="relative">
          <DsfrRadioButton
            v-model="stepsStore.selectedAlarmGun"
            v-bind="gun"
            class="radio"
            :img="gun.img"
            required
            name="armeAlarme"
          />
          <div
            class="zoom"
            @click="zoom = gunIndex"
          >
            <VIcon
              name="ri-zoom-in-line"
              scale="1.25"
              @click="zoom = gunIndex"
            />
            <span class="zoom-label">zoomer</span>
          </div>
          <Teleport to="body">
            <DsfrModal
              title=""
              :opened="zoom === gunIndex"
              @close="zoom = null"
            >
              <img
                v-if="zoom === gunIndex"
                :src="gun.imgZoom"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </template>
    </DsfrRadioButtonSet>
    <DsfrButton
      class="m-1 mb-15 flex justify-center !w-full"
      icon="ri-alert-line"
      label="Aucune correspondance"
      data-testid="aucune-correspondance"
      :icon-right="true"
      @click="router.push({ name:'IdentificationFinalResult'}); stepsStore.selectedAlarmGun = ''"
    />
  </div>
</template>

<style scoped>

.swiper-logo {
  display: block;
  margin: 0 auto;
}

.ov-icon {
  vertical-align: -.39rem;
}

.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 1rem;
  right: .5rem;
}

.zoom-label {
  padding: .5rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-content-media) {
  margin: 2.5rem .5rem;
}

:deep(.fr-label) {
  word-wrap: anywhere !important;
  font-size: small;
}

:deep(.fr-radio-rich__pictogram) {
  width: 240% !important;
  height: auto;
}
:deep(.fr-radio-rich__pictogram img){
  height: 100%;
  width: 100%;
}

:deep(.fr-radio-rich__pictogram img, .fr-radio-rich__pictogram svg) {
  max-height: 95%;
  max-width: 95%;
}

.modal {
  display: flex;
  flex-direction: column;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  background-color: #f5f5fe;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
  padding: 1rem !important;
  margin: auto;
}

</style>
