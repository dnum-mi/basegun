<template>
  <div>
    <img
      src="@/assets/basegun_green.png"
      alt=""
      class="w-1\/3"
    >
    <div class="onboarding-content">
      <ul class="onboarding-ul fr-text--sm">
        <li class="mb-2">
          Basegun est une application <span class="onboarding-green-highlight">prototype</span> en cours de développement par le Ministère de l’Intérieur et des Outre-Mer.
        </li>
        <li class="mb-2">
          A ce jour, Basegun <span class="onboarding-green-highlight">permet</span> d'identifier uniquement des <span class="onboarding-green-highlight">armes à feu létales</span> et des<span class="onboarding-green-highlight"> armes factices type airsoft</span>.
        </li>
        <li class="mb-2">
          Basegun propose également de les <span class="onboarding-green-highlight">mettre en sécurité</span> grâce à des <span class="onboarding-green-highlight">tutoriels personnalisés</span>.
        </li>
      </ul>
    </div>
    <router-link
      v-slot="{navigate}"
      :to="{name:'StartPage'}"
    >
      <button
        id="agree-button"
        class="fr-btn fr-btn--sm"
        @click="navigate()"
      >
        J'ai compris
      </button>
    </router-link>
  </div>
</template>
<style scoped>
.onboarding {
  width: 100%;
  height: 100%;
  position: static;
}

.onboarding-content {
  width: 75%;
  margin: 1rem auto;
  text-align: center;
}

.onboarding-ul {
  list-style-position: inside;
  text-indent: -1em;
  padding-left: 1em;
  display: inline-block;
  text-align: left;
  max-width: 700px;
  margin-bottom: 12px !important;
}

.onboarding-green-highlight {
  font-weight: bold;
  color: #00c7c8;
}

#agree-button {
  display: block;
  margin: 0 auto;
}

</style>
