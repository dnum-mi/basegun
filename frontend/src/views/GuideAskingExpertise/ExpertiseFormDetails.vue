<template>
  <div class="desc m-1 justify-center">
    <p>Mise en sécurité de l'arme sans catégorie connue :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <fieldset
        id="radio-hint3"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          L'arme est-elle actuellement mise en sécurité ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes"
              v-model="miseEnSecurite"
              type="radio"
              name="radio-hint"
              value="Oui"
            >
            <label
              class="fr-label"
              for="perquisition"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no"
              v-model="miseEnSecurite"
              type="radio"
              name="radio-hint"
              value="Non"
            >
            <label
              class="fr-label"
              for="no"
            >
              Non
            </label>
          </div>
        </div>
        <div
          id="radio-hint-messages"
          class="fr-messages-group"
          aria-live="assertive"
        />
      </fieldset>

      <DsfrInput
        v-model="descriptionArmeNonSecurisee"
        label="Si non, veuillez décrire l'arme"
        label-visible
      />

      <div class="desc m-1 justify-center">
        <p>Raison de l'expertise :</p>
      </div>

      <fieldset
        id="radio-hint2"
        class="fr-fieldset"
        aria-labelledby="radio-hint2-legend"
      >
        <legend
          id="radio-hint2-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          Pourquoi est-il nécessaire de procéder à une expertise sur cette arme ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="identificateWeapon"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Identification de l'arme"
            >
            <label
              class="fr-label"
              for="identificateWeapon"
            >
              Identification de l'arme
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="checkLegality"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Vérification de la légalité"
            >
            <label
              class="fr-label"
              for="checkLegality"
            >
              Vérification de la légalité
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="balisticAnalyse"
              v-model="raisonExpertise"
              type="radio"
              name="radio-hint2"
              value="Analyse balistique"
            >
            <label
              class="fr-label"
              for="balisticAnalyse"
            >
              Analyse balistique
            </label>
          </div>
        </div>
      </fieldset>
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Enregistrer mes informations"
      @click="sendData"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const miseEnSecurite = ref('')
const descriptionArmeNonSecurisee = ref('')
const raisonExpertise = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    miseEnSecurite: miseEnSecurite.value,
    descriptionArmeNonSecurisee: descriptionArmeNonSecurisee.value,
    raisonExpertise: raisonExpertise.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>

</style>
