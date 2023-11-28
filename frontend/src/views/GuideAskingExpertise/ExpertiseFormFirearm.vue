<script lang="ts" setup>
import { DsfrStepper } from '@gouvminint/vue-dsfr'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const currentStep = 0

</script>

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
        label="Date de la saisie"
        type="date"
        label-visible
      />
      <DsfrInput
        label="Lieu de la saisie"
        label-visible
      />
      <DsfrInput
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
              type="radio"
              name="radio-hint"
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
              type="radio"
              name="radio-hint"
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
        label="Autres"
        hint="(à préciser)"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Enregistrer mes informations"
      @click=""
    />
  </div>
</template>

<style>

</style>
