<script setup>
import { ref, computed, onMounted } from 'vue'

import { guideFacticeSelectAmmo } from '@/utils/firearms-utils'
import AskingExpert from './AskingExpert.vue'

import { useStepsStore } from '@/stores/steps.js'
import { useResultStore } from '@/stores/result.js'

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

const showModal = ref(false)

function closeModal () {
  showModal.value = false
}

function openModal () {
  showModal.value = true
  useStepsStore.isOpened = true
}

onMounted(() => {
  if (useStepsStore.isOpened === undefined) {
    openModal()
  } else { showModal.value = false }
})

</script>

<template>
  <div>
    <Teleport to="body">
      <DsfrModal
        v-if="typology === 'autre_epaule'"
        title=""
        :opened="showModal"
        @close="closeModal()"
      >
        <div class="modale">
          <div class="modale-contenu">
            <DsfrAlert
              type="warning"
              title="Avertissement cartouche factice"
              description="De nombreuses armes factices utilisent des chargeurs transparents simulant la présence de cartouches. Il faut bien vérifier le haut du chargeur pour voir si l’orifice permet de faire rentrer des billes ou des cartouches, comme dans l’exemple ci-dessous "
            />
            <div class="d-flex">
              <DsfrPicture
                :src="`/guide-factice/images/${typology}/autre-epaule-transparent-magazine.jpg`"
                alt="exemple de magasin transparent"
                title="title"
                legend="exemple de magasin transparent"
                ratio="3x4"
              />
              <DsfrPicture
                :src="`/guide-factice/images/${typology}/autre-epaule-transparent-magazine-focus.jpg`"
                alt="focus sur la zone à vérifier"
                title="title"
                legend="focus sur la zone à vérifier"
                ratio="3x4"
              />
            </div>
          </div>
          <div class="modale-footer">
            <DsfrButton
              class="full"
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
      class="mt-3"
    >
      Sélectionner ce que vous voyez en haut des projectiles
    </p>
    <p
      v-else
      class="mt-3"
    >
      Sélectionner le type de munition du chargeur<span
        v-if="typology === 'autre_epaule'"
        @click="openModal()"
      >. <a
        href="#"
      >
        Chargeur transparent ?</a>
      </span>
    </p>
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
            :img="`/guide-factice/images/${typology}/${option.img_ammo}`"
            required
            name="selectedAmmo"
          />
          <VIcon
            class="zoom"
            name="ri-zoom-in-line"
            scale="1.25"
            @click="zoomOn(option.value)"
          />
          <Teleport to="body">
            <DsfrModal
              title=""
              class="test"
              :opened="zoom === option.value"
              @close="zoom = ''"
            >
              <img
                v-if="zoom === option.value"
                :src="`/guide-factice/images/${typology}/${option.img_ammo}`"
                :style="{'max-width': '100%'}"
              >
            </DsfrModal>
          </Teleport>
        </div>
      </template>
    </div>
    <p v-if="typology !== 'revolver'">
      <i>Si le chargeur est vide, regarder l’emplacement des munitions : peut-il contenir des cartouches ou des billes ?</i>
    </p>
    <AskingExpert />
    <div class="blank" />
  </div>
</template>

<style scoped>

.item {
  position: relative;
  padding-bottom: 2em;
}

.zoom {
  position: absolute;
  top: 0.125em;
  right: 0.125em;
  background-color: #eee9;
  cursor: zoom-in;
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
  padding-bottom: 2em;
}

.transparent-mag {
  width: 50%;
  padding: 1rem;
}

.open-info {
  justify-content: end;
}

/* .open-info svg {
  margin-top: 1rem;
  fill: #ff1d1d;
  cursor: pointer;
} */

.warning {
  cursor: pointer;
}

.modale {
  display: flex;
  flex-direction: column;
}

.modale-contenu {
  flex: 1;
  overflow-y: auto;
}

.modale-footer {
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: #f5f5fe;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
  padding: 15px !important;
  width: 100%;
}

</style>
