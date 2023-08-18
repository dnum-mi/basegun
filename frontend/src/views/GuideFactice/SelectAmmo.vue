<script setup>
import { ref, computed, onMounted } from 'vue'

import { guideFacticeSelectAmmo } from '@/utils/firearms-utils'
import AskingExpert from './AskingExpert.vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

import TransparentMagazine from '@/assets/guide-factice/images/autre_epaule/autre-epaule-transparent-magazine.jpg'
import FocusTransparentMagazine from '@/assets/guide-factice/images/autre_epaule/autre-epaule-transparent-magazine-focus.jpg'

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)

const selectedAmmo = computed({
  get  () {
    return stepsStore.selectedAmmo
  },
  set (ammo) {
    stepsStore.setAmmo(ammo)
  },
})

const zoom = ref('')

const zoomOn = (imgValue) => {
  zoom.value = imgValue
}

const transparentMagazine = ['De nombreuses armes factices utilisent des chargeurs transparents simulant la présence de cartouches. Il faut <b>bien vérifier le haut du chargeur pour voir si l’orifice permet de faire rentrer des billes ou des cartouches</b>, comme dans l’exemple ci-dessous.']

const showModal = ref(false)

function closeModal () {
  showModal.value = false
}

function openModal () {
  showModal.value = true
  useStepsStore.isModalTransparentAmmoOpened = true
}

onMounted(() => {
  if (useStepsStore.isModalTransparentAmmoOpened === undefined) {
    openModal()
  } else { showModal.value = false }
})
</script>

<template>
  <div>
    <Teleport to="body">
      <DsfrModal
        v-if="typology === 'semi_auto_style_militaire_autre'"
        title=""
        :opened="showModal"
        @close="closeModal()"
      >
        <div class="modal">
          <div class="modal-content">
            <div class="fr-alert fr-alert--warning">
              <h3>Avertissement cartouches factices</h3>
              <p v-html="transparentMagazine" />
            </div>
            <div class="flex">
              <DsfrPicture
                :src="TransparentMagazine"
                alt="exemple de magasin transparent factice"
                title="title"
                legend="exemple de magasin transparent factice"
                ratio="3x4"
              />
              <DsfrPicture
                :src="FocusTransparentMagazine"
                alt="focus sur la zone à vérifier"
                title="title"
                legend="focus sur la zone à vérifier"
                ratio="3x4"
              />
            </div>
          </div>
          <div class="modal-footer">
            <DsfrButton
              class="w-full text-sm"
              label="Oui, c'est clair, je poursuis le tutoriel"
              icon-right
              icon="ri-arrow-right-line"
              @click="closeModal()"
            />
          </div>
        </div>
      </DsfrModal>
    </Teleport>
    <p
      v-if="typology === 'revolver'"
      class="texte-tuto my-3"
    >
      Sélectionner ce que vous voyez en haut des projectiles
    </p>
    <div
      v-else
    >
      <p class="texte-tuto my-3">
        Sélectionner le <span class="font-bold">type de munitions</span> du chargeur.
        <span
          v-if="typology === 'semi_auto_style_militaire_autre'"
          @click="openModal()"
        >
          <a href="#"> Chargeur transparent ?</a>
        </span>
      </p>
    </div>
    <div>
      <template
        v-for="option of guideFacticeSelectAmmo[typology]"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedAmmo"
            class="radio"
            :class="{ 'wide': typology === 'epaule_a_verrou' }"
            v-bind="option"
            :img="option.img_ammo"
            required
            name="selectedAmmo"
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
                :src="option.img_ammo"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </template>
    </div>
  </div>
  <p v-if="typology !== 'revolver'">
    <i>Si le <span class="font-bold">chargeur</span> est <span class="font-bold">vide, regarder l’emplacement des munitions</span> : peut-il contenir des cartouches ou des billes ?</i>
  </p>
  <AskingExpert />
  <div class="big-blank" />
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
  right: 2.5rem;
}

.zoom-label {
  right: -6rem;
  bottom: 0;
  padding: 0 .25rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-content-media) {
  margin: 2.5rem .5rem;
}

:deep(.fr-radio-rich input[type="radio"] + label) {
  height: 13rem;
}

:deep(.radio > .fr-radio-rich__img){
  height: 12.5rem;
  width: 8.25rem;
}

:deep(.radio > .fr-radio-rich__img img){
  width: 8rem;
  max-width: unset;
}

:deep(.wide > .fr-radio-rich__img){
  width: 13.25rem !important;
}

:deep(.wide > .fr-radio-rich__img img){
  width: 13rem;
}

:deep(.fr-radio-rich input[type="radio"] + label){
  white-space: pre-wrap;
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
