<template>
  <div>
    <div class="fr-col-11 fr-col-lg-6 mt-8 mx-auto">
      <div class="m-1 justify-center pb-30">
        <h5>Liste des comptes experts</h5>
        <DsfrInputGroup>
          <DsfrSelect
            v-model="status"
            label="Statut"
            :options="statusOptions"
            default-unselected-text="Sélectionner un statut"
          />

          <DsfrSearchBar
            v-model="recherche"
            label="Rechercher par nom"
            placeholder="Rechercher"
            :large="true"
          />
        </DsfrInputGroup>
      </div>
    </div>

    <div class="footer">
      <div
        class="fr-col-11 fr-col-lg-6 footer-actions"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          label="Déconnexion"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const statusOptions = ref([
  { text: 'À créer', value: 'À créer' },
  { text: 'Actif', value: 'Actif' },
  { text: 'Inactif', value: 'Inactif' },
])

const status: Ref<string> = ref('')
const recherche: Ref<string> = ref('')

</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .confirm-button {
    font-size: 12px;
  }
}
.questionnaire-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
  width: 50%;
}
.steps-guide {
  margin: auto;
}
:deep(div.fr-stepper__steps) {
  border-radius: 5px 5px 5px 5px;
}
:deep(.fr-stepper__state::after) {
  content: " :\a";
}
:deep(.fr-label) {
  margin-bottom: 12px;
}
.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
  font-weight: bold;
}
.descPhotos {
  border-bottom: 1px solid grey;
  padding-bottom: 8px;
  font-weight: bold;
}
:deep(.required) {
  color:red;
}
.form-submission-status {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
