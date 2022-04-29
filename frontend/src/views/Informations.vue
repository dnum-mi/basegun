<template>
  <div>
    <HeaderMain />
    <!-- <a class="fr-link fr-fi-arrow-right-line fr-link--icon-right" href="/a-propos">À propos</a>
    <br>
    <a class="fr-link fr-fi-arrow-right-line fr-link--icon-right" href="/mentions-legales">Mentions légales</a>
    <br>
    <a class="fr-link fr-fi-arrow-right-line fr-link--icon-right" href="/contact">Contact</a> -->
    <div class="fr-tabs content">
        <ul class="fr-tabs__list" role="tablist" aria-label="[A modifier | nom du système d'onglet]">
            <li role="presentation">
                <button id="tabpanel-404" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-404-panel">À propos</button>
            </li>
            <li role="presentation">
                <button id="tabpanel-405" class="fr-tabs__tab" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-405-panel">Mentions légales</button>
            </li>
            <li role="presentation">
                <button id="tabpanel-406" class="fr-tabs__tab" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-406-panel">Contact</button>
            </li>
        </ul>
        <div id="tabpanel-404-panel" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tabpanel-404" tabindex="0">
            <!-- données de test -->
          <p class="title-space">Basegun est un projet d'application par apprentissage automatique capable 
              d'identifier et de classifier de manière fiable et rapide une arme à feu.</p>
          <p>Le projet a été initié en 2021 dans le contexte du programme Entrepreneurs d’Intérêt Général, 
              et est en cours de développement par le Laboratoire de la Donnée du Ministère de l'Intérieur.</p>
          <p>A ce jour, Basegun permet de prendre en photo une arme à feu et d'obtenir un
              résultat parmi 10 typologies possibles. Ce résultat donne une indication sur la ou les catégories légales
              à laquelle l'arme appartient.</p>
          <p class="fr-callout"><span class="fr-fi-alert-fill" aria-hidden="true"></span> Basegun ne prend pas encore en compte l'identification des armes non létales (factices,
              à air comprimé, à blanc ou neutralisées).</p>
        </div>
        <div id="tabpanel-405-panel" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-405" tabindex="0">
            <!-- données de test -->
            <p>Contenu 2</p>
        </div>
        <div id="tabpanel-406-panel" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-406" tabindex="0">
            <!-- données de test -->
            <p>Contenu 3</p>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'InformationsPage',
  components: {
    HeaderMain
  }
}
</script>

<style scoped>
  .content {
      margin: min(5vw, 10rem);
  }
</style>