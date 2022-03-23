<template>
    <div>
        <div class="file-input" v-if="imgName == null">
            <header role="banner" class="fr-header">
                <div class="fr-header__body">
                    <div class="fr-container">
                        <div class="fr-header__body-row">
                            <div class="fr-header__brand fr-enlarge-link">
                                <div class="fr-header__brand-top">
                                    <div class="fr-header__logo">
                                        <p class="fr-logo">
                                            Ministère
                                            <br>de l'Intérieur
                                        </p>
                                    </div>
                                    <div class="fr-header__navbar">
                                        <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-833" aria-haspopup="menu" title="Menu" id="fr-btn-menu-mobile">
                                            Menu
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="fr-header__tools">
                                <div class="fr-header__tools-links">
                                    <ul class="fr-links-group">
                                        <li>
                                            <a class="fr-link fr-fi-information-line" href="/informations">Informations</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Navigation principale -->
                <div class="fr-header__menu fr-modal d-lg-none" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
                    <div class="fr-container">
                        <button class="fr-link--close fr-link" aria-controls="modal-833">Fermer</button>
                        <div class="fr-header__menu-links"></div>
                        <nav class="fr-nav" id="navigation-832" role="navigation" aria-label="Menu principal">
                            <ul class="fr-nav__list">
                                <li class="fr-nav__item">
                                    <a class="fr-nav__link" href="/informations" target="_self">Informations</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <div class="centered text-center">
                <img src="../assets/basegun.png" alt="">
                <h1 class="accueil-title">Basegun</h1>
                <p class="accueil-subtitle">Identification automatique des armes à feu</p>
                <input 
                    style="display: none"
                    type="file"
                    :accept="handledImageTypes"
                    @change="onFileSelected"
                    ref="fileInput"
                >
                <DsfrButton
                    :label="labelButton"
                    @click="$refs.fileInput.click()"
                />
                <div>
                    <p> {{ uploadMessage }} </p>
                </div>
            </div>
            <div class="footer-background footer-text">
                Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
            </div>
        </div>
        <div class="result" v-else>
            <div class="result-image">
                <img class="img-fluid" :src="imgName" alt="Image téléversée">
            </div>
            <div class="fr-callout custom-callout">
                <div v-if="confidence < 40">
                    <div class="callout-head">
                        <span class="fr-icon-error-line"></span>
                        <p class="fr-tag fr-tag--sm error-tag">Indice de fiabilité insuffisant</p>
                    </div>
                    <p>Nous n'avons pas suffisamment d'éléments pour fournir une réponse fiable. Nous vous conseillons de faire appel à un expert.</p>
                </div>
                <div v-else>
                    <div v-if="confidence > 70">
                        <div class="callout-head">
                            <span class="fr-icon-success-line"></span>
                            <p class="fr-tag fr-tag--sm success-tag">Indice de fiabilité : {{ Math.floor(confidence) }}%</p>
                        </div>
                    </div>
                    <div v-else>
                            <span class="fr-icon-warning-line"></span>
                            <p class="fr-tag fr-tag--sm warning-tag">Indice de fiabilité : {{ Math.floor(confidence) }}%</p>
                            <p class="warning-text">Nous vous conseillons de faire appel à un expert pour confirmer cette réponse.</p>
                    </div>
                    <p class="fr-callout__title">Catégorie {{ cleanCategory }}</p>
                    <p class="fr-callout__text">Type d'arme : {{ cleanLabel }}</p>
                </div>
            </div>
            <div class="blank"></div>
            <div class="footer-background footer-actions">
                <div class="action-group" @click="reloadPage">
                    <span class="fr-fi-refresh-line" aria-hidden="true"></span>
                    <p class="action-group-text">RECOMMENCER</p>
                </div>
                <div class="action-group">
                    <span class="fr-fi-information-line" aria-hidden="true"></span>
                    <p class="action-group-text">A PROPOS</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Upload',
        data () {
            return {
                selectedFile: null,
                uploadMessage: null,
                resultText: null,
                imgName: null,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer",
                // supported image types: https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
                handledImageTypes: "image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif",
                label: null,
                confidence: null,
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
                        displayLabel: "pistolet",
                        category: "B ou D"
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
                return this.results[`${this.label}`].displayLabel
            },
            cleanCategory() {
                return this.results[`${this.label}`].category
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                this.onUpload()
            },
            onUpload() {
                const fd = new FormData();
                fd.append('image', this.selectedFile, this.selectedFile.name);
                this.uploadMessage='Analyse...';
                this.selectedFile = null;

                axios.post('/upload', fd)
                    .then(res => {
                        this.label = res.data.label
                        this.confidence = res.data.confidence
                        this.resultText = "Type d'arme : " + res.data.label + " " + res.data.confidence + "%"
                        this.imgName = import.meta.env.BASE_URL + "temp/" +
                            res.data.file_name.substring(res.data.file_name.lastIndexOf("/")+1)
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.status)
                            console.log(err.response.data)
                        } else if (err.request) {
                            // The request was made but no response was received
                            console.log(err.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', err.message);
                        }
                    });
            },
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
        text-align: center;
        margin: 0 auto
    }
    @media (min-width: 768px) {
        .result-image {
            max-width: 600px;
        }
        .custom-callout {
            max-width: 600px;
            margin: 12px auto
        }
    }
    @media (max-width: 768px) {
        .custom-callout {
            margin: 12px
        }
    }
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%
    }
    .accueil-title {
        font-size: 28px;
        margin-top: -20px;
        margin-bottom: 0;
    }
    .accueil-subtitle {
        font-size: 14px;
    }
    .footer-background {
        position: fixed;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -100%);
        background-color: #f5f5fe;
        width: 100%;
    }
    .footer-text {
        padding: 20px 10px;
        text-align: center;
    }
    .success-tag {
        color: #297254;
        background-color: #9ef9be;
        margin-left: 5px;
    }
    .error-tag {
        color: #ce0500;
        background-color: #ffe9e9;
        margin-left: 5px;
    }
    .warning-tag {
        color: #b34000;
        background-color: #ffe8e5;
        margin-left: 5px;
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
    .footer-actions {
        display: flex;
        justify-content: space-around;
        color: #000091
    }
    .action-group {
        text-align: center;
        cursor: pointer;
        margin: 8px 0
    }
    .action-group-text {
        font-size: 12px;
        font-weight: bold;
        margin: 0
    }
    .blank {
        height: 80px
    }
</style>
