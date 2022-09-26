<template>
    <div>
        <p class="title-space">Basegun est un projet d'application par apprentissage automatique capable 
            d'identifier et de classifier de manière fiable et rapide une arme à feu.</p>
        <p>Le projet a été initié en 2021 dans le contexte du programme Entrepreneurs d’Intérêt Général, 
            et est en cours de développement par le Laboratoire de la Donnée du Ministère de l'Intérieur,
            en collaboration avec le SCAE , la police nationale et la gendarmerie.</p>
        <p>A ce jour, Basegun permet de prendre en photo une arme à feu et d'obtenir un
            résultat parmi 10 typologies possibles. Ce résultat donne une indication sur la ou les catégories légales
            à laquelle l'arme appartient.</p>
        <p class="fr-callout"><span class="fr-fi-alert-fill" aria-hidden="true"></span> Basegun ne prend pas encore en compte l'identification des armes non létales (factices,
            à air comprimé, à blanc ou neutralisées).</p>
    </div>
</template>

<script>
    export default {
        name: "AboutTextContent"
    };
</script>

<style scoped>
    .title-space {
        margin-top: 20px;
    }
</style>