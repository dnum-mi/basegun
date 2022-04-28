<template>
  <div>
    <HeaderMain />
    <div class="content">
        <div class="d-flex align-items-center">
            <a href="/accueil" class="small-link small-text"> Accueil</a>
            <span class="fr-fi-arrow-right-s-line" aria-hidden="true"></span>
            <p class="small-text">À propos</p>
        </div>
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
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'AboutPage',
  components: {
    HeaderMain
  }
}
</script>

<style scoped>

    .content {
        margin: min(5vw, 10rem);
    }
    .title-space {
        margin-top: 20px;
    }
    .contact-list {
        margin-left: 2rem;
    }
    .small-text {
        font-size: 10pt;
        margin-bottom: 0;
    }
    .small-link {
        color: #000091;
    }
    .small-link:hover {
        color: #1212ff
    }

</style>