<template>
  <div class="fr-container">
    <div class="centered text-center m-4">
      <h1>Abandon</h1>
      <p>Il n'est pas possible de poursuivre la démarche guidée.</p>
      <p>Ce tutoriel n’est valable que pour les armes à verrou avec chargeur externe.</p>
      <p>Pour plus d'information vous pouvez <a href="/informations"> nous contacter</a>.</p>
      <router-link
        v-slot="{ navigate } "
        :to="{name:'Start'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>
