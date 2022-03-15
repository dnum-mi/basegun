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
                                    <a class="fr-nav__link" href="/informations" target="_self">Infomations</a>
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
                    @change="onFileSelected"
                    ref="fileInput"
                >
                <DsfrButton
                    :label="labelButton"
                    @click="$refs.fileInput.click()"
                />
                <div v-if="startUpload">
                    <p>Analyse...</p>
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
                <div class="callout-head">
                    <span class="fr-icon-success-line"></span>
                    <p class="fr-tag fr-tag--sm custom-tag">Indice de fiabilité : {{ Math.floor(confidence) }}%</p>
                </div>
                <p class="fr-callout__title">Type d'arme :</p>
                <p class="fr-callout__text">{{ label }}</p>
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
                startUpload: null,
                resultText: null,
                imgName: null,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer",
                label: null,
                confidence: null
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
                this.startUpload=true;
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
                        console.log(err)
                        if ('response' in err) {
                            this.resultText = err.response.status + err.response.data
                            this.imgName = import.meta.env.BASE_URL + "img/icons/basegun-android-chrome-512x512.png"
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
    .btn-margin {
        margin: 10px 0;
    }
    .result {
        margin: 0 auto;
        max-width: 1000px;
    }
    .result-image {
        text-align: center;
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
    .custom-tag {
        color: #297254;
        background-color: #9ef9be;
        margin-left: 5px;
    }
    .callout-head {
        display: flex;
        align-items: center;
    }
    .custom-callout {
        margin: 12px;
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