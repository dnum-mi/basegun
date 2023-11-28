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
              type="radio"
              name="radio-hint"
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
              type="radio"
              name="radio-hint"
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
        label="Si non, veuillez décrire l'arme"
        label-visible
      />

      <div class="desc m-1 justify-center">
        <p>Raison de l'expertise :</p>
      </div>

      <legend
        id="radio-hint-legend"
        class="fr-fieldset__legend--regular fr-fieldset__legend"
      >
        Pourquoi est-il nécessaire de procéder à une expertise sur cette arme ?
      </legend>
      <div class="fr-fieldset__element">
        <div class="fr-radio-group">
          <input
            id="identificateWeapon"
            type="radio"
            name="radio-hint2"
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
            type="radio"
            name="radio-hint2"
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
            type="radio"
            name="radio-hint2"
          >
          <label
            class="fr-label"
            for="balisticAnalyse"
          >
            Analyse balistique
          </label>
        </div>
      </div>
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
