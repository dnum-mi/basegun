<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const showModal = ref(false);

function onClose() {
  showModal.value = false;
}
</script>

<template>
  <div class="text-center">
    <DsfrButton
      class="m-1 flex justify-center"
      href="#"
      icon="ri-alert-line"
      label="Contacter un expert"
      @click="showModal = true"
    />
  </div>
  <Teleport to="body">
    <DsfrModal :opened="showModal" @close="onClose()">
      <div class="modal">
        <div class="modal-content">
          <div class="fr-modal__title fr-mb-2w">
            <VIcon name="ri-arrow-right-line" scale="1.5" />
            Contacter un expert
          </div>
          <p>Sélectionnez ci-dessous votre corps de métier.</p>
          <div>
            <DsfrButton
              class="w-100 m-1"
              label="Police Nationale"
              :disabled="true"
              @click="router.push({ name: 'ExpertSituationPN' })"
            />
            <DsfrButton
              class="w-100 m-1"
              label="Gendarmerie Nationale"
              @click="router.push({ name: 'ExpertSituationGN' })"
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
</style>
