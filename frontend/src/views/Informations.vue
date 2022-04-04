<template>
  <div>
    <HeaderMain />
    <div class="content">
        <h3>Cadre et limitations</h3>
        <p>Basegun est un projet d'application par apprentissage automatique capable d'identifier et de classifier
            de manière fiable et rapide une arme à feu.</p>
        <p>Le projet a été initié en 2021 et est en cours de développement par le Data Lab du Ministère de l'Intérieur.</p>
        <p>A ce jour, Basegun permet de prendre en photo une arme à feu et d'obtenir un
            résultat parmi 10 typologies possibles. Ce résultat donne une indication sur la ou les catégories légales
            à laquelle l'arme appartient.</p>
        <p class="fr-callout"><span class="fr-fi-alert-fill" aria-hidden="true"></span> Basegun ne prend pas encore en compte l'identification des armes non létales (factices,
            à air comprimé, à blanc ou neutralisées).</p>
        <h3 class="title-space">Equipe et contacts</h3>
        <p>Deux personnes travaillent actuellement à temps plein sur ce projet:
            <ul class="contact-list">
                <li>Sarah Gross, data scientist (sarah.gross@interieur.gouv.fr)</li>
                <li>Beryl Koller, développeuse web (beryl.koller@interieur.gouv.fr)</li>
            </ul>
        </p>
        <h3 class="title-space">Code source</h3>
        <p>Le code source du projet est disponible publiquement à l'adresse <a href="https://github.com/datalab-mi/Basegun" target="blank">https://github.com/datalab-mi/Basegun</a></p>
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
        margin: min(5vw, 10rem)
    }
    .title-space {
        margin-top: 20px;
    }
    .contact-list {
        margin-left: 2rem;
    }
</style>