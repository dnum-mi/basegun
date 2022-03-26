<template>
    <div>
        <div>
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
    </div>
</template>

<script>
    import { store } from '@/store.js';
    import axios from 'axios';

    export default {
        name: 'UploadComponent',
        data() {
            return {
                store,
                selectedFile: null,
                uploadMessage: null,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer",
                // supported image types: https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
                handledImageTypes: "image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif",
            }
        },
        methods: {
            // uploadImage() {
            //     store.imgUploaded = true
            //     console.log(store.imgUploaded)
            // },
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
                            store.label = res.data.label
                            store.confidence = res.data.confidence
                            store.resultText = "Type d'arme : " + res.data.label + " " + res.data.confidence + "%"
                            store.imgName = import.meta.env.BASE_URL + "temp/" +
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
                }
        }
    }
</script>

<style scoped>
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
</style>
