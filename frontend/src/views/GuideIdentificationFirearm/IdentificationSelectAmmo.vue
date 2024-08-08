<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "@/stores/result";

import TransparentMagazine from "@/assets/guide-identification/photos/semi_auto_militaire_autre/autre-epaule-transparent-magazine.jpg";
import FocusTransparentMagazine from "@/assets/guide-identification/photos/semi_auto_militaire_autre/autre-epaule-transparent-magazine-focus.jpg";
import { TYPOLOGIES } from "@/utils/firearms-utils/index";
import { epaule_a_verrou } from "@/utils/firearms-utils/epaule-a-verrou"; // eslint-disable-line camelcase
import type { pistolet_semi_auto_moderne } from "@/utils/firearms-utils/pistolet-semi-auto-moderne"; // eslint-disable-line camelcase
import type { semi_auto_style_militaire_autre } from "@/utils/firearms-utils/semi-auto-style-militaire-autre"; // eslint-disable-line camelcase
import type { revolver } from "@/utils/firearms-utils/revolver";
import type { epaule_a_pompe } from "@/utils/firearms-utils/epaule-a-pompe";

const store = useStore();

const typology = computed(() => store.typology);

const selectedAmmo = computed({
  get() {
    return store.selectedAmmo;
  },
  set(ammo) {
    store.selectedAmmo = ammo;
  },
});

const zoom = ref("");

const zoomOn = (imgValue: string) => {
  zoom.value = imgValue;
};

const transparentMagazine = [
  "De nombreuses armes factices utilisent des chargeurs transparents simulant la présence de cartouches. Il faut <b>bien vérifier le haut du chargeur pour voir si l’orifice permet de faire rentrer des billes ou des cartouches</b>, comme dans l’exemple ci-dessous.",
];

const showModal = ref(false);

function closeModal() {
  showModal.value = false;
}

function openModal() {
  showModal.value = true;
  store.isModalTransparentAmmoOpened = true;
}

onMounted(() => {
  if (store.isModalTransparentAmmoOpened === undefined) {
    openModal();
  } else {
    showModal.value = false;
  }
});

// eslint-disable-next-line camelcase
type HasDummyOptions =
  | typeof epaule_a_verrou
  | typeof pistolet_semi_auto_moderne
  | typeof semi_auto_style_militaire_autre
  | typeof revolver
  | typeof epaule_a_pompe;
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
                alt="Exemple de magasin transparent factice"
                title="title"
                legend="Exemple de magasin transparent factice"
                ratio="3x4"
              />
              <DsfrPicture
                :src="FocusTransparentMagazine"
                alt="Focus sur la zone à vérifier"
                title="title"
                legend="Focus sur la zone à vérifier"
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
    <p v-if="typology === 'revolver'" class="texte-tuto my-3">
      Sélectionner ce que vous voyez en haut des projectiles
    </p>
    <div v-else>
      <p class="texte-tuto my-3">
        Sélectionner le <span class="font-bold">type de munitions</span> du
        chargeur.
        <span
          v-if="typology === 'semi_auto_style_militaire_autre'"
          @click="openModal()"
        >
          <a class="underline" href="#"> Chargeur transparent ?</a>
        </span>
      </p>
    </div>
    <div>
      <template
        v-for="option in (TYPOLOGIES[typology] as HasDummyOptions)
          ?.dummyOptions"
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
          <div class="zoom" @click="zoomOn(option.value)">
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
                :style="{ 'max-width': '100%' }"
              />
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
  vertical-align: -0.39rem;
}
.zoom {
  background-color: #eee9;
  cursor: zoom-in;
  position: absolute;
  bottom: 1.6rem;
  right: 0.5rem;
}

.zoom-label {
  padding: 0.5rem;
}

:deep(.fr-container) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.fr-content-media) {
  margin: 2.5rem 0.5rem;
}

:deep(.fr-label) {
  word-wrap: anywhere !important;
  font-size: small;
}

:deep(.fr-radio-rich__pictogram) {
  width: 240% !important;
  height: auto;
}
:deep(.fr-radio-rich__pictogram img) {
  height: 100%;
  width: 100%;
}

:deep(.fr-radio-rich__pictogram img, .fr-radio-rich__pictogram svg) {
  max-height: 95%;
  max-width: 95%;
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
