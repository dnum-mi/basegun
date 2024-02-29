<script lang="ts" setup>
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { useRouter } from 'vue-router'

const router = useRouter()
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
      icon="ri-alert-line"
      label="Contacter un expert"
      @click="showModal = true"
    />
  </div>
  <Teleport to="body">
    <DsfrModal
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
            Contacter un expert
          </h2>
          <p>Sélectionnez ci-dessous votre corps de métier.</p>
          <div>
            <DsfrButton
              class="w-100 m-1"
              label="Police Nationale"
              @click="router.push({ name:'ExpertSituationPN'})"
            />
            <DsfrButton
              class="w-100 m-1"
              label="Gendarmerie Nationale"
              @click="router.push({ name:'ExpertSituationGN'})"
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

.w-100 {
  width: 100% !important;
}

</style>
