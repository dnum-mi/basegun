<template>
  <div class="fr-container">
    <div class="text-center m-4">
      <h1>Page non trouvée</h1>
      <p>Vous avez saisi ou suivi un lien vers une page qui n'existe pas.</p>
      <DsfrButton
        :label="labelButton"
        @click="homeRedirect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  components: {
  },
  data () {
    return {
      labelButton: 'Retour',
    }
  },
  methods: {
    homeRedirect () {
      window.location.replace('/accueil')
    },
  },
}
</script>
