<template>
  <div class="fr-container">
    <div class="text-center relative top-1/6 m-4">
      <h1>Erreur</h1>
      <p>Une erreur est survenue dans le traitement de votre requête.</p>
      <p>
        Veuillez réessayer ou <router-link :to="{name:'ContactPage'}">
          nous contacter
        </router-link>.
      </p>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>
