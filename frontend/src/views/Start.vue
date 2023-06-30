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
      :to="{name:'Instructions'}"
    >
      <DsfrButton
        data-testid="start"
        label="Démarrer"
        @click="navigate()"
      />
    </router-link>
    <div class="footer footer-up footer-text">
      Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
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
