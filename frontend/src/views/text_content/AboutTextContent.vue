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

            <div class="container-img">
            <div  v-for="img in imgs" :key="img.id">
            <img class="img" :src="img.src" :alt="img.alt">
            
            </div>
            </div>
    </div>
</template>

<script> 

import logoDnum from '@/assets/logo_dnum.jpg'
import logoSCAE from'@/assets/logo_scae.png'
import logoPN from'@/assets/logo_police.png'
import logoGendarmerie from'@/assets/logo_gendarmerie.png'



export default {
    name: "AboutTextContent",

    data () {
        return {
            imgs: [
                {
                alt: "Logo Ministère de l'interieur",
                id: 'logo_dnum',
                src: logoDnum
            },
            {
            alt: "Logo SCAE",
            id: 'logo_scae',
            src: logoSCAE,
        },
        {
            alt: "Logo Police Nationale",
            id: 'logo_pn',
            src: logoPN
        },
        {
            alt: "Logo Gendarmerie",
            id: 'logo_gendarmerie',
            src: logoGendarmerie
        }
    ]
}
} 
}
</script>

<style scoped>
    .title-space {
        margin-top: 20px;
    }
    .container-img {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .img {
        margin: 2em;
        display: flex;
        width: 6em;
        height: auto;

    }
</style>