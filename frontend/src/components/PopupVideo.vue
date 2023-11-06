<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import semiAutoMilitairePistoletMitralleurVideoS from '@/assets/guide-mise-en-securite/videos/semi_auto_militaire_autre/semi_auto_mil_uzi_surete.mp4'

const stepsStore = useStepsStore()
const resultStore = useResultStore()

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
          <h2>
            <VIcon
              name="ri-arrow-right-line"
              scale="1.5"
            />
            Le levier est bloqué ?
          </h2>

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
</style>
