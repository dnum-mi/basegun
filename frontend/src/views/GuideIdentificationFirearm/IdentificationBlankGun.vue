<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useStepsStore } from '@/stores/steps'
import { arme_alarme as armeAlarme } from '@/utils/firearms-utils/arme-alarme'

const stepsStore = useStepsStore()
const router = useRouter()

const legend = 'Sélectionnez le modèle correspondant à votre arme :'

const zoom = ref('')
const zoomOn = (imgValue: string) => {
  zoom.value = imgValue
}

const resetSelectedArmeAlarme = () => {
  stepsStore.selectedArmeAlarme = undefined
}

</script>

<template>
  <swiper-container
    :navigation="true"
    :pagination="{ clickable: true }"
  >
    <swiper-slide>
      <img
        src="@/assets/basegun_red.png"
        alt=""
        class="swiper-logo"
      >
      <div class="swiper-content">
        <p
          data-testid="instruction-armeAlarme"
          class="my-4"
        >
          Votre arme<span class="swiper-red-highlight"> pourrait être une arme d'alarme</span>, nous allons vous guider pour déterminer si c'en est une,
          et ce, <span class="swiper-red-highlight">grâce aux marquages présents sur l'arme</span>. Voici les <span class="swiper-red-highlight">13 modèles d'armes d'alarmes reconnues par arrêté</span>.
          Vous pouvez obtenir une vue rapprochée des marquages de chaque modèle en cliquant sur le bouton de zoom.
          Veuillez <span class="swiper-red-highlight">sélectionner le modèle correspondant à votre arme</span>, ou bien <span class="swiper-red-highlight">sélectionner "Aucune correspondance"</span>.
        </p>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="swiper-content">
        <div class="my-12 relative pb-4">
          <DsfrRadioButtonSet
            :legend="legend"
          >
            <template
              v-for="option in armeAlarme.options"
              :key="option.value"
            >
              <div class="relative">
                <DsfrRadioButton
                  v-model="stepsStore.selectedArmeAlarme"
                  class="radio"
                  v-bind="option"
                  :img="option.img"
                  required
                  name="armeAlarme"
                />
                <div
                  class="zoom"
                  @click="zoomOn(option.value)"
                >
                  <VIcon
                    name="ri-zoom-in-line"
                    scale="1.25"
                    @click="zoomOn(option.value)"
                  />
                  <span class="zoom-label">zoomer</span>
                </div>
                <Teleport to="body">
                  <DsfrModal
                    title=""
                    class="test"
                    :opened="zoom === option.value"
                    @close="zoom = ''"
                  >
                    <img
                      v-if="zoom === option.value"
                      :src="option.imgZoom"
                      :style="{'max-width': '100%'}"
                    >
                  </DsfrModal>
                </Teleport>
              </div>
            </template>
          </DsfrRadioButtonSet>
          <DsfrButton
            class="fr-btn fr-btn--sm mb-15 flex justify-center"
            icon="ri-alert-line"
            label="Aucune correspondance"
            data-testid="aucune-correspondance"
            :icon-right="true"
            @click="router.push({ name:'IdentificationFinalResult'}); resetSelectedArmeAlarme()"
          />
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>

.swiper-container {
  width: 100%;
  height: 100%;
  position: static;
}

.swiper-slide {
  background: #fff;
}

.swiper-logo {
  display: block;
  margin: 0 auto;
}

.swiper-content {
  width: 75%;
  margin: 0 auto;
  text-align: center;
}

.swiper-ul {
  list-style-position: inside;
  text-indent: -1em;
  padding-left: 1em;
  text-align: left;
  max-width: 700px;
  margin: auto;
  margin-bottom: 12px !important;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  position: fixed;
  top: 57%;
  right: 3%;
  color: var(--blue-france-sun-113-625) !important;
  width :1rem;
}

.swiper-button-prev {
  background-color: #f00 !important;
}

.swiper-button-disabled {
  display: none;
}

.swiper-button-prev {
  background-color: yellow !important;
}

swiper-container::part(pagination) {
  bottom: -.35rem;
}

swiper-container::part(bullet-active) {
  background: var(--blue-france-sun-113-625);
}

.swiper-red-highlight {
  font-weight: bold;
  color: #f00;
}

.swiper-green-highlight {
  font-weight: bold;
  color: #00c7c8;
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

.instructions {
  padding-bottom: .5em;
}

.transparent-mag {
  width: 50%;
  padding: 1rem;
}

.open-info {
  justify-content: end;
}

.warning {
  cursor: pointer;
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
