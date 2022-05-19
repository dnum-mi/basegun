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
          <AboutTextContent />
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
import AboutTextContent from "@/views/text_content/AboutTextContent.vue";

export default {
  name: 'InformationsPage',
  components: {
    HeaderMain,
    AboutTextContent
  }
}
</script>

<style scoped>
  .content {
      margin: min(5vw, 10rem);
  }
</style>