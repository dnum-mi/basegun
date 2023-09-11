<script setup>
const userAgent = window.navigator.userAgent
const keyWords = ['Mobile', 'Mozilla', 'iPhone']

const foundAllKeyWords = keyWords.every(keyWord => {
  return userAgent.includes(keyWord)
})
</script>
<template>
  <div
    v-if="foundAllKeyWords"
  >
    <p class="leading-7 mt-3">
      Vous allez recevoir des instructions pour <span class="font-bold">extraire des munitions</span> de l’arme. Si vous avez
      le <span class="font-bold">moindre doute</span> quant à votre capacité à effectuer en toute sécurité les manœuvres
      qui suivent, <span class="font-bold">n’essayez pas de suivre les étapes suivantes</span>.
      Contactez <span class="font-bold">la gendarmerie ou le commissariat le plus proche</span>.
    </p>
    <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
      <img
        src="@/assets/guide-mise-en-securite/icones/take-care.jpg"
        alt="alt"
        class="img-deco take-care"
      >
    </div>
  </div>
  <div v-else>
    <p class="leading-7 mt-3">
      Vous allez recevoir des <span class="font-bold">instructions</span> pour <span class="font-bold">extraire des munitions</span> de l’arme.
      En cas de doute, <span class="font-bold">s’arrêter et faire appel à un expert</span>.
    </p>
    <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
      <img
        src="@/assets/guide-mise-en-securite/icones/preconisations.jpg"
        alt="alt"
        class="img-deco"
      >
    </div>
  </div>
</template>

<style scoped>
.take-care {
  margin-top: -2rem;
  width: 60%;
}
</style>
