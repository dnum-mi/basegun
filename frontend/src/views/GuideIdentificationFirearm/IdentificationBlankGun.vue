<script lang="ts" setup>
import { ref, defineProps } from 'vue'

import { useStore } from '@/stores/result'
import { arme_alarme as alarmGuns } from '@/utils/firearms-utils/arme-alarme'

import { TYPOLOGIES } from '@/utils/firearms-utils/index'

const store = useStore()
const typology = TYPOLOGIES[store.typology]

const zoom = ref<number|null>(null)

defineProps<{
  showDiv: boolean
}>()

const alarmGunsOptions = alarmGuns.options.filter(gun => gun.typology === store.typology)

</script>

<template>
  <div
    v-if="!showDiv"
    data-testid="instruction-armeAlarme"
  >
    <p class="my-4">
      Votre arme<span class="font-bold"> pourrait être une arme d'alarme</span>, nous allons vous guider pour déterminer si c'en est une,
      et ce, <span class="font-bold">grâce aux marquages présents sur l'arme</span>. En cliquant sur le bouton suivant, vous trouverez les <span class="font-bold">{{ alarmGunsOptions.length }} modèles de {{ typology.displayLabel.toLowerCase() }} d'alarmes reconnus par arrêté</span>.
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
    class="mt-3 relative pb-20"
  >
    <DsfrRadioButtonSet legend="Sélectionner le modèle correspondant à votre arme ou cliquer sur &quot;Aucune correspondance&quot; :">
      <div
        v-for="gun, gunIndex in alarmGunsOptions"
        :key="gunIndex"
        class="relative"
      >
        <DsfrRadioButton
          v-model="store.selectedAlarmGun"
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
      <div class="relative w-100">
        <div class="fr-fieldset__element">
          <div class="fr-radio-group fr-radio-rich">
            <input
              id="radio-rich-2"
              type="radio"
              name="armeAlarme"
              @input="store.selectedAlarmGun = ''"
            >
            <label
              class="fr-label"
              for="radio-rich-2"
              data-testid="aucune-correspondance"
            >
              Aucune correspondance
            </label>
          </div>
        </div>
      </div>
    </DsfrRadioButtonSet>
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

</style>
