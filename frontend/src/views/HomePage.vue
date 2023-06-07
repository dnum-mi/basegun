<template>
  <div class="text-center relative top-1/6 <md:top-4">
    <div>
      <img
        src="@/assets/basegun_green.png"
        alt=""
        class="w-2\/5 md:w-1\/4"
      >
      <div class="homepage-content">
        <ul class="homepage-ul fr-text--sm">
          <li class="mb-2">
            Basegun est une application <span class="homepage-green-highlight">prototype</span> en cours de développement par le Ministère de l’Intérieur et des Outre-Mer.
          </li>
          <li class="mb-2">
            A ce jour, Basegun <span class="homepage-green-highlight">permet</span> d'identifier uniquement des <span class="homepage-green-highlight">armes à feu létales</span> et des<span class="homepage-green-highlight"> armes factices type airsoft</span>.
          </li>
          <li class="mb-2">
            Basegun propose également de les <span class="homepage-green-highlight">mettre en sécurité</span> grâce à des <span class="homepage-green-highlight">tutoriels personnalisés</span>.
          </li>
        </ul>
      </div>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          id="agree-button"
          size="small"
          @click="navigate()"
        >
          J'ai compris
        </DsfrButton>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: static;
}

.homepage-content {
  width: 75%;
  margin: 1rem auto;
  text-align: center;
}

.homepage-ul {
  list-style-position: inside;
  text-indent: -1em;
  padding-left: 1em;
  display: inline-block;
  text-align: left;
  max-width: 700px;
  margin-bottom: 12px !important;
}

.homepage-green-highlight {
  font-weight: bold;
  color: #00c7c8;
}

#agree-button {
  display: block;
  margin: 0 auto;
}

</style>
