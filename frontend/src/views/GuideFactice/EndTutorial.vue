<template>
  <div class="fr-container">
    <div class="centered text-center m-4">
      <!-- <h1>Abandon</h1> -->
      <p>Il n'est pas possible de poursuivre la démarche guidée.</p>
      <p>Votre arme nécessite des manipulations complexes. Veuillez contacter un expert.</p>
      <router-link
        v-slot="{ navigate } "
        :to="{name:'Result'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>
