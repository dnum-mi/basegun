<template>
  <div>
    <div class="desc m-1 justify-center">
      <p>Informations générales :</p>
    </div>

    <div class="m-1 justify-center">
      <form @submit.prevent="submitForm">
        <DsfrInputGroup>
          <DsfrInput
            v-model="nom"
            label="Nom"
            label-visible
          />
          <DsfrInput
            v-model="prenom"
            label="Prénom"
            label-visible
          />
          <DsfrInput
            v-model="RIOMatricule"
            label="RIO / Matricule"
            label-visible
          />
          <DsfrInput
            v-model="serviceAffectation"
            label="Service d'affectation"
            label-visible
          />
          <DsfrInput
            v-model="numeroTelephone"
            label="Numéro de téléphone"
            hint="Format attendu : (+33) 1 22 33 44 55"
            label-visible
          />
          <DsfrInput
            id="adresse"
            v-model="adresseElectronique"
            label="Adresse électronique"
            hint="Format attendu : nom@domaine.fr"
            label-visible
          />
        </DsfrInputGroup>

        <DsfrButton
          type="submit"
          class="m-1 flex justify-center w-80"
          label="Enregistrer mes informations"
          @click="sendData"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const nom = ref('')
const prenom = ref('')
const RIOMatricule = ref('')
const serviceAffectation = ref('')
const numeroTelephone = ref('')
const adresseElectronique = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    nom: nom.value,
    prenom: prenom.value,
    RIOMatricule: RIOMatricule.value,
    serviceAffectation: serviceAffectation.value,
    numeroTelephone: numeroTelephone.value,
    adresseElectronique: adresseElectronique.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}

const submitForm = () => {
  console.log('Formulaire soumis avec succès')
}
</script>

<style scoped>
</style>
