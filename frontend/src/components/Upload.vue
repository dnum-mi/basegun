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
        </div>
        <div class="result" v-else>
            <p class="result-text">Type d'arme : {{ label }}</p>
            <img class="result-img img-fluid" :src="baseUrl + 'temp/' + imgName" alt="">
            <div>
                <button class="btn btn-primary btn-margin" @click="reloadPage">Recommencer</button>
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
                label: null,
                imgName: null,
                baseUrl: import.meta.env.BASE_URL,
                labelButton: "Démarrer"
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
                        this.imgName = res.data.file_name.substring(res.data.file_name.lastIndexOf("/")+1)
                        // console.log(process.env.BASE_URL + "temp/" + this.imgName)
                    })
                    .catch((err) => console.log(err));
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
    .result-text {
        background-color: #ececfe;
        padding: 20px 0;
        font-size: 24px;
        font-weight: bold;
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
</style>
