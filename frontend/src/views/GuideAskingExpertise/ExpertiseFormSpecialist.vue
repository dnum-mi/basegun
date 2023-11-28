<template>
  <div class="desc m-1 justify-center">
    <p>Demande de contact avec un spécialiste :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <fieldset
        id="radio-hint"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          Souhaitez-vous être mis en contact avec un spécialiste en arme à feu pour cette expertise ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes2"
              v-model="contactSpecialiste"
              type="radio"
              name="radio-hint3"
              value="Oui"
            >
            <label
              class="fr-label"
              for="yes"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no2"
              v-model="contactSpecialiste"
              type="radio"
              name="radio-hint3"
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
        v-model="typeSpecialiste"
        label="Si oui, précisez le type de spécialiste"
        label-visible
      />

      <fieldset
        id="radio-hint2"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          La demande est-elle urgente ?
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="yes3"
              v-model="demandeUrgente"
              type="radio"
              name="radio-hint4"
              value="Oui"
            >
            <label
              class="fr-label"
              for="yes3"
            >
              Oui
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="no3"
              v-model="demandeUrgente"
              type="radio"
              name="radio-hint4"
              value="Non"
            >
            <label
              class="fr-label"
              for="no3"
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
        v-model="raisonUrgence"
        label="Si oui, veuillez expliquer la raison de l'urgence"
        :disabled="disabledValidation"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Validez"
      @click="sendData"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const contactSpecialiste = ref('')
const typeSpecialiste = ref('')
const demandeUrgente = ref('')
const raisonUrgence = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    contactSpecialiste: contactSpecialiste.value,
    typeSpecialiste: typeSpecialiste.value,
    demandeUrgente: demandeUrgente.value,
    raisonUrgence: raisonUrgence.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>

</style>
