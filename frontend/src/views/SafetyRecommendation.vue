<template>
  <div class="fr-container">
    <div class="result col-11 col-lg-6 mt-5">
      <h3>
        Vérifier si une arme est factice
      </h3>

      <p class="text-tutorial">
        Vous allez recevoir des instructions pour extraire des munitions de l’arme.
      </p>
      <!-- <DsfrAlert
        title="Attention"
        type="warning"
        description="Une arme doit toujours être considérée comme chargée.
        En cas de doute, s’arrêter et faire appel à un expert.
        Avant de manipuler une arme, toujours s’assurer qu’elle est mise en sécurité.
        Veiller à la préservation des traces et indices éventuels lors des manipulations."
      /> -->
      <div class="fr-alert fr-alert--warning callout">
        <h1 class="fr-alert__title">
          ATTENTION
        </h1>
        <span
          v-for="instruction in instructions"
          :key="instruction.id"
          class="m-auto-lg d-lg-flex flex-wrap"
          v-html="instruction"
        />
      </div>
    </div>
    <div class="blank" />
  </div>
  <div class="footer-background">
    <div
      class="col-11 col-lg-6 footer-actions"
    >
      <DsfrButton
        class="m-1 flex justify-content-center text-nowrap"
        label="Retour au resultat"
        secondary
        @click="goToResults()"
      />

      <DsfrButton
        class="m-1  flex justify-content-center"
        label="Commencer"
        @click="goToTutorial()"
      />
    </div>
  </div>
</template>

<script>
import { store } from '@/store.js'

export default {
  beforeRouteEnter () {
    store.isDisplayHeader = false
  },

  data () {
    return {
      store,
      instructions: [
        '<ul>',
        "<li>Une arme doit toujours être <span class='text-orange'>considérée comme chargée</span>. </li>",
        "<li>En cas de doute, <span class='text-orange'>s’arrêter et faire appel à un expert.</span></li>",
        "<li>Avant de manipuler une arme, toujours s’assurer qu’elle est <span class='text-orange'>mise en sécurité.</span></li>",
        "<li>Veiller à la préservation des <span class='text-orange'>traces et indices </span> éventuels lors des manipulations.</li>",
        '</ul>',
      ],
    }
  },

  methods: {
    goToTutorial () {
      this.$router.push({ name: 'FirearmDirection' }).catch(() => { })
    },
    goToResults () {
      store.isDisplayHeader = true
      this.$router.push({ name: 'Result' }).catch(() => { })
    },
  },
}
</script>

<style>
.result {
  margin: 0 auto;
  max-width: 1000px;
}

.callout {
  padding-left: 5em;
}

.text-orange {
  font-weight: 700;
  color: rgba(179, 64, 0, 1)
}
</style>
