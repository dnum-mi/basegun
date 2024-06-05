<script lang="ts" setup>
import { useStore } from '@/stores/result'
import semiAutoMilitairePistoletMitralleurVideoS from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_uzi_surete.mp4'
import epauleAVerrouVideoS from '@/assets/guide-mise-en-securite/videos/epaule_a_verrou/epaule_verrou_surete.mp4'

const store = useStore()
const typology = computed(() => store.typology)
const showModal = ref(false)

function onClose () {
  showModal.value = false
}

</script>
<template>
  <div class="text-center">
    <DsfrButton
      class="m-1 flex justify-center"
      href="#"
      icon="ri-lock-line"
      label="Si le levier est bloqué, cliquer ici"
      @click="showModal = true"
    />
  </div>
  <Teleport to="body">
    <DsfrModal
      title=""
      :opened="showModal"
      @close="onClose()"
    >
      <div class="modal">
        <div class="modal-content">
          <div class="fr-modal__title fr-mb-2w">
            <VIcon
              name="ri-arrow-right-line"
              scale="1.5"
            />
            Le levier est bloqué ?
          </div>
          <div v-if="typology === 'semi_auto_style_militaire_autre'">
            <div class="fr-content-media relative">
              <video
                controls
                playsinline
                muted
                :src="semiAutoMilitairePistoletMitralleurVideoS"
                data-testid="video-tutoriel"
              />
              <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 12 sec</span>
            </div>
            <div class="manipulations -mx-1 p-5">
              <ol class="list text-sm">
                <li> Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution</li>
                <li> <span class="font-bold">Appuyer sur la pédale de sûreté</span> située sur l'arrière afin de pouvoir manipuler le levier</li>
              </ol>
            </div>
          </div>
          <div v-else>
            <div class="fr-content-media relative">
              <video
                controls
                playsinline
                muted
                :src="epauleAVerrouVideoS"
                data-testid="video-tutoriel"
              />
              <span class="absolute -bottom-1.5rem right-0 text-sm">Environ 15 sec</span>
            </div>
            <div class="manipulations -mx-1 p-5">
              <ol class="list text-sm">
                <li> Observer l’arme en l’orientant dans une <span class="font-bold">direction sans risque</span>, en manipulant avec précaution</li>
                <li> <span class="font-bold">Faites basculer le levier de sûreté</span> situé à la base du levier de culasse pour le débloquer</li>
              </ol>
            </div>
          </div>
          <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
            <DsfrButton
              class="m-1 flex justify-center"
              icon="ri-arrow-left-line"
              label="Précédent"
              @click="onClose()"
            />
          </div>
        </div>
      </div>
    </DsfrModal>
  </Teleport>
</template>
<style scoped>

:deep(.fr-btn) span {
  margin: auto !important;
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
  text-align: center;
  background-color: #f5f5fe;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
  padding: 1rem !important;
  width: 100%;
}
.modal-footer button {
  width: 100%;
}

video {
  width: 100% !important;
  height: auto !important;
}

.manipulations {
  background-color: #E3E3FD;
  margin-top: 40px;
  margin-bottom: 24px;
  margin-right: 0;
}
</style>
