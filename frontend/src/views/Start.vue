<template>
  <div class="centered">
    <div class="text-center">
      <img
        src="../assets/basegun.png"
        alt=""
      >
      <h1 class="accueil-title">
        Basegun <label class="fr-tag fr-tag--sm">beta</label>
      </h1>
      <p class="accueil-subtitle">
        Identification automatique des armes à feu
      </p>
      <DsfrButton
        label="Démarrer"
        @click="showInstruction"
      />
    </div>
    <div class="footer-background footer-text">
      Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
    </div>
  </div>
</template>

<script>
import { store } from '@/store.js'

export default {
  name: 'Start',
  components: {
  },

  beforeRouteLeave () {
    store.uploadMessage = null
    store.displayHeader = true
  },

  data () {
    return {
      store,
    }
  },

  methods: {
    showInstruction () {
      localStorage.clear()
      this.$router.push({ name: 'Instructions' }).catch(() => {})
    },
  },
}
</script>

<style scoped>
  .accueil-title {
    font-size: 28px;
    margin-top: -20px;
    margin-bottom: 0;
  }

  .accueil-subtitle {
    font-size: 14px;
  }

  .footer-text {
    box-shadow: none;
  }
</style>
