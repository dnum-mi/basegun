<template>
  <div class="text-center relative top-1/6">
    <img
      src="@/assets/basegun.png"
      alt=""
    >
    <h1 class="accueil-title">
      Basegun <label class="fr-tag fr-tag--sm">beta</label>
    </h1>
    <p class="accueil-subtitle">
      Identification automatique des armes à feu
    </p>
    <router-link
      v-slot="{navigate}"
      :to="{name:'StartPage'}"
    >
      <DsfrButton
        class=" w-14rem mb-4 p-2 whitespace-pre-line"
        label="Je veux mettre en sécurité mon arme"
        size="small"
        @click="navigate()"
      />
    </router-link>
    <router-link
      v-slot="{navigate}"
      :to="{name:'Instructions'}"
    >
      <DsfrButton
        class=" w-14rem mb-4 p-2 whitespace-pre-line"
        label="J’ai déjà mis mon arme en sécurité, je veux l’identifier"
        size="small"
        @click="navigate()"
      />
    </router-link>
    <div class="footer footer-up footer-text">
      Basegun est un <span class="font-bold">outil d'aide à la décision</span>.
      Il <span class="font-bold">ne remplace en aucun cas l'avis d'un expert</span>.
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
  }
</style>
