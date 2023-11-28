<script lang="ts" setup>
import { DsfrStepper } from '@gouvminint/vue-dsfr'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const stepsStore = useStepsStore()
const router = useRouter()

</script>

<template>
  <div class="desc m-1 justify-center">
    <p>Informations générales :</p>
  </div>

  <div class="m-1 justify-center">
    <form @submit.prevent="submitForm">
      <DsfrInputGroup>
        <DsfrInput
          v-model="name"
          label="Nom"
          label-visible
        />
        <DsfrInput
          v-model="prenom"
          label="Prénom"
          label-visible
        />
        <DsfrInput
          label="Service d'affectation"
          label-visible
        />
        <DsfrInput
          label="Numéro de téléphone"
          hint="Format attendu : (+33) 1 22 33 44 55"
          label-visible
        />
        <DsfrInput
          id="adresse"
          label="Adresse électronique"
          hint="Format attendu : nom@domaine.fr"
          label-visible
        />
      </DsfrInputGroup>

      <DsfrButton
        type="submit"
        class="m-1 flex justify-center w-80"
        label="Enregistrer mes informations"
        @click=""
      />
    </form>
  </div>
</template>

<style scoped>

.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}

.footer button {
  width: 50%;
}

.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
}

</style>
