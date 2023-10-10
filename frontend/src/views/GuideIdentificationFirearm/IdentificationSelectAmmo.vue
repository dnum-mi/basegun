<script setup>
import { ref, computed, onMounted } from 'vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

import TransparentMagazine from '@/assets/guide-identification/photos/semi_auto_militaire_autre/autre-epaule-transparent-magazine.jpg'
import FocusTransparentMagazine from '@/assets/guide-identification/photos/semi_auto_militaire_autre/autre-epaule-transparent-magazine-focus.jpg'
import { resultTree } from '@/utils/firearms-utils/index.js'

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
          <a
            class="underline"
            href="#"
          > Chargeur transparent ?</a>
        </span>
      </p>
    </div>
    <div>
      <template
        v-for="option of resultTree[typology]?.guideFactice"
        :key="option.value"
      >
        <div class="item">
          <DsfrRadioButton
            v-model="selectedAmmo"
            class="radio"
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
  bottom: 1.6rem;
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
