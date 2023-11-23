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
      title=""
      :opened="showModal"
      @close="onClose()"
    >
      <div class="modal">
        <div class="modal-content" />
        <h2>
          <VIcon
            name="ri-arrow-right-line"
            scale="1.5"
          />
          Contact à un expert arme
        </h2>
        <p>
          Sélectionnez ci-dessous votre corps de métier <br>
        </p>
        <div>
          <div class="fr-col-11 fr-col-lg-6 mx-auto">
            <DsfrButton
              class="m-1 flex justify-center w-80"
              label="Police Nationale"
              @click="router.push({ name:'ExpertSituationPN'})"
            />
            <DsfrButton
              class="m-1 flex justify-center w-80"
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

</style>
