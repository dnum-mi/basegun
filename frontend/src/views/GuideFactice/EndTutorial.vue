<template>
  <div class="fr-container">
    <div class="centered text-center m-4">
      <h1>Abandon</h1>
      <p>Il n'est pas possible de poursuivre la démarche guidée.</p>
      <p>Ce tutoriel n’est valable que pour les armes à verrou avec chargeur externe.</p>
      <p>Pour plus d'information vous pouvez <a href="/informations"> nous contacter</a>.</p>
      <DsfrButton
        :label="labelButton"
        @click="homeRedirect"
      />
    </div>
  </div>
</template>

<script>
import { store } from '@/store'

export default {
  name: 'EndTutorial',
  components: {
  },
  data () {
    return {
      labelButton: 'Retour',
    }
  },
  methods: {
    homeRedirect () {
      this.$router.push({ name: 'Start' }).catch(() => { })
      store.displayHeader = true
    },
  },
}
</script>
