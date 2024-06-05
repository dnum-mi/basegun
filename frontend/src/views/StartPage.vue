<script lang="ts" setup>
import { useStore } from '@/stores/result'

const store = useStore()
</script>

<template>
  <div class="text-center relative top-1/8">
    <img
      src="@/assets/basegun_long.png"
      class="mb-10"
      height="55"
      alt=""
    >
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
          $router.push({ name: 'GuideSecuringFirearm'});
          store.$patch({ securingTutorial: true });
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
          store.$patch({ securingTutorial: false });
        "
      />
    </div>
  </div>
</template>

<style scoped>
.accueil-subtitle {
  font-size: 14px;
  line-height: normal;
}
</style>
