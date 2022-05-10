<template>
    <div>
        <div class="result">
            <div class="result-image" :style="{backgroundImage:`url(${store.imgName})`}"></div>
            <div class="fr-callout custom-callout">
                <div v-if="store.confidence < 45">
                    <div class="callout-head">
                        <p class="fr-tag fr-tag--sm error-tag">Indice de fiabilité insuffisant</p>
                    </div>
                    <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
                </div>
                <div v-else>
                    <div v-if="store.confidence > 75">
                        <div class="callout-head">
                            <p class="fr-tag fr-tag--sm success-tag">Indice de fiabilité : {{ Math.floor(store.confidence) }}%</p>
                        </div>
                    </div>
                    <div v-else>
                            <p class="fr-tag fr-tag--sm warning-tag">Indice de fiabilité : {{ Math.floor(store.confidence) }}%</p>
                            <p class="warning-text">Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.</p>
                    </div>
                    <p class="fr-callout__title">Catégorie {{ cleanCategory }}</p>
                    <p class="fr-callout__text">Type d'arme : {{ cleanLabel }}</p>
                </div>
            </div>
            <div v-if="store.confidence >= 40">
                <p class="fr-text--sm warning-msg">Cet avis n'emporte qu'une simple valeur de renseignement. Pour faire référence dans une procédure, il doit impérativement et réglementairement être validé par le biais d'un examen scientifique ou technique prévu par le code de procédure pénale.</p>
                <div class="feedback">
                    <p class="feedback-text">Ce résultat a-t-il été utile ?</p>
                    <img src="../assets/thumbs-up.png" alt="" class="thumbs-img">
                    <img src="../assets/thumbs-down.png" alt="" class="thumbs-img">
                </div>
            </div>
            <div class="blank"></div>
            <div class="footer-background footer-actions">
                <div class="action-group" @click="reloadPage">
                    <span class="fr-fi-refresh-line" aria-hidden="true"></span>
                    <p class="action-group-text">RECOMMENCER</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '@/store.js'
    export default {
        name: 'ResultsComponent',
        data() {
            return {
                store,
                results: {
                    revolver: {
                        displayLabel: "revolver",
                        category: "B ou D"
                    },
                    pistolet_semi_auto_moderne: {
                        displayLabel: "pistolet semi-automatique moderne",
                        category: "B"
                    },
                    pistolet_a_percussion_silex: {
                        displayLabel: "pistolet à percussion ou à silex",
                        category: "D"
                    },
                    autre_pistolet: {
                        displayLabel: "pistolet divers",
                        category: "A, B ou D"
                    },
                    epaule_a_percussion_silex: {
                        displayLabel: "arme d'épaule à percussion ou à silex",
                        category: "D"
                    },
                    epaule_a_un_coup: {
                        displayLabel: "arme d'épaule à un coup par canon",
                        category: "C"
                    },
                    epaule_a_levier_sous_garde: {
                        displayLabel: "arme d'épaule à levier de sous-garde",
                        category: "B ou C"
                    },
                    epaule_a_verrou: {
                        displayLabel: "arme d'épaule à verrou",
                        category: "B ou C"
                    },
                    epaule_a_pompe: {
                        displayLabel: "arme d'épaule à pompe",
                        category: "B ou C"
                    },
                    autre_epaule: {
                        displayLabel: "arme d'épaule non manuelle",
                        category: "A, B ou C"
                    }
                }
            }
        },
        computed: {
            cleanLabel() {
                return this.results[`${store.label}`].displayLabel
            },
            cleanCategory() {
                return this.results[`${store.label}`].category
            }
        },
        methods: {
            reloadPage() {
                window.location.reload();
            }
        }
    }
</script>

<style scoped>

    .result {
        margin: 0 auto;
        max-width: 1000px;
    }
    .result-image {
        height: 30vh;
        background-position: center;
        background-size: cover;
        margin: 0 auto;
    }
    @media (min-width: 768px) {
        .result-image {
            max-width: 600px;
        }
        .custom-callout,
        .warning-msg {
            max-width: 600px;
            margin: 12px auto
        }
    }
    @media (max-width: 768px) {
        .custom-callout,
        .warning-msg {
            margin: 12px
        }
    }
    .success-tag {
        color: #297254;
        background-color: #9ef9be;
        margin-left: -4px;
    }
    .error-tag {
        color: #ce0500;
        background-color: #ffe9e9;
        margin-left: -4px;
    }
    .warning-tag {
        color: #b34000;
        background-color: #ffe8e5;
        margin-left: -4px;
    }
    .warning-text {
        font-size: 12px;
        font-style: italic;
        line-height: 1rem;
        margin-bottom: 12px;
    }
    .callout-head {
        display: flex;
        align-items: center;
    }
    .warning-msg {
        line-height: 1.3rem!important;
    }

    .feedback {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .feedback-text {
        margin-bottom: 0;
        margin-right: 4px;
        font-weight: bold;
    }

    .thumbs-img {
        height: 50px;
        margin: 0 2px;
    }

    .footer-actions {
        display: flex;
        justify-content: space-around;
        color: #000091;
        z-index: 1
    }
    .action-group {
        text-align: center;
        cursor: pointer;
        margin: 8px 0;
    }
    .action-group:hover {
        color: #1212ff;
    }
    .action-group-text {
        font-size: 12px;
        font-weight: bold;
        margin: 0
    }
    .blank {
        height: 80px
    }
    .footer-background {
        position: fixed;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -100%);
        background-color: #f5f5fe;
        width: 100%;
    }
</style>
