<template>
  <div class="fr-col-sm-6 fr-col-lg-12 fr-container">
    <div class="centered text-center fr-m-4">
      <h1>Fin de la démarche guidée</h1>

      <p>Votre arme nécessite des manipulations complexes. </p>
      <p>
        Veuillez contacter un expert en manipulations d'armes d'épaule à verrou.<br>
        Dans le doute, veuillez considérer votre arme comme pouvant tirer des projectiles létaux.
      </p>
      <router-link
        v-slot="{ navigate }"
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
