<template>
  <div>
    <HeaderMain />
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
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'ErrorPage',
  components: {
    HeaderMain
  },
  data() {
      return {
          labelButton: "Retour"
      }
  },
  methods: {
      homeRedirect() {
          window.location.replace("/accueil")
      }
  }
}
</script>