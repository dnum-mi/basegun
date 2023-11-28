<script lang="ts" setup>
import { DsfrStepper } from '@gouvminint/vue-dsfr'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const currentStep = 0
const showModal = ref(false)
function onClose () {
  showModal.value = false
}

</script>

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
              type="radio"
              name="radio-hint3"
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
              type="radio"
              name="radio-hint3"
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
              type="radio"
              name="radio-hint4"
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
              type="radio"
              name="radio-hint4"
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
        label="Si oui, veuillez expliquer la raison de l'urgence"
        :disabled="disabledValidation"
        label-visible
      />
    </DsfrInputGroup>

    <DsfrButton
      class="m-1 flex justify-center w-80"
      label="Validez"
      @click="showModal = true"
    />

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
              name="ri-git-repository-fill"
              scale="1.5"
            />
            Envoi du formulaire
          </h2>
          <div>
            <div class="fr-col-11 fr-col-lg-6 mx-auto">
              <p>
                Votre formulaire a été reçu avec succès. Nous confirmons la prise en compte de votre demande. <br>
              </p>
            </div>
            <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
              <router-link
                v-slot="{navigate}"
                class="navigate"
                :to="{name: 'StartPage'}"
              >
                <DsfrButton
                  class="m-1 flex justify-center"
                  icon="ri-home-4-line"
                  label="Retour à l'accueil"
                  @click="navigate()"
                />
              </router-link>
            </div>
          </div>
        </div>
      </DsfrModal>
    </Teleport>
  </div>
</template>

<style>

</style>
