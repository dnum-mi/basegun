<script lang="ts" setup>
import { useResultStore } from '@/stores/result'

const resultStore = useResultStore()
</script>

<template>
  <div class="text-center relative top-1/8">
    <img
      src="@/assets/basegun.png"
      alt=""
    >
    <h1 class="accueil-title">
      Basegun
    </h1>
    <p class="accueil-subtitle">
      Outil d'identification rapide et <br>
      de mise en sécurité des armes à feu
    </p>
    <div>
      <DsfrButton
        class="w-14rem mb-4 p-2 whitespace-pre-line"
        data-testid="secure-firearm"
        label="Je veux mettre en sécurité mon arme"
        size="small"
        @click="
          $router.push({ name: 'SecuringRecommendations'});
          resultStore.$patch({ securingTutorial: true });
        "
      />
    </div>
    <div>
      <DsfrButton
        class="w-14rem mb-4 p-2 whitespace-pre-line"
        data-testid="identification"
        label="J’ai déjà mis mon arme en sécurité, je veux l’identifier"
        size="small"
        @click="
          $router.push({ name: 'InstructionsPage'});
          resultStore.$patch({ securingTutorial: false });
        "
      />
    </div>
  </div>
</template>

<style scoped>
.accueil-title {
  margin-top: -20px;
  margin-bottom: 0;
}

.accueil-subtitle {
  font-size: 14px;
  line-height: normal;
}
</style>
