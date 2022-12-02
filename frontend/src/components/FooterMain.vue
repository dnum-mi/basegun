<template>
  <footer class="footer-background">
    <!-- Footer Home -->
    <div
      v-if="store.isHome"
      class="footer-home footer-text"
    >
      Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
    </div>
    <!-- Footer Result -->
    <div 
      v-else-if="store.img" 
      class="footer-actions"
    >
      <DsfrButton 
        class="m-1 flex justify-content-center"
        icon="ri-camera-fill"
        label="Reprendre une photo"
        @click="resetSearch()"
      />
    </div>
    <div 
      v-else 
      class="footer-actions"
    >
      <DsfrButton
        class="m-1 flex justify-content-center"
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
  </footer>
</template>

<script>
import { store } from '@/store.js';

export default {
  name: 'ResultsComponent',

  data() {
    return {
      store,
    }
  },

  methods: {
    resetSearch() {
      // TODO: Réinitialiser les données de la recherche
      window.location.replace('/accueil');
    },
    goToTutorial() {
      this.$router.push({name:'FirearmDirection'}).catch(() => {})
    },
    goToResults() {
      store.isDisplayHeader = true
      this.$router.push({name:'Results'}).catch(() => {})
    },
  },
}
</script>
