<template>
  <div class="desc m-1 justify-center">
    <p>Détails sur la saisie de l'arme :</p>
  </div>

  <div class="m-1 justify-center">
    <DsfrInputGroup
      :error-message="errorMessage"
      :valid-message="validMessage"
    >
      <DsfrInput
        v-model="dateSaisie"
        label="Date de la saisie"
        type="date"
        label-visible
      />
      <DsfrInput
        v-model="lieuSaisie"
        label="Lieu de la saisie"
        label-visible
      />
      <div class="fr-select-group">
        <label
          class="fr-label"
          for="select"
        >
          Typologie de l'arme
        </label>
        <select
          id="select"
          v-model="typologieArme"
          class="fr-select"
          name="select"
        >
          <option
            value=""
            selected
            disabled
            hidden
          >
            Sélectionner une option
          </option>
          <option value="Arme de poing">
            Arme de poing
          </option>
          <option value="Arme d'épaule">
            Arme d'épaule
          </option>
        </select>
      </div>
      <DsfrInput
        v-model="descriptionArme"
        label="Description de l'arme"
        label-visible
      />

      <fieldset
        id="radio-hint"
        class="fr-fieldset"
        aria-labelledby="radio-hint-legend radio-hint-messages"
      >
        <legend
          id="radio-hint-legend"
          class="fr-fieldset__legend--regular fr-fieldset__legend"
        >
          Circonstance de la saisie :
        </legend>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="perquisition"
              v-model="circonstanceSaisie"
              type="radio"
              name="radio-hint"
              value="Perquisition"
            >
            <label
              class="fr-label"
              for="perquisition"
            >
              Perquisition
            </label>
          </div>
        </div>
        <div class="fr-fieldset__element">
          <div class="fr-radio-group">
            <input
              id="trouve"
              v-model="circonstanceSaisie"
              type="radio"
              name="radio-hint"
              value="Trouvé"
            >
            <label
              class="fr-label"
              for="trouve"
            >
              Trouvé
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
        v-model="autresDetails"
        label="Autres"
        hint="(à préciser)"
        label-visible
      />
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

const dateSaisie = ref('')
const lieuSaisie = ref('')
const typologieArme = ref('')
const descriptionArme = ref('')
const circonstanceSaisie = ref('')
const autresDetails = ref('')

const emits = defineEmits('updateFormData')

const sendData = () => {
  const formData = {
    dateSaisie: dateSaisie.value,
    lieuSaisie: lieuSaisie.value,
    typologieArme: typologieArme.value,
    descriptionArme: descriptionArme.value,
    circonstanceSaisie: circonstanceSaisie.value,
    autresDetails: autresDetails.value,
  }

  console.log('Données du formulaire:', formData)

  emits('updateFormData', formData)
}
</script>

<style>
</style>
