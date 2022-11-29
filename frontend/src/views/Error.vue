<template>
  <div class="fr-container">
    <div class="text-center m-4">
      <h1>Erreur</h1>
      <p>Une erreur est survenue dans le traitement de votre requête.</p>
      <p>Veuillez réessayer ou <a href="/informations"> nous contacter</a>.</p>
      <DsfrButton
        :label="labelButton"
        @click="homeRedirect"
      />  
    </div>
  </div>
</template>

<script>


export default {
  name: 'ErrorPage',
  components: {
  },
  data() {
      return {
          labelButton: "Retour",
      }
  },
  methods: {
      homeRedirect() {
          window.location.replace("/accueil")
      },
  },
}
</script>