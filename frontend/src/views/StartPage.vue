<script setup>
import { computed } from 'vue'
import { useResultStore } from '@/stores/result.js'

const resultStore = useResultStore()

const securingTutorial = computed({
  get () {
    return resultStore.securingTutorial
  },
  set (value) {
    resultStore.setSecuringTutorial(value)
  },
})

</script>

<template>
  <div class="text-center relative top-1/8">
    <img
      src="@/assets/basegun.png"
      alt=""
    >
    <h1 class="accueil-title">
      Basegun <label class="fr-tag fr-tag--sm">beta</label>
    </h1>
    <p class="accueil-subtitle">
      Outil d'identification rapide et <br> de mise en sécurité des armes à feu
    </p>
    <div class="inline-grid">
      <router-link
        v-slot="{navigate}"
        :to="{name:'SecuringRecommendations'}"
      >
        <DsfrButton
          class=" w-14rem mb-4 p-2 whitespace-pre-line"
          data-testid="secure-firearm"
          label="Je veux mettre en sécurité mon arme"
          size="small"
          @click="navigate(); securingTutorial = true"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'InstructionsPage'}"
      >
        <DsfrButton
          class=" w-14rem mb-4 p-2 whitespace-pre-line"
          data-testid="identification"
          label="J’ai déjà mis mon arme en sécurité, je veux l’identifier"
          size="small"
          @click="navigate(); securingTutorial = false"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .accueil-title {
    font-size: 28px;
    margin-top: -20px;
    margin-bottom: 0;
  }

  .accueil-subtitle {
    font-size: 14px;
    line-height: normal;
  }
</style>
